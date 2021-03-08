import { DEFAULT_OPTIONS } from './lib/config';
import {
  schemaIsValid,
  targetNotMissingValues,
  targetNotHavingExtraValues,
} from './lib/precheck';
import { Parameters, Options, Target, Schema } from './lib/types';
import { checkForObjectValue, validateTargetObject } from './lib/validate';
import { version as VERSION } from '../package.json';

/**
 * Function that validates using a target Object and and Schema Object
 * @param  {} target
 * @param  {} schema
 * @param  {Parameters} options={}}
 * @returns boolean
 */
export function validate(parameters: Parameters): boolean {
  let target: Target, schema: Schema, options: Options;
  try {
    ({ target, schema, options = {} } = parameters);
  } catch (err) {
    throw new Error(
      'Validation Error! Input should be validate({target: {}, schema: {}, options: {})'
    );
  }

  if (!checkForObjectValue(options).isValid) {
    throw new Error('Options Error! Invalid Options Object');
  }

  const { extraValuesAllowed, missingValuesAllowed }: Options = Object.assign(
    DEFAULT_OPTIONS,
    options
  );
  if (!schemaIsValid(schema)) {
    throw new Error('Schema Error! Invalid Schema Object');
  }
  if (!checkForObjectValue(target).isValid) {
    throw new Error('Target Error! Invalid Target Object');
  }

  !missingValuesAllowed && !targetNotMissingValues(target, schema);
  !extraValuesAllowed && !targetNotHavingExtraValues(target, schema);

  return validateTargetObject(target, schema);
}

export const version: String = VERSION;

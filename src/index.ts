import { DEFAULT_OPTIONS } from './lib/config'
import {
  schemaIsValid,
  targetNotMissingValues,
  targetNotHavingExtraValues,
  targetIsValid,
} from './lib/precheck'
import { Parameters, Options } from './lib/types'
import { validateTargetObject } from './lib/validate'

/**
 * Function that validates using a target Object and and Schema Object
 * @param  {} target
 * @param  {} schema
 * @param  {Parameters} options={}}
 * @returns boolean
 */
export function validate({
  target,
  schema,
  options = {},
}: Parameters): boolean {
  const { extraValuesAllowed, missingValuesAllowed }: Options = Object.assign(
    DEFAULT_OPTIONS,
    options
  )
  if (!schemaIsValid(schema)) {
    return false
  }
  if (!targetIsValid(target)) {
    return false
  }
  if (!extraValuesAllowed && !targetNotMissingValues(target, schema)) {
    return false
  }
  if (!missingValuesAllowed && !targetNotHavingExtraValues(target, schema)) {
    return false
  }
  return validateTargetObject(target, schema)
}

import { Target, Schema, ValidationResult } from './types';

/**
 * Iterates over all the Object keys of the target to validate all properties.
 * Only returns true when sucesfully completed
 * @param  {Target} target
 * @param  {Schema} schema
 * @returns boolean
 */
export function validateTargetObject(target: Target, schema: Schema): boolean {
  const targetKeys = Object.keys(target);
  let resultBool: boolean = true;
  targetKeys.forEach((key) => {
    const targetValue = target[key];

    if (!schema[key]) {
      throw new Error(
        'Validation Error! Schema and target keys do not overlap completly'
      );
    }
    const desiredSchemaTypeStr = schema[key];
    const result = validateTargetProperty(desiredSchemaTypeStr, targetValue);
    if (result === false) {
      // should never occur. Invalid schema fallback
      resultBool = false;
    } else {
      let validationResult = <ValidationResult>result;
      !validationResult.isValid && throwValidationError(key, validationResult);
      resultBool && (resultBool = validationResult.isValid);
    }
  });
  return resultBool;
}

/**
 * Validates the value of a single Target property
 * Only returns true when sucesfully completed
 * @param  {string} desiredSchemaTypeStr
 * @param  {any} targetValue
 * @returns boolean
 */
function validateTargetProperty(
  desiredSchemaTypeStr: string,
  targetValue: any
): ValidationResult | boolean {
  switch (desiredSchemaTypeStr) {
    case 'boolean': {
      return checkForbooleanValue(targetValue);
    }
    case 'string': {
      return checkForStringValue(targetValue);
    }
    case 'number': {
      return checkForNumberValue(targetValue);
    }
    case 'object': {
      return checkForObjectValue(targetValue);
    }
    case 'date': {
      return checkForDateValue(targetValue);
    }
    case 'array': {
      return checkForArrayValue(targetValue);
    }
    default: {
      return false;
    }
  }
}

function throwValidationError(key: String, result: ValidationResult): void {
  throw new Error(
    `Validation Error! The value of key: ${key} was ${removeSlashes(
      result.encounteredJSONValue
    )} and not an ${result.desiredType}`
  );
}

/**
 * Check property for boolean value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns ValidationResult
 */
export function checkForbooleanValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'boolean',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid: typeof targetValue === 'boolean',
  };
}

/**
 * Check property for String value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForStringValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'string',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid: typeof targetValue === 'string',
  };
}

/**
 * Check property for String value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForNumberValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'number',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid: typeof targetValue === 'number' && targetValue !== NaN,
  };
}

/**
 * Check property for String value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForObjectValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'object',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid:
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue) &&
      !(targetValue instanceof Date),
  };
}

/**
 * Check property for date value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns ValidationResult
 */
export function checkForDateValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'date',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid: targetValue instanceof Date,
  };
}

/**
 * Check property for Array value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns ValidationResult
 */
export function checkForArrayValue(targetValue: any): ValidationResult {
  return <ValidationResult>{
    desiredType: 'array',
    encounteredJSONValue: JSON.stringify(targetValue),
    isValid: Array.isArray(targetValue),
  };
}

function removeSlashes(input: String): String {
  return input.replace(/\\/g, '').replace(/\"/g, `'`);
}

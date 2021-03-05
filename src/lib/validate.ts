import { Target, Schema } from './types'

/**
 * Iterates over all the Object keys of the target to validate all properties.
 * Only returns true when sucesfully completed
 * @param  {Target} target
 * @param  {Schema} schema
 * @returns boolean
 */
export function validateTargetObject(target: Target, schema: Schema): boolean {
  const targetKeys = Object.keys(target)
  targetKeys.forEach((key) => {
    const targetValue = target[key]
    const schemaStr = schema[key]
    validateTargetProperty(schemaStr, targetValue)
  })
  return true
}

/**
 * Validates the value of a single Target property
 * Only returns true when sucesfully completed
 * @param  {string} schemaStr
 * @param  {any} targetValue
 * @returns boolean
 */
function validateTargetProperty(schemaStr: string, targetValue: any): boolean {
  switch (schemaStr) {
    case 'boolean':
      return checkForBooleanValue(targetValue)
    case 'string':
      return checkForStringValue(targetValue)
    case 'number':
      return checkForNumberValue(targetValue)
    case 'object':
      return checkForObjectValue(targetValue)
    case 'date':
      return checkForDateValue(targetValue)
    case 'array':
      return checkForArrayValue(targetValue)
    default:
      return false
  }
}

/**
 * Check property for Boolean value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForBooleanValue(targetValue: any): boolean {
  if (typeof targetValue !== 'boolean') {
    throw new Error(
      `The value: ${JSON.stringify(targetValue)} is not an Boolean`
    )
  }
  return true
}

/**
 * Check property for String value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForStringValue(targetValue: any): boolean {
  if (typeof targetValue !== 'string') {
    throw new Error(
      `The value: ${JSON.stringify(targetValue)} is not an String`
    )
  }
  return true
}

/**
 * Check property for Number value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForNumberValue(targetValue: any): boolean {
  if (typeof targetValue !== 'number') {
    throw new Error(
      `The value: ${JSON.stringify(targetValue)} is not an Number`
    )
  }
  return true
}

/**
 * Check property for Object value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForObjectValue(targetValue: any): boolean {
  if (
    typeof targetValue !== 'object' ||
    Array.isArray(targetValue) ||
    targetValue instanceof Date
  ) {
    throw new Error(
      `The value: ${JSON.stringify(targetValue)} is not an Object`
    )
  }
  return true
}

/**
 * Check property for Date value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForDateValue(targetValue: any): boolean {
  if (targetValue instanceof Date === false) {
    throw new Error(`The value: ${JSON.stringify(targetValue)} is not an Date`)
  }
  return true
}

/**
 * Check property for Array value
 * Throws Error on failure
 * @param  {any} targetValue
 * @returns boolean
 */
export function checkForArrayValue(targetValue: any): boolean {
  if (!Array.isArray(targetValue)) {
    throw new Error(`The value: ${JSON.stringify(targetValue)} is not an Array`)
  }
  return true
}

import { ALLOWED_KEYS } from './config'
import { Target, Schema } from './types'
import { checkForObjectValue } from './validate'

/**
 * Optional function to check for Missing Schema Properties in Target
 * (enabled by default in options)
 * @param  {Target} target
 * @param  {Schema} schema
 */
export function targetNotMissingValues(target: Target, schema: Schema) {
  const targetKeys = Object.keys(target)
  const schemaKeys = Object.keys(schema)

  const restKeys = schemaKeys.filter((key) => !targetKeys.includes(key))
  if (restKeys.length) {
    throw new Error(
      `You have unaccounted missing values [${restKeys.toString()}] on the target object`
    )
  }
  return true
}

/**
 * Optional function to check for Extra Schema Properties in Target
 * (enabled by default in options)
 * @param  {Target} target
 * @param  {Schema} schema
 */
export function targetNotHavingExtraValues(
  target: Target,
  schema: Schema
): boolean {
  const targetKeys = Object.keys(target)
  const schemaKeys = Object.keys(schema)
  const restKeys = targetKeys.filter((key) => !schemaKeys.includes(key))
  if (restKeys.length) {
    throw new Error(
      `You have unaccounted extra values[${restKeys.toString()}] on the target object`
    )
  }
  return true
}

/**
 * Function to check for a sane Schema file
 * (enabled by default in options)
 * @param  {Target} target
 * @param  {Schema} schema
 */
export function schemaIsValid(schema: Schema): boolean {
  if (!checkForObjectValue(schema)) {
    return false
  }
  const schemaKeys = Object.values(schema)
  return schemaKeys.reduce((isCompliant, schemaKey) => {
    if (isCompliant) {
      isCompliant = ALLOWED_KEYS.includes(schemaKey)
      if (!isCompliant) {
        throw new Error(
          `The parameter of "${schemaKey}" is not recognized as a valid key, 
             Please use 'string', 'array', 'object', 'number' or 'boolean'`
        )
      }
    }
    return isCompliant
  }, <boolean>true)
}
/**
 * Basic sanity on the target value
 * @param  {Target} target
 * @returns boolean
 */
export function targetIsValid(target: Target): boolean {
  if (!checkForObjectValue(target)) {
    return false
  }
  return true
}

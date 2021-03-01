interface Target {
  [index: string]: any;
}
interface Schema {
  [index: string]: string;
}
interface Parameters {
  target: Target;
  schema: Schema;
  options?: any;
}

const ALLOWED_KEYS = ["string", "array", "object", "number", "boolean", "date"];

export function isAllowed({ target, schema, options = {} }: Parameters) {
  if (!checkValiditySchemaEntries(schema)) {
    return false;
  }
  if (!checkForMissingValues(target, schema)) {
    return false;
  }
  if (!checkForExtraValues(target, schema)) {
    return false;
  }
  return checkTarget(target, schema);
}

function checkTarget(target: Target, schema: Schema): boolean {
  const targetKeys = Object.keys(target);
  targetKeys.forEach((key) => {
    const targetValue = target[key];
    const schemaStr = schema[key];
    checkTargetKey(schemaStr, targetValue);
  });
  return true;
}

function checkTargetKey(schemaStr: string, targetValue: any): boolean {
  switch (schemaStr) {
    case "boolean":
      return checkForBooleanValue(targetValue);
    case "string":
      return checkForStringValue(targetValue);
    case "number":
      return checkForNumberValue(targetValue);
    case "object":
      return checkForObjectValue(targetValue);
    case "date":
      return checkForDateValue(targetValue);
    case "array":
      return checkForArrayValue(targetValue);
    default:
      return false;
  }
}

function checkForBooleanValue(targetValue: any): boolean {
  if (typeof targetValue !== "boolean") {
    throw new Error(`The value: ${targetValue} is not a Boolean`);
  }
  return true;
}
function checkForStringValue(targetValue: any): boolean {
  if (typeof targetValue !== "string") {
    throw new Error(`The value: ${targetValue} is not a String`);
  }
  return true;
}
function checkForNumberValue(targetValue: any): boolean {
  if (typeof targetValue !== "number") {
    throw new Error(`The value: ${targetValue} is not a Number`);
  }
  return true;
}
function checkForObjectValue(targetValue: any): boolean {
  if (
    typeof targetValue !== "object" ||
    Array.isArray(targetValue) ||
    targetValue instanceof Date
  ) {
    throw new Error(`The value: ${targetValue} is not a Object`);
  }
  return true;
}
function checkForDateValue(targetValue: any): boolean {
  if (targetValue instanceof Date === false) {
    throw new Error(`The value: ${targetValue} is not a Date`);
  }
  return true;
}
function checkForArrayValue(targetValue: any): boolean {
  if (!Array.isArray(targetValue)) {
    throw new Error(`The value: ${targetValue} is not a Array`);
  }
  return true;
}

function checkForMissingValues(target: Target, schema: Schema) {
  const targetKeys = Object.keys(target);
  const schemaKeys = Object.keys(schema);

  const restKeys = schemaKeys.filter((key) => !targetKeys.includes(key));
  if (restKeys.length) {
    throw new Error(
      `You have unaccounted missing values [${restKeys.toString()}] on the target object`
    );
  }
  return true;
}

function checkForExtraValues(target: Target, schema: Schema): boolean {
  const targetKeys = Object.keys(target);
  const schemaKeys = Object.keys(schema);
  const restKeys = targetKeys.filter((key) => !schemaKeys.includes(key));
  if (restKeys.length) {
    throw new Error(
      `You have unaccounted extra values[${restKeys.toString()}] on the target object`
    );
  }
  return true;
}

function checkValiditySchemaEntries(schema: Schema): boolean {
  const schemaKeys = Object.values(schema);
  return schemaKeys.reduce((isCompliant, schemaKey) => {
    if (isCompliant) {
      isCompliant = ALLOWED_KEYS.includes(schemaKey);
      if (!isCompliant) {
        throw new Error(
          `The parameter of "${schemaKey}" is not recognized as a valid key, 
           Please use 'string', 'array', 'object', 'number' or 'boolean'`
        );
      }
    }
    return isCompliant;
  }, <boolean>true);
}

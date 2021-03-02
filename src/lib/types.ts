export interface Target {
  [index: string]: any
}
export interface Schema {
  [index: string]: string
}
export interface Parameters {
  target: Target
  schema: Schema
  options?: Options
}
export interface Options {
  missingValuesAllowed?: boolean
  extraValuesAllowed?: boolean
}

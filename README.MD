<img src="https://github.com/ralphdas/Doorman-JS/raw/main/logo.png" alt="drawing" width="100"/>

# DoormanJS Validator

[![Actions Status](https://github.com/ralphdas/doormanjs-validator/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/ralphdas/doormanjs-validator/actions/) [![License][license-image]][license-url] [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

![Coverage badge gree][coverage-badge-green] ![Coverage badge gree][coverage-badge-yellow] ![Coverage badge gree][coverage-badge-red]

[coverage-badge-green]: https://raw.githubusercontent.com/ralphdas/doormanjs-validator/main/coverage/badge-branches.svg
[coverage-badge-yellow]: https://raw.githubusercontent.com/ralphdas/doormanjs-validator/main/coverage/badge-functions.svg
[coverage-badge-red]: https://raw.githubusercontent.com/ralphdas/doormanjs-validator/main/coverage/badge-lines.svg

DoormanJS is a Javascript library for dealing with object validations written in Typescript using a simple schema object. It keeps those #$% Bastards out. It currently only supports the following types:

- Array
- String
- Date
- Object
- Number

Currently it does not support sub-objects or array values.

## Installation

Use the package manager NPM or Yarn

```bash
npm install doormanjs-validator
```

```bash
yarn add doormanjs-validator
```

## Usage

```javascript
// es5
const { validate } = require('doormanjs-validator');

// ESM Module
import { validate } from 'doormanjs-validator';

const target = {
  name: 'Jimmys drinks',
  address: 'Somewhere over the rainbow',
  drinks: {
    beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
  },
};

const schema = {
  name: 'string',
  address: 'string',
  drinks: 'object',
};

const options = {
  extraValuesAllowed: false, // by default false
  missingValuesAllowed: false, // by default false
};

try {
  validate({ target, schema, options }); // returns true
} catch (error) {
  /* 
    It will throw a Error on Invalid Schema or Target.
    Or on failed validation error.message gives a hint.
  */
  console.error(error.message);
  // Example: The value: 'Arie' is not an Object
}
```

## Unit testing

Unit testing is done through JEST and can be executed through:

```bash
yarn run test
```

```bash
npm run test
```

## Forking

After forking the project simply run

```js
yarn
// or
npm i
```

to install all dependencies. In the `src` directory you will find all the Typescript source files.

## Build

The JS code can be found in mimified condition in `dist` folder in ESM, CommonJS and IIFE formats. Packaging is done through RollupJS.

```bash
yarn run build
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg
[license-url]: https://opensource.org/licenses/MIT

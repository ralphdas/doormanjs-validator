import { validate } from '../src/index';
import { Schema, Target } from '../src/lib/types';
import { validateTargetObject } from '../src/lib/validate';

describe('Testing schema sanity', () => {
  it('Should give Error on broken schema', () => {
    const target = {
      name: 'Jimmys drinks',
      address: 'Somewhere over the rainbow',
      drinks: {
        beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
      },
    };
    expect(() => {
      validate({ target, schema: ([] as any) as Schema });
    }).toThrowError('Error! Invalid Schema Object');
  });

  it('Should give Error on broken target', () => {
    const target = ([] as any) as Target;
    expect(() => {
      validate({ target, schema: { name: 'string' } });
    }).toThrowError('Error! Invalid Target Object');
  });

  it('Should give Error on broken schema', () => {
    const target = { naam: 'arie' };
    const schema = { naam: 'bob' };
    expect(() => {
      validate({ target, schema });
    }).toThrowError(`The parameter of 'bob' is not recognized as a valid key,
          Please use 'string', 'array', 'object', 'number' or 'boolean'`);
  });

  it('Should give Error on extra attributes', () => {
    const target = {
      naam: 'arie',
      leeftijd: 23,
    };
    const schema = {
      naam: 'string',
    };
    expect(() => {
      validate({ target, schema });
    }).toThrowError(
      'You have unaccounted extra values[leeftijd] on the target object'
    );
  });

  it('Should ignore Error on extra attributes through option', () => {
    const target = {
      naam: 'arie',
      leeftijd: 23,
    };
    const schema = {
      naam: 'string',
    };
    expect(() => {
      validate({
        target,
        schema,
        options: {
          extraValuesAllowed: true,
        },
      });
    }).toBeTruthy();
  });

  it('Should ignore Error on missing attributes through option', () => {
    const target = {
      naam: 'arie',
    };
    const schema = {
      naam: 'string',
      leeftijd: 'number',
    };
    expect(() => {
      validate({
        target,
        schema,
        options: {
          missingValuesAllowed: true,
        },
      });
    }).toBeTruthy();
  });

  it('Should fail on mallformed option object', () => {
    const target = {
      naam: 'arie',
    };
    const schema = {
      naam: 'string',
      leeftijd: 'number',
    };
    expect(() => {
      validate({
        target,
        schema,
        options: <any>[],
      });
    }).toThrowError('Options Error! Invalid Options Object');
  });
});

describe('Testing the function of Property Validation', () => {
  it('should give throw error on non-overlapping sets', () => {
    const target = {
      test: 'arie',
    };
    const schema = {
      arie: 'foobar',
    };

    expect(() => validateTargetObject(target, schema)).toThrowError(
      'Validation Error! Schema and target keys do not overlap completly'
    );
  });
  it('should give false invalid schema types', () => {
    const target = {
      test: 'arie',
    };
    const schema = {
      test: 'foobar',
    };

    expect(validateTargetObject(target, schema)).toBeFalsy();
  });
});

it('Should ignore Error on extra attributes through option', () => {
  const target = {
    naam: 'arie',
    leeftijd: 23,
  };
  const schema = {
    naam: 'string',
  };
  expect(() => {
    validate({
      target,
      schema,
      options: {
        extraValuesAllowed: true,
      },
    });
  }).toBeTruthy();
});

it('Throw an error on invalid input', () => {
  expect(() => {
    validate(<any>undefined);
  }).toThrowError(
    'Error! Input should be validate({target: {}, schema: {}, options: {})'
  );
});

it('Throw an error on invalid input', () => {
  expect(() => {
    validate(<any>{ arie: 'bob', test: true });
  }).toThrowError('Error! Invalid Schema Object');
});

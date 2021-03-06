import { validate } from '../src/index';
import { BarSchema, CarSchema, PersonSchema } from './schemas';

// bogus test
describe('Testing the Bars Schema', () => {
  it('Should pass this', () => {
    const target = {
      name: 'Jimmys drinks',
      address: 'Somewhere over the rainbow',
      drinks: {
        beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
      },
    };
    expect(validate({ target, schema: BarSchema })).toBeTruthy();
  });
  it('Should throw an error', () => {
    const target = {
      name: 'Sjonnies',
      address: 'Centrum 001',
      drinks: [
        // < No object
        'Heineken',
      ],
    };
    expect(() => {
      validate({ target, schema: BarSchema });
    }).toThrowError(
      "Validation Error! The value of key: drinks was ['Heineken'] and not an object"
    );
  });
});

describe('Testing Cars Schema', () => {
  it('Should pass this', () => {
    const target = {
      brand: 'Mazda',
      type: 'MX5 NB 1.8',
      milage: 199999.99,
      extras: ['2001 Special Edition'],
    };
    expect(validate({ target, schema: CarSchema })).toBeTruthy();
  });
  it('Should throw an error', () => {
    const target = {
      brand: 'BMW',
      type: '335',
      milage: '100000', // < No number
      extras: ['LCI', 'KW Coilovers'],
    };
    expect(() => {
      validate({ target, schema: CarSchema });
    }).toThrowError(
      "Validation Error! The value of key: milage was '100000' and not an number"
    );
  });
});

describe('Testing the People Schema', () => {
  it('Should pass this', () => {
    const target = {
      name: 'James',
      age: 25,
      birthDate: new Date('1985-1-11'),
      siblings: ['Johnnathan'],
      metaData: {},
      active: true,
    };

    expect(validate({ target, schema: PersonSchema })).toBeTruthy();
  });

  it('Should throw an error', () => {
    const target = {
      name: 'James',
      birthDate: new Date('1985-1-11'),
      age: 25,
      active: true,
    };
    expect(() => {
      validate({ target, schema: PersonSchema });
    }).toThrowError(
      'You have unaccounted missing values [siblings,metaData] on the target object'
    );
  });
});

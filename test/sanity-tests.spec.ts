import { validate } from '../src/index'
import { Schema, Target } from '../src/lib/types'

describe('Testing schema sanity', () => {
  it('Should give Error on broken schema', () => {
    const target = {
      name: 'Jimmys drinks',
      address: 'Somewhere over the rainbow',
      drinks: {
        beer: ['Straffe Hendrik', 'Rochefort', 'St Bernard'],
      },
    }
    expect(() => {
      validate({ target, schema: ([] as any) as Schema })
    }).toThrowError('The value: [] is not a Object')
  })

  it('Should give Error on broken target', () => {
    const target = ([] as any) as Target
    expect(() => {
      validate({ target, schema: { name: 'string' } })
    }).toThrowError('The value: [] is not a Object')
  })

  it('Should give Error on broken schema', () => {
    const target = { naam: 'arie' }
    const schema = { naam: 'bob' }
    expect(() => {
      validate({ target, schema })
    }).toThrowError(`The parameter of 'bob' is not recognized as a valid key,
          Please use 'string', 'array', 'object', 'number' or 'boolean'`)
  })

  it('Should give Error on extra attributes', () => {
    const target = {
      naam: 'arie',
      leeftijd: 23,
    }
    const schema = {
      naam: 'string',
    }
    expect(() => {
      validate({ target, schema })
    }).toThrowError(
      'You have unaccounted extra values[leeftijd] on the target object'
    )
  })

  it('Should ignore Error on extra attributes through option', () => {
    const target = {
      naam: 'arie',
      leeftijd: 23,
    }
    const schema = {
      naam: 'string',
    }
    expect(() => {
      validate({
        target,
        schema,
        options: {
          extraValuesAllowed: true,
        },
      })
    }).toBeTruthy()
  })

  it('Should give Error on missing attributes', () => {
    const target = {
      naam: 'arie',
    }
    const schema = {
      naam: 'string',
      leeftijd: 'number',
    }
    expect(() => {
      validate({ target, schema })
    }).toThrowError(
      'You have unaccounted missing values [leeftijd] on the target object'
    )
  })

  it('Should ignore Error on missing attributes through option', () => {
    const target = {
      naam: 'arie',
    }
    const schema = {
      naam: 'string',
      leeftijd: 'number',
    }
    expect(() => {
      validate({
        target,
        schema,
        options: {
          missingValuesAllowed: true,
        },
      })
    }).toBeTruthy()
  })
})

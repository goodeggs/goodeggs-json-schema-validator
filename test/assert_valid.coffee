expect = require('chai').expect
validator = require '../src'

describe 'validator.assertValid()', ->
  it 'throws error if schema invalid', ->
    schema = {type: 'string', format: 'objectid'}
    expect(
      -> validator.assertValid('123', schema)
    ).to.throw('failed schema validation at /format; format validation failed (objectid expected)')

  it 'includes all tv4 error attributes', ->
    schema = {type: 'string', format: 'objectid'}
    try
      validator.assertValid('123', schema)
    catch err
      expect(err).to.have.property('params')
      expect(err).to.have.property('code')
      expect(err).to.have.property('dataPath')
      expect(err).to.have.property('schemaPath')
      expect(err).to.have.property('schemaPath')
      expect(err).to.have.property('subErrors')
      return
    throw new Error('expected to throw')

  it 'adds "name", "data" and "schema" attributes to error', ->
    schema = {type: 'string', format: 'objectid'}
    try
      validator.assertValid('123', schema)
    catch err
      expect(err.name).to.equal('SchemaValidationError')
      expect(err.schema).to.deep.equal({type: 'string', format: 'objectid'})
      expect(err.data).to.deep.equal('123')
      return
    throw new Error('expected to throw')

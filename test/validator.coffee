expect = require('chai').expect
validator = require '..'

describe 'formats', ->
  describe 'objectid', ->
    it 'validates', ->
      schema = {type: 'string', format: 'objectid'}
      expect(validator.validate('559ee02e069f82d39e251b36', schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'objectid'}
      expect(validator.validate('123abc', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (objectid expected)'

  describe 'date-time', ->
    it 'validates', ->
      schema = {type: 'string', format: 'date-time'}
      date = new Date().toISOString()
      expect(validator.validate(date, schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'date-time'}
      expect(validator.validate('2014-11-11', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (date-time, ISOString format, expected)'

  describe 'date', ->
    it 'validates', ->
      schema = {type: 'string', format: 'date'}
      expect(validator.validate('2014-11-11', schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'date'}
      expect(validator.validate('20141111', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (date, YYYY-MM-DD format, expected)'

  describe 'email', ->
    it 'validates', ->
      schema = {type: 'string', format: 'email'}
      expect(validator.validate('danny@goodeggs.com', schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'email'}
      expect(validator.validate('goodeggs.com', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (email expected)'



expect = require('chai').expect
validator = require '../lib'

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

  describe 'time', ->

    it 'validates valid time with seconds', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('23:01:59', schema)).to.be.ok

    it 'validates valid time without seconds', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('00:31', schema)).to.be.ok

    it 'throws if invalid sequence of digits', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('02:32:11:12', schema)).not.to.be.ok
      expect(validator.error.message).to.contain 'Format validation failed (time'

    it 'throws if invalid sequence of alphanumeric characters', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('ab21:21', schema)).not.to.be.ok
      expect(validator.error.message).to.contain 'Format validation failed (time'

    it 'throws if too many hours', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('30:21', schema)).not.to.be.ok
      expect(validator.error.message).to.contain 'Format validation failed (time'

    it 'throws if too many minutes', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('21:61', schema)).not.to.be.ok
      expect(validator.error.message).to.contain 'Format validation failed (time'

    it 'throws if too many seconds', ->
      schema = {type: 'string', format: 'time'}
      expect(validator.validate('23:59:61', schema)).not.to.be.ok
      expect(validator.error.message).to.contain 'Format validation failed (time'


  describe 'email', ->
    it 'validates', ->
      schema = {type: 'string', format: 'email'}
      expect(validator.validate('danny@goodeggs.com', schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'email'}
      expect(validator.validate('goodeggs.com', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (email expected)'

  describe 'integer', ->
    it 'validates', ->
      schema = {type: 'string', format: 'non-negative-integer'}
      expect(validator.validate('12', schema)).to.be.ok

    it 'throws if invalid', ->
      schema = {type: 'string', format: 'non-negative-integer'}
      expect(validator.validate('12.5', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (non negative integer expected)'

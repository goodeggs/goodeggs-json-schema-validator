expect = require('chai').expect
validator = require '..'

describe 'formats', ->
  describe 'objectid', ->
    it 'validates objectids', ->
      schema = {type: 'string', format: 'objectid'};
      expect(validator.validate('559ee02e069f82d39e251b36', schema)).to.be.ok

    it 'throws if invalid objectid', ->
      schema = {type: 'string', format: 'objectid'};
      expect(validator.validate('123abc', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (objectid expected)'

  describe 'other formats', ->
    it 'validates with tv4-formats', ->
      schema = {type: 'string', format: 'date'};
      expect(validator.validate('20141111', schema)).not.to.be.ok
      expect(validator.error).to.have.property 'message', 'Format validation failed (A valid date in YYYY-MM-DD format expected)'

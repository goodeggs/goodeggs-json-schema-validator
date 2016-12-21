// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import { expect } from 'chai';
import validator from '../src';

describe('formats', function() {
  describe('objectid', function() {
    it('validates', function() {
      const schema = {type: 'string', format: 'objectid'};
      return expect(validator.validate('559ee02e069f82d39e251b36', schema)).to.be.ok;
    });

    it('throws if invalid', function() {
      const schema = {type: 'string', format: 'objectid'};
      expect(validator.validate('123abc', schema)).not.to.be.ok;
      return expect(validator.error).to.have.property('message', 'Format validation failed (objectid expected)');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'objectid'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'objectid'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });

  describe('date-time', function() {
    it('validates', function() {
      const schema = {type: 'string', format: 'date-time'};
      const date = new Date().toISOString();
      return expect(validator.validate(date, schema)).to.be.ok;
    });

    it('throws if invalid', function() {
      const schema = {type: 'string', format: 'date-time'};
      expect(validator.validate('2014-11-11', schema)).not.to.be.ok;
      return expect(validator.error).to.have.property('message', 'Format validation failed (date-time, ISOString format, expected)');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'date-time'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'date-time'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });

  describe('date', function() {
    it('validates', function() {
      const schema = {type: 'string', format: 'date'};
      return expect(validator.validate('2014-11-11', schema)).to.be.ok;
    });

    it('throws if invalid', function() {
      const schema = {type: 'string', format: 'date'};
      expect(validator.validate('20141111', schema)).not.to.be.ok;
      return expect(validator.error).to.have.property('message', 'Format validation failed (date, YYYY-MM-DD format, expected)');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'date'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'date'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });

  describe('time', function() {
    it('validates valid time with seconds', function() {
      const schema = {type: 'string', format: 'time'};
      return expect(validator.validate('23:01:59', schema)).to.be.ok;
    });

    it('validates valid time without seconds', function() {
      const schema = {type: 'string', format: 'time'};
      return expect(validator.validate('00:31', schema)).to.be.ok;
    });

    it('throws if invalid sequence of digits', function() {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('02:32:11:12', schema)).not.to.be.ok;
      return expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if invalid sequence of alphanumeric characters', function() {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('ab21:21', schema)).not.to.be.ok;
      return expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many hours', function() {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('30:21', schema)).not.to.be.ok;
      return expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many minutes', function() {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('21:61', schema)).not.to.be.ok;
      return expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many seconds', function() {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('23:59:61', schema)).not.to.be.ok;
      return expect(validator.error.message).to.contain('Format validation failed (time');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'time'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'time'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });


  describe('email', function() {
    it('validates', function() {
      const schema = {type: 'string', format: 'email'};
      return expect(validator.validate('danny@goodeggs.com', schema)).to.be.ok;
    });

    it('throws if invalid', function() {
      const schema = {type: 'string', format: 'email'};
      expect(validator.validate('goodeggs.com', schema)).not.to.be.ok;
      return expect(validator.error).to.have.property('message', 'Format validation failed (email expected)');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'email'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'email'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });


  return describe('integer', function() {
    it('validates', function() {
      const schema = {type: 'string', format: 'non-negative-integer'};
      return expect(validator.validate('12', schema)).to.be.ok;
    });

    it('throws if invalid', function() {
      const schema = {type: 'string', format: 'non-negative-integer'};
      expect(validator.validate('12.5', schema)).not.to.be.ok;
      return expect(validator.error).to.have.property('message', 'Format validation failed (non negative integer expected)');
    });

    return describe('null values', function() {
      it('throws if it is not an accepted type', function() {
        const schema = {type: 'string', format: 'integer'};
        return expect(validator.validate(null, schema)).not.to.be.ok;
      });

      return it('does not check the format if null is an accepted type', function() {
        const schema = {type: ['string', 'null'], format: 'integer'};
        return expect(validator.validate(null, schema)).to.be.ok;
      });
    });
  });
});

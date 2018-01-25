// @flow
import tv4 from 'tv4';
import {describe, it} from 'mocha';
import {expect} from 'goodeggs-test-helpers/chai';

import validator from '../src';

describe('formats', function () {
  describe('objectid', function () {
    it('validates', function () {
      const schema = {type: 'string', format: 'objectid'};
      expect(validator.validate('559ee02e069f82d39e251b36', schema)).to.be.ok();
    });

    it('throws if invalid', function () {
      const schema = {type: 'string', format: 'objectid'};
      expect(validator.validate('123abc', schema)).not.to.be.ok();
      expect(validator.error).to.have.property('message', 'Format validation failed (objectid expected)');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'objectid'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'objectid'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });

  describe('date-time', function () {
    it('validates', function () {
      const schema = {type: 'string', format: 'date-time'};
      const date = new Date().toISOString();
      expect(validator.validate(date, schema)).to.be.ok();
    });

    it('throws if invalid', function () {
      const schema = {type: 'string', format: 'date-time'};
      expect(validator.validate('2014-11-11', schema)).not.to.be.ok();
      expect(validator.error).to.have.property('message', 'Format validation failed (date-time, ISOString format, expected)');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'date-time'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'date-time'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });

  describe('date', function () {
    it('validates', function () {
      const schema = {type: 'string', format: 'date'};
      expect(validator.validate('2014-11-11', schema)).to.be.ok();
    });

    it('throws if invalid', function () {
      const schema = {type: 'string', format: 'date'};
      expect(validator.validate('20141111', schema)).not.to.be.ok();
      expect(validator.error).to.have.property('message', 'Format validation failed (date, YYYY-MM-DD format, expected)');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'date'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'date'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });

  describe('time', function () {
    it('validates valid time with seconds', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('23:01:59', schema)).to.be.ok();
    });

    it('validates valid time without seconds', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('00:31', schema)).to.be.ok();
    });

    it('throws if invalid sequence of digits', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('02:32:11:12', schema)).not.to.be.ok();
      expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if invalid sequence of alphanumeric characters', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('ab21:21', schema)).not.to.be.ok();
      expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many hours', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('30:21', schema)).not.to.be.ok();
      expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many minutes', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('21:61', schema)).not.to.be.ok();
      expect(validator.error.message).to.contain('Format validation failed (time');
    });

    it('throws if too many seconds', function () {
      const schema = {type: 'string', format: 'time'};
      expect(validator.validate('23:59:61', schema)).not.to.be.ok();
      expect(validator.error.message).to.contain('Format validation failed (time');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'time'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'time'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });


  describe('email', function () {
    it('validates', function () {
      const schema = {type: 'string', format: 'email'};
      expect(validator.validate('danny@goodeggs.com', schema)).to.be.ok();
    });

    it('throws if invalid', function () {
      const schema = {type: 'string', format: 'email'};
      expect(validator.validate('goodeggs.com', schema)).not.to.be.ok();
      expect(validator.error).to.have.property('message', 'Format validation failed (email expected)');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'email'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'email'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });


  describe('integer', function () {
    it('validates', function () {
      const schema = {type: 'string', format: 'non-negative-integer'};
      expect(validator.validate('12', schema)).to.be.ok();
    });

    it('throws if invalid', function () {
      const schema = {type: 'string', format: 'non-negative-integer'};
      expect(validator.validate('12.5', schema)).not.to.be.ok();
      expect(validator.error).to.have.property('message', 'Format validation failed (non negative integer expected)');
    });

    describe('null values', function () {
      it('throws if it is not an accepted type', function () {
        const schema = {type: 'string', format: 'integer'};
        expect(validator.validate(null, schema)).not.to.be.ok();
      });

      it('does not check the format if null is an accepted type', function () {
        const schema = {type: ['string', 'null'], format: 'integer'};
        expect(validator.validate(null, schema)).to.be.ok();
      });
    });
  });

  // regression test https://www.pivotaltracker.com/story/show/154646826
  it('does not overwrite formats when adding global tv4 formats', function () {
    tv4.addFormat('date-time', () => 'sad panda');
    const schema = {type: 'string', format: 'date-time'};
    const date = new Date().toISOString();
    expect(validator.validate(date, schema)).to.be.ok();
  });
});

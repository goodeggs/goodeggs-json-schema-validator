// @flow
import {describe, it} from 'mocha';
import {expect} from 'goodeggs-test-helpers/chai';

import validator from '../src';

describe('validator.assertValid()', function () {
  it('throws error if schema invalid', function () {
    const schema = {type: 'string', format: 'objectid'};
    expect(
      () => validator.assertValid('123', schema)
    ).to.throw(
      'failed schema validation at schema path /format; format validation failed (objectid expected)'
    );
  });

  it('bans unknown properties by default', function () {
    const schema = {type: 'object'};
    expect(
      () => validator.assertValid({foo: 'bar'}, schema)
    ).to.throw(
      'failed schema validation for data path /foo; unknown property (not in schema)'
    );
  });

  it('can override ban unknown properties', function () {
    const schema = {type: 'object'};
    validator.assertValid({foo: 'bar'}, schema, null, {banUnknownProperties: false})
  });

  it('supports adding a custom error message', function () {
    const schema = {type: 'string', format: 'objectid'};
    expect(
      () => validator.assertValid('123', schema, 'request invalid')
    ).to.throw(
      'request invalid; failed schema validation at schema path /format; format validation failed (objectid expected)'
    );
  });

  it('includes schema title in error if available', function () {
    const schema = {title: 'Product', type: 'string', format: 'objectid'};
    expect(
      () => validator.assertValid('123', schema)
    ).to.throw(
      'failed "Product" schema validation at schema path /format; format validation failed (objectid expected)'
    );
  });

  it('includes all tv4 error attributes', function () {
    const schema = {type: 'string', format: 'objectid'};
    try {
      validator.assertValid('123', schema);
    } catch (err) {
      expect(err).to.have.property('params');
      expect(err).to.have.property('code');
      expect(err).to.have.property('dataPath');
      expect(err).to.have.property('schemaPath');
      expect(err).to.have.property('subErrors');
      return;
    }
    throw new Error('expected to throw');
  });

  it('adds "name", "data" and "schema" attributes to error', function () {
    const schema = {type: 'string', format: 'objectid'};
    try {
      validator.assertValid('123', schema);
    } catch (err) {
      expect(err.name).to.equal('SchemaValidationError');
      expect(err.schema).to.deep.equal({type: 'string', format: 'objectid'});
      expect(err.data).to.deep.equal('123');
      return;
    }
    throw new Error('expected to throw');
  });

  it('includes dataPath if available', function () {
    const schema = {
      type: 'object',
      patternProperties: {
        '^a.*': {type: 'string'},
      },
    };
    expect(
      () => validator.assertValid({bcd: 'test'}, schema)
    ).to.throw(
      'SchemaValidationError: failed schema validation for data path /bcd; unknown property (not in schema)'
    );
  });
});

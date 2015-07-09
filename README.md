# Good Eggs JSON Schema Validator

[![build status][travis-badge]][travis-link]
[![npm version][npm-badge]][npm-link]
[![MIT license][license-badge]][license-link]
[![we're hiring][hiring-badge]][hiring-link]

```
npm install goodeggs-json-schema-validator
```

1. Common JSON schema and [tv4](https://github.com/geraintluff/tv4) add-ons for Good Eggs ecosystem.
2. Express middleware to validate requests using JSON Schemas.


## Common schema add-ons

Adds support for these formats:

- objectid
- date (YYYY-MM-DD)
- date-time (for example, 2014-05-02T12:59:29+00:00)
- email
- uri
- url
- credit-card-number
- duration (for example, P1DT12H for 1.5 days)

Simply include the format in your schema:

```json
{"type": "string", "format": "date"}
```

## Express Validation

(Loosely modeled on [express-joi-validator](https://github.com/threadster/express-joi-validator).)

When validation fails, uses [Boom](https://github.com/hapijs/boom) to wrap errors.
Recommended to use [Crashpad](https://github.com/goodeggs/crashpad) for passing those errors to the client.

### Methods

All methods return middleware that can be `use()`d or included in a route chain.

- `validateQuery(schema, options)` validates schema against `req.query`
- `validateParams(schema, options)` validates schema against `req.params`
- `validateBody(schema, options)` validates schema against `req.body` (requires [body-parser](https://github.com/expressjs/body-parser))

The `schema` param should be a [JSON Schema](http://json-schema.org/),
including `properties`, `required`, etc. Its `type` defaults to `object`.


### Example

Validate URL params:

```javascript
var jsonValidator = require('goodeggs-json-schema-validator');
var crashpad = require('crashpad')

app.use(crashpad());  // for responding with structured errors

app.get('/products/:slug',
  jsonValidator.validateParams({
    properties:
      'slug':
        type: 'string'
        pattern: '^[a-z-]+$'
  }),
  function (req, res) {
    // ...
  }
);
```

If a request is made to `/products/INVALID_123`,
it will fail with statusCode 400
and a body containing `message` with a description of the error.


## Contributing

Please follow our [Code of Conduct](https://github.com/goodeggs/goodeggs-json-schema-validator/blob/master/CODE_OF_CONDUCT.md)
when contributing to this project.

```
$ git clone https://github.com/goodeggs/goodeggs-json-schema-validator && cd goodeggs-json-schema-validator
$ npm install
$ npm test
```

[travis-badge]: http://img.shields.io/travis/goodeggs/goodeggs-json-schema-validator.svg?style=flat-square
[travis-link]: https://travis-ci.org/goodeggs/goodeggs-json-schema-validator
[npm-badge]: http://img.shields.io/npm/v/goodeggs-json-schema-validator.svg?style=flat-square
[npm-link]: https://www.npmjs.org/package/goodeggs-json-schema-validator
[license-badge]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-link]: LICENSE.md
[hiring-badge]: https://img.shields.io/badge/we're_hiring-yes-brightgreen.svg?style=flat-square
[hiring-link]: http://goodeggs.jobscore.com/?detail=Open+Source&sid=161

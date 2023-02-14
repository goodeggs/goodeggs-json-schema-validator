# Good Eggs JSON Schema Validator

[![build status][travis-badge]][travis-link]
[![npm version][npm-badge]][npm-link]
[![MIT license][license-badge]][license-link]
[![we're hiring][hiring-badge]][hiring-link]

```
npm install goodeggs-json-schema-validator
```

Common JSON schema and [tv4](https://github.com/geraintluff/tv4) add-ons for Good Eggs ecosystem.

## Common schema add-ons

Adds support for these formats:

- objectid
- date (YYYY-MM-DD)
- date-time (for example, 2014-05-02T12:59:29+00:00)
- time (HH:mm or HH:mm:ss, e.g. 23:04:20)
- email

Simply include the format in your schema:

```json
{"type": "string", "format": "date"}
```

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

## Releasing

To release a new version of this module, use yarn to bump the version
in `package.json` and create a git tag, then push. This will automatically
get published to the NPM registry via CI.

```sh
yarn version --new-version=<major|minor|patch|premajor|preminor|prepatch>
git push --follow-tags
```

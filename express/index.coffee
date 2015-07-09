###
express middleware to validate requests.
###

tv4 = require 'tv4'
boom = require 'boom'

# validate querystring params.
exports.validateQuery = (schema, options) ->
  return (req, res, next) ->
    _validate req.query, 'query params', schema, options, next


# validate URL parameters.
exports.validateParams = (schema, options) ->
  return (req, res, next) ->
    _validate req.params, 'URL params', schema, options, next


exports.validateBody = (schema, options) ->
  return (req, res, next) ->
    _validate req.body, 'body', schema, options, next


_validate = (obj, key, schema = {}, options = {}, next) ->
  schema.type ?= 'object'
  options.banUnknownProperties ?= false
  options.checkRecursive ?= false

  result = tv4.validateResult obj, schema, options.checkRecursive, options.banUnknownProperties
  if result.valid
    next()
  else
    # note, this only includes 1 error, even if there are multiple.
    dataPath = result.error.dataPath
    try dataPath = dataPath.replace(/^\//, '') # strip leading /
    next boom.badRequest("#{result.error.toString()} at '#{dataPath}' in #{key}")

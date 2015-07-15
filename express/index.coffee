###
express middleware to validate requests.
###

validator = require '../validator'
boom = require 'boom'

# validate querystring params.
exports.validateRequest = (field, schema, options) ->
  return (req, res, next) ->
    _validate req[field], "req.#{field}", schema, options, next


# validate URL parameters.
exports.validateResponse = (field, schema, options) ->
  return (req, res, next) ->
    _validate res[field], "res.#{field}", schema, options, next

_validate = (obj, key, schema = {}, options = {}, next) ->
  schema.type ?= 'object'
  options.banUnknownProperties ?= false
  options.checkRecursive ?= false

  cleanedObject = JSON.parse JSON.stringify obj # remove undefined, prototype properties, etc.

  result = validator.validateResult cleanedObject, schema, options.checkRecursive, options.banUnknownProperties
  if result.valid
    next()
  else
    # note, this only includes 1 error, even if there are multiple.
    dataPath = result.error.dataPath
    try dataPath = dataPath.replace(/^\//, '') # strip leading /
    next boom.badRequest("#{result.error.toString()} at '#{dataPath}' in #{key}")

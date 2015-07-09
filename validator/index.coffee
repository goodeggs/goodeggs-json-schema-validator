tv4 = require 'tv4'
formats = require 'tv4-formats'

tv4.addFormat 'objectid', (data) ->
  if typeof data is 'string' and /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(data)
    return null
  return "objectid expected"

# see https://github.com/ikr/tv4-formats for list of formats supported
tv4.addFormat formats

module.exports = tv4

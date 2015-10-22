tv4 = require 'tv4'

tv4.addFormat 'objectid', (data) ->
  if typeof data is 'string' and /^[a-f\d]{24}$/i.test(data)
    return null
  return "objectid expected"

tv4.addFormat 'date-time', (data) ->
  # Source: http://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
  dateTimeRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
  if typeof data is 'string' and dateTimeRegex.test(data)
    return null
  return "date-time, ISOString format, expected"

tv4.addFormat 'date', (data) ->
  if typeof data is 'string' and /\d{4}-[01]\d-[0-3]\d/.test(data)
    return null
  return "date, YYYY-MM-DD format, expected"

tv4.addFormat 'email', (data) ->
  # Source: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  if typeof data is 'string' and emailRegex.test(data)
    return null
  return "email expected"

tv4.addFormat 'non-negative-integer', (data) ->
  if typeof data is 'string' and /^[0-9]+$/.test(data)
    return null
  return "non negative integer expected"

module.exports = tv4

module.exports = {}

for key, fn of require('./express')
  module.exports[key] = fn

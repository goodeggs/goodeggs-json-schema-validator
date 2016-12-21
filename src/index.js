import tv4 from 'tv4';

const allowNull = (data, schema) => data === null && (schema.type === 'null' || schema.type.includes('null'));

tv4.addFormat('objectid', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  if (typeof data === 'string' && /^[a-f\d]{24}$/i.test(data)) {
    return null;
  }
  return "objectid expected";
});

tv4.addFormat('date-time', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  // Source: http://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
  const dateTimeRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
  if (typeof data === 'string' && dateTimeRegex.test(data)) {
    return null;
  }
  return "date-time, ISOString format, expected";
});

tv4.addFormat('date', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  if (typeof data === 'string' && /\d{4}-[01]\d-[0-3]\d/.test(data)) {
    return null;
  }
  return "date, YYYY-MM-DD format, expected";
});

tv4.addFormat('time', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  if (typeof data === 'string' && /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?$/.test(data)) {
    return null;
  }
  return "time, HH:mm:ss or HH:mm format, expected";
});

tv4.addFormat('email', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  // Source: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (typeof data === 'string' && emailRegex.test(data)) {
    return null;
  }
  return "email expected";
});

tv4.addFormat('non-negative-integer', function(data, schema) {
  if (allowNull(data, schema)) {
    return null;
  }
  if (typeof data === 'string' && /^[0-9]+$/.test(data)) {
    return null;
  }
  return "non negative integer expected";
});

export default tv4;
export function assertValid(data, schema) {
  const cleanedData = JSON.parse(JSON.stringify(data)); // remove undefined, convert dates to ISO strings, etc
  const {valid, error} = tv4.validateResult(cleanedData, schema, null, true);
  if (!valid) {
    const message = (function() {
      let result = "failed schema validation";
      if (error.schemaPath.length) {
        result += ` at ${error.schemaPath}`;
      }
      return result += `; ${error.message.toLowerCase()}`;
    })();
    error.name = 'SchemaValidationError';
    error.message = message;
    error.data = data;
    error.schema = schema;
    throw error;
  }
}

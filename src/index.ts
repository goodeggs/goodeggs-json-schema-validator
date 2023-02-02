import tv4, {JsonSchema, TV4, ValidationError} from 'tv4';
import assert from 'assert';

interface GoodeggsJsonSchemaValidator extends TV4 {
  assertValid(
    data: unknown,
    schema: JsonSchema,
    errorMessage?: string,
    opts?: {banUnknownProperties?: boolean},
  ): void;
}

export interface ValidationErrorExtended extends ValidationError {
  name?: string;
  data?: unknown;
  schema?: JsonSchema;
}

// @CamillaTeodoro we are adding the assertValid function in the end of the file.
// At this point Typescript doesn't know that assertValid exists
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clonedTv4: GoodeggsJsonSchemaValidator = tv4.freshApi();

const allowNull = (data: unknown, schema: JsonSchema): boolean =>
  data === null && (schema.type === 'null' || schema.type?.includes('null') === true);

clonedTv4.addFormat('objectid', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  if (typeof data === 'string' && /^[a-f\d]{24}$/i.test(data)) return null;
  return 'objectid expected';
});
clonedTv4.addFormat('date-time', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  // Source: http://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
  const dateTimeRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
  if (typeof data === 'string' && dateTimeRegex.test(data)) return null;
  return 'date-time, ISOString format, expected';
});
clonedTv4.addFormat('date', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  if (typeof data === 'string' && /\d{4}-[01]\d-[0-3]\d/.test(data)) return null;
  return 'date, YYYY-MM-DD format, expected';
});
clonedTv4.addFormat('time', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  if (typeof data === 'string' && /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?$/.test(data)) return null;
  return 'time, HH:mm:ss or HH:mm format, expected';
});
clonedTv4.addFormat('email', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  // Source: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (typeof data === 'string' && emailRegex.test(data)) return null;
  return 'email expected';
});
clonedTv4.addFormat('non-negative-integer', (data: unknown, schema: JsonSchema) => {
  if (allowNull(data, schema)) return null;
  if (typeof data === 'string' && /^[0-9]+$/.test(data)) return null;
  return 'non negative integer expected';
});

clonedTv4.assertValid = function (
  data: unknown,
  schema: JsonSchema,
  errorMessage?: string,
  {
    banUnknownProperties,
  }: {
    banUnknownProperties?: boolean;
  } = {
    banUnknownProperties: true,
  },
): void {
  assert(typeof schema === 'object', 'schema must be an object');
  if (errorMessage != null)
    assert(typeof errorMessage === 'string', 'errorMessage must be a string');
  const {valid, error}: {valid: boolean; error: ValidationErrorExtended} = clonedTv4.validateResult(
    data,
    schema,
    false,
    banUnknownProperties ?? true,
  );

  if (!valid) {
    const message = (() => {
      let result = '';
      if (errorMessage) result += `${errorMessage}; `;
      result += 'failed';
      if (schema.title) result += ` "${String(schema.title)}"`;
      result += ' schema validation';
      if (error.schemaPath) result += ` at schema path ${String(error.schemaPath)}`;
      if (error.dataPath) result += ` for data path ${String(error.dataPath)}`;
      result += `; ${String(error.message).toLowerCase()}`;
      return result;
    })();

    error.name = 'SchemaValidationError';
    error.message = message;
    error.data = data;
    error.schema = schema;
    // @CamillaTeodoro this error is from the tv4 library
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }
};

export default clonedTv4;

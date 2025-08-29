// utils/isFieldRequired.js
export const isFieldRequired = (schema, fieldName) => {
  try {
    const field = schema.fields[fieldName];
    return field?.exclusiveTests?.required === true;
  } catch (e) {
    return false;
  }
};

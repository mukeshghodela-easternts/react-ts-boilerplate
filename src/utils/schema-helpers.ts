import * as yup from 'yup';

export const merge = (...schemas: yup.AnySchema[]): yup.AnySchema => {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
};

export const requiredStringSchema = (
  fieldName: string,
  errorMessage: string
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.string().nullable().required(errorMessage)
  });
};

export const requiredEmailSchema = (
  fieldName = 'email',
  requiredMessage = 'Please enter your email address.',
  emailMessage = 'Please enter a valid email address.'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.string().required(requiredMessage).email(emailMessage)
  });
};

export const nullableEmailSchema = (
  fieldName = 'emailAddress',
  emailMessage = 'Please enter a valid email address.'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.string().nullable().email(emailMessage)
  });
};

export const requiredNumberSchema = (
  fieldName: string,
  errorMessage = 'Field is required'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.number().required(errorMessage)
  });
};

export const requiredNullableNumberSchema = (
  fieldName: string,
  errorMessage = 'Field is required'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.number().nullable().required(errorMessage)
  });
};

export const passwordSchema = (
  passwordField = 'password',
  confirmPasswordField = 'confirmPassword',
  passwordErrorMessage = 'Password required',
  confirmPasswordErrorMessage = 'Confirm password required',
  matchPasswordErrorMessage = 'Passwords must match'
): yup.AnySchema => {
  return yup.object({
    [passwordField]: yup.string().required(passwordErrorMessage),
    [confirmPasswordField]: yup
      .string()
      .required(confirmPasswordErrorMessage)
      .oneOf([yup.ref(passwordField), null], matchPasswordErrorMessage)
  });
};

export const stringArrayRequiredSchema = (
  fieldName = 'stringArray',
  errorMessage = 'Field is required'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup.array().min(1, errorMessage)
  });
};

export const phoneNumberSchema = (
  fieldName = 'phoneNumber',
  typeError = 'Please enter the area code, then the phone number, ex 09 1234567',
  errorMessage = 'Please enter your phone number',
  minMessage = 'Minimum length of phone number should be 10'
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup
      .number()
      .typeError(typeError)
      .test('len', minMessage, (val) => String(val).length >= 10)
      .required(errorMessage)
  });
};

export const maxLengthSchema = (
  fieldName = 'name',
  length = 10000,
  errorMessage = 'Please enter valid input'
): yup.AnySchema => {
  return yup.object({
    //[fieldName]: yup.string().length(length).typeError(errorMessage)
    [fieldName]: yup.string().max(length).typeError(errorMessage)
  });
};

export const customTest = (
  fieldName: string,
  errorMessage: string,
  testValue: string
): yup.AnySchema => {
  return yup.object({
    [fieldName]: yup
      .string()
      .test('isValid', errorMessage, (value) => value == testValue)
  });
};

export interface IValidationSchemaItem {
  param: string;
  type: any;
  error: string;
  required?: boolean;
  regex?: RegExp;
  customValidate?: (value: any) => boolean;
}

export const validateInput = (
  objectToValidate: any,
  validationSchema: IValidationSchemaItem[],
) => {
  const errors: {
    param: string;
    error: string;
    errorType:
      | 'INCORRECT_TYPE'
      | 'REGEX_UNMATCH'
      | 'IS_REQUIRED'
      | 'CUSTOM_VALIDATE_FAILED';
  }[] = [];
  validationSchema.forEach((o) => {
    if (objectToValidate[o.param]) {
      if (typeof objectToValidate[o.param] !== o.type) {
        errors.push({
          param: o.param,
          error: o.error,
          errorType: 'INCORRECT_TYPE',
        });
      }
      if (o.regex && !o.regex.test(objectToValidate[o.param])) {
        errors.push({
          param: o.param,
          error: o.error,
          errorType: 'REGEX_UNMATCH',
        });
      }
      if (
        o.customValidate &&
        typeof o.customValidate === 'function' &&
        !o.customValidate(objectToValidate[o.param])
      ) {
        errors.push({
          param: o.param,
          error: o.error,
          errorType: 'CUSTOM_VALIDATE_FAILED',
        });
      }
    } else {
      if (o.required) {
        errors.push({
          param: o.param,
          error: o.error,
          errorType: 'IS_REQUIRED',
        });
      }
    }
  });
  return errors;
};

export const commonValidator: {[key:string]: IValidationSchemaItem} = {
  email: {
    param: '',
    type: 'string',
    error: 'Formato de Correo Incorrecto',
    required: false,
    regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  }
}

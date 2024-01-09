export type Validator<Fields> = {
  field: Fields;
  message: string;
  isFieldValueValid: (fieldData: any) => Promise<boolean>;
};

export type PayloadValidatorProps<Fields> = {
  fields: readonly Fields[];
  validators?: Validator<Fields>[];
  required?: Fields[];
};

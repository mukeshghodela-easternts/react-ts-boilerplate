export type ValidationObj = { key: string, value: string }[];

export interface IDragAndDropValidations {
    file_upload: ValidationObj;
}

export interface IValidationArray {
    [index: string]: ValidationObj;
}

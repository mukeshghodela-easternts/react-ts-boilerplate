export interface IPagination {
    query?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    ascending?: number;
    filter?: string;
    isLight?: boolean;
}

export interface IModel {
    name: string;
    address: string;
    remark: string;
}
export interface ISupplierFullResponse extends ISupplierLightResponse{
    remark: string;
    address: string;
}
export interface ISupplierLightResponse {
    id: string;
    name: string;
}
export interface IParams {
    model: IModel;
    editId?: string|number
}

export type ValidationObj = { key: string, value: string }[];

export interface IValidations {
    name: ValidationObj;
    address: ValidationObj;
}

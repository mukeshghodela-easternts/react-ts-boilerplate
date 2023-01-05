import {IObject} from "./common";

export interface IPagination {
    query?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    ascending?: number;
    filter?: string;
    isLight?: boolean;
}

export interface IParams {
    model: IModel;
    editId?: string|number
}
export type ValidationObj = { key: string, value: string }[];
export interface IValidations {
    role: ValidationObj
}

export interface IModel {
    name: string;
}
export interface IRoleLightResponse {
    id: string;
    name: string;
}
export interface IRoleFullResponse extends IRoleLightResponse{
    created_by: null | string;
    guard_name: null | string;
    landing_page: null | string;
    updated_by: null | string
}

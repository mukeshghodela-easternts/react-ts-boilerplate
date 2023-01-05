import {IColorFullResponse, IColorLightResponse} from "./color";
import {ISupplierFullResponse, ISupplierLightResponse} from "./supplier";
import {IBrandFullResponse, IBrandLightResponse} from "./brand";
import {ResponseResult} from "./common";

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
    price: string;
    color_id: string;
    product_tags: string[];
    suppliers: string[];
    brands: string[];
}

export interface IParams {
    model: IModel;
    editId?: string|number
}
export interface IProductFullResponse extends IProductLightResponse{
    color_id: string;
    color: IColorFullResponse;
    product_tags: string[];
    suppliers: ISupplierFullResponse[];
    brands: IBrandFullResponse[];
}
export interface IProductLightResponse {
    id: string;
    name: string;
    price: string;
}
export type ValidationObj = { key: string, value: string }[];

export interface IValidations {
    name: ValidationObj;
    price: ValidationObj;
    color_id: ValidationObj;
    product_tags: ValidationObj;
    suppliers: ValidationObj;
    brands: ValidationObj;
}

export interface IProductBatchResponse {
    colorList: ResponseResult<IColorLightResponse[]>,
    brandList: ResponseResult<IBrandLightResponse[]>,
    supplierList: ResponseResult<ISupplierLightResponse[]>
}

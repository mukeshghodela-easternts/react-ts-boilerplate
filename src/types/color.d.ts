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
    remark: string
}

export interface IColorFullResponse extends IColorLightResponse{
    remark: string;
}
export interface IColorLightResponse {
    id: string;
    name: string;
}

export interface IParams {
    model: IModel;
    editId?: string|number
}

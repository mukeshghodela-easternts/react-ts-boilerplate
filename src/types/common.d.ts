export interface IObject {
    [key: string]: string | number | boolean | string[] | number[];
}
export interface IFunction {
    (): void;
}
export interface ResponseResult<T> {
    errors?: IObject;
    success?: boolean;
    message?: string;
    code?: string;
    current_page?: number;
    data?: T;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    next_page_url?: null | string;
    path?: string;
    per_page?: string | number;
    prev_page_url?: string;
    to?: number;
    total?: number;
}

export interface IImportReqParams {
    file: Blob | Blob[];
}

export interface IImportResponse {
    id: string;
    filename: string;
    file_path: string;
    model_name: string;
    user_id: string;
    status: string;
    status_text: string;
    no_of_rows: string;
    created_at: string;
    updated_at: string;
}

export interface IImportCSVLogResponse {
    row: number;
    error: string[];
}

export interface IBatchReqUrls {
    url: string;
    request_id: string;
}

export interface IBatchReqUrlsWithNoAuth {
    noAuth: boolean;
    urls: IBatchReqUrls[];
}

export interface IBatchRequestResponse<T> {
    response: T;
}
export interface IPuhserChannels {
    name: string;
    event: string;
    storeName: string;
    mutationSuffix: string;
    responseName: string;
}

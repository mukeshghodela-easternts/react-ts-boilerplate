import { IObject } from "./common";

export interface IModuleNames {
    id: string;
    name: string;
}

export interface ITableModalData {
    tableData: IObject[];
    col: string;
}
export interface IObjectModalData {
    modelData: IObject;
    col: string;
}
export interface IModel {
    created_at: string | Date;
    log_name: string;
    description: string;
    is_address: string;
    causer_id: string;
    user_id: [...string[]];
    module: [...string[]];
    period_type: string;
    start_date: string | Date;
    end_date: string | Date;
    is_all_date: string;
    is_all_module: string;
    is_all_user: string;
}

export interface IPeriodTypeItems {
    enum: string;
    name: string;
}

export interface IActivityLogFullResponse extends IActivityLogLightResponse{
    ip_address: string,
    subject_type: string;
    subject_id: string | null;
    subject: string | null,
    causer_type: string;
    causer_id: string;
    causer: {
        id: string;
        name: string;
        email: string;
        role_id: string;
        dob: string;
        profile: string;
        profile_original: string;
        profile_thumbnail: string;
        gender: string;
        status: string;
        email_verified_at: string;
    };
    response_type: string;
    response_type_text: string;
    properties: any;
    created_at: string;
    updated_at: string;
    causer_name: string;
}

export interface IActivityLogLightResponse {
    id: string;
    log_name: string;
    description: string;
}

export interface IPagination {
    query?: string;
    page?: number;
    limit?: number;
    orderBy?: string;
    ascending?: number;
    filter?: string;
    isLight?: boolean;
}

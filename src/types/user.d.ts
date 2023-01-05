import {IPermissionResponse} from "./permission";

export interface IExportProps {
    ids: string | string[];
    store: string;
    fileName: string;
    pagination: IPagination;
}

export interface IParamProps {
    idProps: string | number
    storeProps: string
    indexProps?: string | number
}

export interface IConfirmationProps {
    title: string
    description: string
    btnCancelText: string
    btnConfirmationText: string
}

export interface IDeleteProps {
    ids: string | string[];
    store: string;
}

export interface IImportProps {
    store: string
    modelName?: string
    multiple: boolean
    zipName?: string
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

export interface IModel {
    name: string;
    email: string;
    password: string;
    role_id: string;
    dob: string;
    profile: FileList | null | File | Blob;
    profile_upload: FileList | null | File | Blob;
    gender: string;
    status: string;
    user_galleries: Blob[];
    user_pictures: Blob[];
    register_date_time: string 
}

export interface IParams {
    model: IModel;
    editId?: string | number
}

export type ValidationObj = { key: string, value: string }[];

export interface IValidations {
    name: ValidationObj;
    email: ValidationObj;
    password: ValidationObj;
    role_id: ValidationObj;
    dob: ValidationObj;
    profile: ValidationObj;
    gender: ValidationObj;
    status: ValidationObj;
    user_galleries: ValidationObj;
    user_pictures: ValidationObj;
    registeration_date: ValidationObj;
    registeration_time: ValidationObj;
}

export interface CommonGallPic {
    created_at: string;
    created_by: number;
    deleted_at: string | null;
    id: string;
    updated_at: string;
    updated_by: number;
    user_id: string;
}
export interface IUserGalleries extends CommonGallPic{
    gallery: string;
    gallery_original: string;
    gallery_thumbnail: string;
}
export interface IUserPictures extends CommonGallPic {
    picture: string;
    picture_original: string;
    picture_thumbnail: string;
}
export interface IUserLightResponse {
    id: string;
    name: string;
    email: string;
}
export interface IUserFullResponse extends IUserLightResponse{
    dob: string;
    email_verified_at: string;
    gender: string;
    gender_text: string;
    profile: string;
    profile_original: string;
    profile_thumbnail: string;
    role: {
        created_at: string;
        created_by: null | string;
        deleted_at: null | string;
        guard_name: null | string;
        id: string;
        landing_page: null | string;
        name: string;
        updated_at: string;
        updated_by: null | string;
    }
    role_id: string;
    status: string;
    status_text: string;
    user_galleries: IUserGalleries[];
    user_pictures: IUserPictures[];
}

export interface ICurrentUserData extends IUserFullResponse{
    authorization: string;
    permissions: IPermissionResponse[];
    sample_excels:{
        sample_brand: string;
        sample_color: string;
        sample_product: string;
        sample_supplier: string;
        sample_user: string
    }[];
}

export interface ICheckEmail {
    id: string | number,
    email: string
}

export type RegisterDateTime = {
    date: string | Date;
    time: string | Date;
}
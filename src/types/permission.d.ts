export interface ICommonPermissionObject {
    id: string;
    label: string;
    name: string;
    guard_name: string;
}
export interface IPermissionObject extends ICommonPermissionObject{
    display_name: string;
    is_permission: string;
}

export interface IPermissionLightResponse extends ICommonPermissionObject{
    created_at: string;
    updated_at: string;
}

export interface IPermissionResponse extends IPermissionObject{
    sub_permissions: IPermissionObject[]
}

export interface IBindingValue {
    module: string
    subModule: string
}

export interface IModel {
    role_id: string;
    permission_id: string;
    is_permission: string;
}

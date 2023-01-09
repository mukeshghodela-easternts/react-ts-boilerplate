type ArrayOfObject = {[index: number]: string}[];
export interface ITableOptions {
    groupBy?: ArrayOfObject;
    groupDesc?: ArrayOfObject;
    itemsPerPage?: number;
    multiSort?: number;
    mustSort?: boolean;
    page?: number;
    sortBy?: ArrayOfObject;
    sortDesc?: ArrayOfObject;
}
export type IFilterModel = {
    [key: string]: [string|undefined] | string | string[];
};

export interface ITableHeaders {
    text: string,
    value: string,
    align?: 'start' | 'center' | 'end',
    sortable?: boolean,
    filterable?: boolean,
    groupable?: boolean,
    divider?: boolean,
    class?: string | string[],
    cellClass?: string | string[],
    width?: string | number,
    filter?: (value: any, search: string, item: any) => boolean,
    sort?: (a: any, b: any) => number
}

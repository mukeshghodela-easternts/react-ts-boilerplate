export interface IPagination {
  query?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  orderType?: string | boolean;
  filter?: string;
  isLight?: boolean;
}

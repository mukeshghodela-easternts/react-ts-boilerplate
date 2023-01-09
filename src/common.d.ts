export interface IPagination {
  query?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  descending?: string | boolean;
  filter?: string;
  isLight?: boolean;
}

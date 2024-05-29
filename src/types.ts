export enum AppRole {
  USER = 'user',
  ADMIN = 'admin',
}


export type Page<T> = {
  contents: T[];
  total: number;
  page: number;
  limit: number;
}
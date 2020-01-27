export interface IPage<T> {
  data: T[]
  count: number
}

export type PageSortOption = 1 | -1;

export type TGetRequestListData<T> = {
  error: any
  count: number
  results: T[]
}

export type TGetRequestDetailData<T> = {
  error: any
  data: T
}

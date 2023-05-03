import { TObject } from '~/types/constants'

type TStateDefault = {
  error: string[] | string | null
  isSuccess: boolean
  isFail: boolean
  isLoading: boolean
}

export type TStateListData<T1, T2 = TObject> = {
  prev: string | null
  next: string | null
  count: number
  results: T1[]
} & T2

export type TState<T> = TStateDefault & {
  data: T | null
}

export type TStateList<T> = TStateDefault & {
  data: TStateListData<T> | null
}

import { TGetPromise } from '../api/types'
import useGetListApi from '../api/useGetListApi'
import useDeepCompareEffect from '../useDeepCompareEffect'

import { TStateList } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseListState<T> extends TStateList<T> {
  getList: TGetPromise
}

export interface UseList<T> {
  count: number
  results: T[]
  getList: TGetPromise
  isLoading: boolean
}

export function toList<T> (state: UseListState<T>): UseList<T> {
  const results = state.data?.results || []
  const count = state.data?.count || results.length
  const isLoading = state.isLoading
  const getList = state.getList

  return { count, results, isLoading, getList }
}

type TDependencies = boolean | TGetPromise | TObject

export default function useList<T> (api: string, searchParams?: TObject, autoSend = true): UseList<T> {
  const { get, ...state } = useGetListApi<T>(api)
  const getList = get

  useDeepCompareEffect<TDependencies>(() => {
    if (autoSend) {
      getList(searchParams)
    }
  }, [autoSend, getList, searchParams])

  return toList<T>({ ...state, getList })
}

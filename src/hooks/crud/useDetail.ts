import { TGetPromise } from '../api/types'
import useGetApi from '../api/useGetApi'
import useDeepCompareEffect from '../useDeepCompareEffect'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseDetailState<T> extends TState<T> {
  getDetail: TGetPromise
}

export interface UseDetail<T> {
  detail: T | TObject
  getDetail: TGetPromise
  isLoading: boolean
}

export function toDetail<T> (state: UseDetailState<T>): UseDetail<T> {
  const detail = state.data || {}
  const isLoading = state.isLoading
  const getDetail = state.getDetail

  return { detail, isLoading, getDetail }
}

type TDependencies = boolean | TObject

export default function useDetail<T> (api: string, params?: TObject, autoSend = true): UseDetail<T> {
  const { get, ...state } = useGetApi<T>(api)
  const getDetail = get

  useDeepCompareEffect<TDependencies>(() => {
    if (autoSend) {
      getDetail(params)
    }
  }, [params, autoSend])

  return toDetail<T>({ ...state, getDetail })
}

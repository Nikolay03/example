import { useReducer, useCallback } from 'react'
import { useRouter } from 'next/router'

import { TGetPromise } from './types'
import { ActionTypes, initialStateGet, reducer } from './state'
import { getDataFromSuccess, getDataFromError } from './utils'
import useAxiosRequest from './useAxiosRequest'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseGetApi<T> extends TState<T> {
  get: TGetPromise<T>
}

export default function useGetApi<T> (url: string): UseGetApi<T> {
  const { locale: language } = useRouter()

  const request = useAxiosRequest()

  const fetchReducer = (state, action) => reducer<T>(state, action)
  const [state, dispatch] = useReducer(fetchReducer, initialStateGet)

  const requestCallback = useCallback((params: TObject) => {
    dispatch({ type: ActionTypes.PENDING })

    return request.get(url, { ...params, language })
      .then(response => {
        const data = getDataFromSuccess<T>(response)
        dispatch({ type: ActionTypes.SUCCESS, payload: data })

        return data
      })
      .catch(response => {
        const error = getDataFromError(response)
        dispatch({ type: ActionTypes.FAIL, payload: error })

        return Promise.reject(error)
      })
  }, [url, language])

  return { ...state, get: requestCallback }
}

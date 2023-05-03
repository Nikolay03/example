import { useReducer, useCallback } from 'react'

import { TPutPromise } from './types'
import { ActionTypes, reducer, initialState } from './state'
import { getDataFromSuccess, getDataFromError } from './utils'
import useAxiosRequest from './useAxiosRequest'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UsePutApi extends TState<TObject> {
  put: TPutPromise
}

export default function usePutApi (url: string): UsePutApi {
  const request = useAxiosRequest()

  const [state, dispatch] = useReducer(reducer, initialState)

  const requestCallback = useCallback((data: TObject) => {
    dispatch({ type: ActionTypes.PENDING })

    return request.put(url, data)
      .then(response => {
        const data = getDataFromSuccess(response)
        dispatch({ type: ActionTypes.SUCCESS, payload: data })

        return data
      })
      .catch(response => {
        const error = getDataFromError(response)
        dispatch({ type: ActionTypes.FAIL, payload: error })

        return Promise.reject(error)
      })
  }, [url])

  return { ...state, put: requestCallback }
}

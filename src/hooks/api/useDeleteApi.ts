import { useReducer, useCallback } from 'react'

import { TDeletePromise } from './types'
import { ActionTypes, reducer, initialState } from './state'
import { getDataFromSuccess, getDataFromError } from './utils'
import useAxiosRequest from './useAxiosRequest'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseDeleteApi extends TState<any> {
  delete: TDeletePromise
}

export default function useDeleteApi (): UseDeleteApi {
  const request = useAxiosRequest()

  const [state, dispatch] = useReducer(reducer, initialState)

  const requestCallback = useCallback((url: string, data: TObject) => {
    dispatch({ type: ActionTypes.PENDING })

    return request.delete(url, data)
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
  }, [])

  return { ...state, delete: requestCallback }
}

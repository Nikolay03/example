import { useReducer, useCallback } from 'react'

import { TUseUploadPromise } from './types'
import { ActionTypes, reducer, initialState } from './state'
import { getDataFromSuccess, getDataFromError } from './utils'
import useAxiosRequest from './useAxiosRequest'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseUploadApi extends TState<any> {
  upload: TUseUploadPromise
}

export default function useUploadApi (url: string): UseUploadApi {
  const request = useAxiosRequest()

  const [state, dispatch] = useReducer(reducer, initialState)

  const requestCallback = useCallback((data: TObject, onProgress: (event) => void) => {
    dispatch({ type: ActionTypes.PENDING })

    return request.upload(url, data, onProgress)
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

  return { ...state, upload: requestCallback }
}

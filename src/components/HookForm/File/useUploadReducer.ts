import { useReducer, Dispatch } from 'react'

export enum UploadActionTypes {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

type UploadReducerAction =
  { type: UploadActionTypes.PENDING } |
  { type: UploadActionTypes.UPLOADING, payload: number } |
  { type: UploadActionTypes.SUCCESS } |
  { type: UploadActionTypes.FAIL, payload: string }

export interface UploadState {
  isLoading: boolean
  error: string | null
  progress: number
}

type UseUploadReducer = [
  UploadState,
  Dispatch<UploadReducerAction>
]

export default function useUploadReducer (): UseUploadReducer {
  function reducer (state: UploadState, action: UploadReducerAction) {
    switch (action.type) {
      case UploadActionTypes.PENDING:
        return {
          ...state,
          isLoading: true
        }
      case UploadActionTypes.UPLOADING:
        return {
          ...state,
          isLoading: true,
          progress: action.payload
        }
      case UploadActionTypes.SUCCESS:
        return {
          isLoading: false,
          error: null,
          progress: 0
        }
      case UploadActionTypes.FAIL:
        return {
          isLoading: false,
          error: action.payload,
          progress: 0
        }
      default:
        return state
    }
  }

  const initialState = {
    isLoading: false,
    error: null,
    progress: 0
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch]
}

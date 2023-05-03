import { TState, TStateList } from '~/types/state'

export enum ActionTypes {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export type TReducerAction =
  { type: ActionTypes.PENDING } |
  { type: ActionTypes.SUCCESS, payload: any } |
  { type: ActionTypes.FAIL, payload: any }

export const initialState: TState<any> = {
  data: null,
  error: null,
  isSuccess: false,
  isFail: false,
  isLoading: false
}

export const initialStateGet: TState<any> = {
  ...initialState,
  isLoading: true
}

export const reducer = <T>(state: TState<T>, action: TReducerAction): TState<T> => {
  switch (action.type) {
    case ActionTypes.PENDING: return {
      ...state,
      isLoading: true
    }
    case ActionTypes.SUCCESS: return {
      data: action.payload,
      error: null,
      isSuccess: true,
      isFail: false,
      isLoading: false
    }
    case ActionTypes.FAIL: return {
      data: null,
      error: action.payload,
      isSuccess: false,
      isFail: true,
      isLoading: false
    }
    default: return state
  }
}

export const listReducer = <T>(state: TStateList<T>, action: TReducerAction): TStateList<T> => {
  switch (action.type) {
    case ActionTypes.PENDING: return {
      ...state,
      isLoading: true
    }
    case ActionTypes.SUCCESS: return {
      data: action.payload,
      error: null,
      isSuccess: true,
      isFail: false,
      isLoading: false
    }
    case ActionTypes.FAIL: return {
      data: null,
      error: action.payload,
      isSuccess: false,
      isFail: true,
      isLoading: false
    }
    default: return state
  }
}

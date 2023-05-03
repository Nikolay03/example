import { TObject } from '~/types/constants'

type TModalState = {
  isOpen: boolean
  errors: TObject
}

export enum ActionTypes {
  ACTION_OPEN= 'open',
  ACTION_CLOSE = 'close'
}

type TModalReducer =
  { type: ActionTypes.ACTION_OPEN, payload: TObject } |
  { type: ActionTypes.ACTION_CLOSE }

export function modalReducer (state: TModalState, action: TModalReducer): TModalState {
  switch (action.type) {
    case ActionTypes.ACTION_OPEN: {
      const { payload } = action
      return {
        ...state,
        ...payload,
        isOpen: true
      }
    }
    case ActionTypes.ACTION_CLOSE: {
      return {
        ...state,
        isOpen: false
      }
    }
    default: return state
  }
}

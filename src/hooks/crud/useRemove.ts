import { TDeletePromise } from '../api/types'
import useDeleteApi from '../api/useDeleteApi'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseRemove extends TState<TObject> {
  remove: TDeletePromise
}

export default function useRemove (): UseRemove {
  const state = useDeleteApi()

  return { ...state, remove: state.delete }
}

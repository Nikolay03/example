import { TPutPromise } from '../api/types'
import usePutApi from '../api/usePutApi'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseUpdate extends TState<TObject> {
  update: TPutPromise
}

export default function useUpdate (api: string): UseUpdate {
  const { put, ...state } = usePutApi(api)
  const update = put

  return { ...state, update }
}

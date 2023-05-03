import { TPostPromise } from '../api/types'
import usePostApi from '../api/usePostApi'

import { TState } from '~/types/state'
import { TObject } from '~/types/constants'

interface UseCreate extends TState<TObject> {
  create: TPostPromise
}

export default function useCreate (api: string): UseCreate {
  const { post, ...state } = usePostApi(api)

  return { ...state, create: post }
}

import { TGetRequestDetailData, TGetRequestListData } from '~/types/request'
import { TObject } from '~/types/constants'
import { TPostPromise } from '~/hooks/api/types'

export type TUseSubmit = {
  isLoading: boolean
  onSubmit: TPostPromise
}

export type TRefetchList = (params?: TObject, newApi?: string) => Promise<void>
export type TRefetchDetail = () => Promise<void>

export type TUseDetailRequest<T> = TGetRequestDetailData<T> & {
  isLoading: boolean
  refetch: TRefetchDetail
}

export type TUseRequest<T> = TGetRequestListData<T> & {
  isLoading: boolean
  refetch: TRefetchList
}

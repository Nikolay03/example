import { useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'

import { TUseDetailRequest } from '~/types/hooks'
import { getDetailData } from '~/utils/fetch'
import { detailFetcher } from '~/utils/swr'

interface UseDetailRequestOptions<T> extends SWRConfiguration {
  transformResponse?: boolean
  fallbackData?: T
}

// eslint-disable-next-line max-len
export default function UseDetailRequest<T> (api: string, options: UseDetailRequestOptions<T> = {}): TUseDetailRequest<T> {
  const { initialData, transformResponse, fallbackData, ...restOptions } = options

  const [isLoading, setIsLoading] = useState(false)

  const { data, error, isValidating, mutate } = useSWR<T>([api, transformResponse], detailFetcher, {
    initialData,
    revalidateOnFocus: false,
    ...restOptions
  })

  function refetch () {
    setIsLoading(true)
    return mutate(async () => await detailFetcher(api, transformResponse), false)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }

  const { data: detail } = getDetailData<T>(data, error)

  return {
    data: detail || fallbackData,
    error,
    refetch,
    isLoading: isValidating || isLoading
  }
}

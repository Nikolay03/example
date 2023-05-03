import { prop } from 'ramda'
import { GetServerSidePropsContext } from 'next'

import { TObject } from '~/types/constants'
import { TGetRequestDetailData, TGetRequestListData } from '~/types/request'
import { TStateListData } from '~/types/state'
import request from '~/utils/request'

export function getListData<T> (data: TStateListData<T>, error?: TObject): TGetRequestListData<T> {
  return {
    error,
    count: prop('count', data) || 0,
    results: prop('results', data) || []
  }
}

export function getDetailData<T> (data: T, error?: TObject): TGetRequestDetailData<T> {
  return { error, data }
}

interface FetchDataParams extends TObject {
  req: GetServerSidePropsContext['req']
}

export async function fetchData<T> (api: string, params: FetchDataParams): Promise<TStateListData<T>> {
  const { req, ...restParams } = params

  try {
    const response = await request({ req }).get<TStateListData<T>>(api, restParams)
    return response?.data
  }
  catch (e) {
    return {
      count: null,
      results: [],
      next: null,
      prev: null
    }
  }
}

export async function fetchDetailData<T> (api: string, params: FetchDataParams): Promise<T> {
  const { req, ...restParams } = params

  try {
    const response = await request({ req }).get<T>(api, restParams)
    return response?.data
  }
  catch (e) {
    return null
  }
}

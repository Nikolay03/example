import { prop } from 'ramda'

import { TObject } from '~/types/constants'
import request from '~/utils/request'

export function fetcher<T> (url: string, params: TObject): Promise<T> {
  return request()
    .get<T>(url, params)
    .then(prop('data'))
}

export function detailFetcher<T> (url: string, transformResponse?: boolean): Promise<T> {
  return request({ transformResponse })
    .get<T>(url)
    .then(prop('data'))
}

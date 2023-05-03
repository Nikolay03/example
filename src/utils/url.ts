import { dropLast, join, map, pipe, toPairs } from 'ramda'

import { getApiBaseURL } from '~/constants/api'
import { TObject } from '~/types/constants'
import { getToken } from '~/utils/cookies'

export function searchToQuery (search: string): Record<string, string> {
  const urlParams = new URLSearchParams(search)
  return Object.fromEntries(urlParams)
}

export function queryToSearch (query: Record<string, string>): string {
  return pipe(
    toPairs,
    map(join('=')),
    join('&')
  )(query)
}

export function openDocumentLink (api: string, params: TObject = {}): void {
  const apiBaseUrl = getApiBaseURL()
  const apiUrl = dropLast(1, apiBaseUrl) /* remove last slash */ + api
  const token = getToken()
  const searchParams = token ? { ...params, token } : params
  const search = queryToSearch(searchParams)
  const link = `${apiUrl}?${search}`

  window.open(link, '_blank')
}

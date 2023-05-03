import { is, prop } from 'ramda'

import toCamelCase from './toCamelCase'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function transformResponse (data: any, headers: any): any {
  const CONTENT_TYPE_JSON = 'application/json'
  const responseContentType: string = prop('content-type', headers)

  if (responseContentType && responseContentType.includes(CONTENT_TYPE_JSON)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

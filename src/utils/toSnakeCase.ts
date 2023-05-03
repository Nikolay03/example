import { is, map } from 'ramda'

import caseMapKeys from './caseMapKeys'

import { TObject } from '~/types/constants'

type TToSnakeCase = TObject[] | TObject | string

const toSnake = str => str
  .replace(/\./g, '__')
  .replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase())

export default function toSnakeCase (data: TToSnakeCase): TToSnakeCase {
  if (is(Array, data)) {
    return map(toSnakeCase, data)
  }

  if (data instanceof Object) {
    return map(toSnakeCase, caseMapKeys(toSnake, data))
  }

  return data
}

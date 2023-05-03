import { equals, map } from 'ramda'

import caseMapKeys from './caseMapKeys'

import { TObject } from '~/types/constants'

type TToCamelCase = TObject[] | TObject | string

const toCamel = (str: string) => {
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|_|\b\w)/g, (letter, index) =>
      equals(index, 0) ? letter.toLowerCase() : letter.toUpperCase())
    .replace(/\s+/g, '')
}

export default function toCamelCase (data: TToCamelCase): TToCamelCase {
  if (Array.isArray(data)) {
    return map(toCamelCase, data)
  }

  if (data instanceof Object) {
    return map(toCamelCase, caseMapKeys(toCamel, data))
  }

  return data
}

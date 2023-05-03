import { always, equals, ifElse, isNil, mapObjIndexed } from 'ramda'

import { TObject } from '~/types/constants'

export function replaceNilValues (object: TObject): TObject {
  return mapObjIndexed((ifElse(
    isNil,
    always(''),
    value => value
  )), object)
}

export function replaceEmptyValuesToNull (object: TObject): TObject {
  const checkIsEmptyOrNil = value => {
    return isNil(value) || equals('', value)
  }

  return mapObjIndexed((ifElse(
    checkIsEmptyOrNil,
    always(null),
    value => value
  )), object)
}

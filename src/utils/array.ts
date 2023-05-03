import { TSelectListItem } from '~/types/constants'

export type TArrayOfObjToObj = {
  [key in string]: string
}

export const arrayOfObjToObj = (array: TSelectListItem[]): TArrayOfObjToObj => {
  return array.reduce((obj, item) => {
    return ({ ...obj, [item.id]: item.name })
  }, {})
}

import { prop, propEq, uniqBy } from 'ramda'

import { TProductGroup } from '~/types/products'

type ProductTopParent = Omit<TProductGroup, 'children'>
type ProductTopParentResult = ProductTopParent[] | ProductTopParent

export function getTopParentByChildren (list: TProductGroup[], value: string | string[]): ProductTopParentResult {
  function finder (val: string) {
    return list.find(item => {
      const children = prop('children', item) || []
      const hasIn = children.some(propEq('id', Number(val)))
      return hasIn || getTopParentByChildren(children, val)
    })
  }

  if (Array.isArray(value)) {
    const parents = []
    value.forEach(val => {
      const foundParent = finder(val)
      parents.push(foundParent)
    })
    return uniqBy(prop('id'), parents.filter(Boolean))
  }

  return finder(value)
}

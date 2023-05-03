import { path } from 'ramda'

import { TRating } from '~/types/rating'
import { RatingDesignations } from '~/types/enums'

export function getUserReputation (object: { rating: TRating }): RatingDesignations {
  return path(['rating', 'designation'], object)
}

export function getCommodityProductName (product: string, parentProduct?: string): string {
  if (parentProduct) return `${product} (${parentProduct})`

  return product
}

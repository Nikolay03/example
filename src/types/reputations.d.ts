import { TRating } from '~/types/rating'
import { TRegionCountry } from '~/types/geo'
import { TFile } from '~/types/files'
import { UserTypes } from '~/types/enums'

export type TUserReputation = {
  id: number
  inn: string
  image: TFile
  name: string
  rating: TRating
  reason: string | null
  region: TRegionCountry
  registerAs: UserTypes
  reviewRating: number
  volumePrice: number
  volumeQuantity: number
}

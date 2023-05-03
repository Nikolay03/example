import { TUser } from '~/types/user'
import { TService } from '~/types/services'

export type TUserShowcase = TUser & {
  description: string
  informationForContractors: string
  services: TService[]
}

export type TUserReview = {
  id: number
  star: number
  comment: string
  user: TUser
}

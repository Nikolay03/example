import { UserTypes } from '~/types/enums'
import { TAccreditation } from '~/types/accreditaion'
import { TRating } from '~/types/rating'
import { TRegion } from '~/types/geo'

type TTariffPlan = {
  id: number
  name: string
}

export type TUser = {
  accreditation: TAccreditation
  balance: string
  companyDescription: string
  companyName: string
  companyType: string
  contactNumber: string
  feedbackCount: number
  firstName: string
  id: number
  inn: string
  isRegistered: boolean
  lastName: string
  name: string
  notificationCount: number
  patronymicName: string
  phoneNumber: string
  position: string
  rating: TRating
  region: TRegion
  registerAs: UserTypes
  reviewCount: number
  reviewRating: number
  site: string
  tariffPlan: TTariffPlan
  username: string
}

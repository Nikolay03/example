import { TSelectListItem } from '~/types/constants'
import * as ENUMS from '~/types/enums'
import { TCurrency, TMeasurement } from '~/types/references'
import { TUser } from '~/types/user'
import { TCountry, TDistrict, TRegion, TDistrictCountry, TQualityStandard } from '~/types/geo'
import { TProductAttributeValue, TProductGroup, TProductGroupAttributeName } from '~/types/products'
import { TFile } from '~/types/files'

type TradesProductGroup = Omit<TProductGroup, 'children'>

export type TTradeStats = {
  activeBargains: number
  activeCompanies: number
  salesSpeed: number
  tradingVolume: number
  dayActiveBargains: number
  dayActiveCompanies: number
  daySalesSpeed: number
  dayTradingVolume: number
}

export type TTradesParticipant = {
  id: number
  fullName: string
  proposedAmount: number
  rating: number
  totalPrice: number
  description?: string
  document?: TFile
}

export type TTradesOther = {
  id: number
  image: TFile
  user: TUser
  commodityGroupClassifier: TProductGroup
}

export type TTradesStatusFaktura = {
  status: string
}

export type TTrades = {
  attributes: TProductAttributeValue & {
    commodityName: TProductGroupAttributeName
  }[]
  bargainEndDatetime: string
  bargainStartDatetime: string
  bargainType: ENUMS.TradeTypes
  commodityGroupClassifier: TradesProductGroup
  contract: TFile | null
  currency: TCurrency
  deliveryAddress: string
  deliveryEndDate: string
  deliveryDistrict: TDistrictCountry
  deliveryStartDate: string
  description: string
  documents: TFile[]
  hasWon: boolean
  isFavourite: boolean
  id: number
  images: TFile[]
  isOrganizer: boolean
  isReviewed: boolean
  isUserAccepted: boolean
  kind: ENUMS.TradeKinds
  lat: string
  lon: string
  manufacturerCountry: TCountry
  measurement: TMeasurement
  otherBargains: TTradesOther[]
  participants: TTradesParticipant[]
  position: ENUMS.TradePositions
  price: string
  privacy: ENUMS.TradePrivacies
  responsibleContactPerson: string
  status: ENUMS.TradeStatuses
  termsOfPurchase: string
  user: TUser
  vat: number
  vatIsIncludedInThePrice: boolean
  visibility: string
  volume: string
  winner: TUser
}

export type TTradesTable = {
  id: number
  kind: ENUMS.TradeKinds
  organizer: string
  isOrganizer: boolean
  rating: number
  commodityGroupClassifier: TradesProductGroup
  volume: string
  measurement: TMeasurement
  deliveryDistrict: TDistrictCountry
  bargainEndDatetime: string
  status: ENUMS.TradeStatuses
}

export type TAccountTrades = {
  bargainEndDatetime: string
  commodityGroupClassifier: TradesProductGroup
  id: number
  kind: ENUMS.TradeKinds
  measurement: TMeasurement
  status: ENUMS.TradeStatuses
  volume: string
}

export type TTradesParticipantWinner = {
  id: number
  bargain: {
    id: number
    isOrganizer: boolean
    currency: TCurrency
  }
  user: TUser
  proposedAmount: number
  description: string
  document: TFile
  isWinner: boolean
}

export type TTradesRequest = {
  kind: TSelectListItem
  position: TSelectListItem
  bargainStartDatetime: Date
  bargainEndDatetime: Date
  bargainType: TSelectListItem
  privacy: TSelectListItem
  visibility: TSelectListItem
  users: TUser[]
  vat: string
  vatIsIncludedInThePrice: boolean
  responsibleContactPerson: string
  termsOfPurchase: string
  deliveryStartDate: Date
  deliveryEndDate: Date
  deliveryRegion: TRegion
  deliveryDistrict: TDistrict
  incoterms: TSelectListItem
  deliveryAddress: string
  deliveryGeo: number[]
  commodityGroupClassifier: TProductGroup
  manufacturerCountry: TCountry
  qualityStandard: TQualityStandard
  attributes: { attribute: TProductAttributeValue }[]
  volume: string
  measurement: TMeasurement
  description: string
  price: string
  currency: TCurrency
  documents: TFile[]
  images: TFile[]
}

export type TTradesSerialized = {
  kind: string
  position: string
  bargainStartDatetime: string
  bargainEndDatetime: string
  bargainType: string
  privacy: string
  visibility: string
  users: number[] | any[]
  vat: string
  vatIsIncludedInThePrice: boolean
  responsibleContactPerson: string
  termsOfPurchase: string
  deliveryStartDate: string
  deliveryEndDate: string
  deliveryDistrict: number
  incoterms: string
  deliveryAddress: string
  lat: number
  lon: number
  commodityGroupClassifier: number
  manufacturerCountry: number
  qualityStandard: number
  attributes: number[]
  volume: string
  measurement: number
  description: string
  price: string
  currency: number
  documents: number[] | any[]
  images: number[] | any[]
}

export type TTradesMaxPrice = {
  maxPrice: number
  maxVolume: number
}

export type TTradesContractTemplate = {
  id: number
  fileEn: TFile
  fileRu: TFile
  fileUz: TFile
  nameEn: string
  nameRu: string
  nameUz: string
}

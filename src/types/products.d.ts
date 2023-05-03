import { TFile } from '~/types/files'
import { TMeasurement } from '~/types/references'
import { TCountry, TDistrictCountry, TRegion } from '~/types/geo'

export type TProductGroup = {
  id: number
  code: string
  nameRu: string
  nameEn: string
  nameUz: string
  children?: TProductGroup[]
  parent?: Omit<TProductGroup, 'parent' | 'children' | 'code'>
}

export type TProductAttributeValue = {
  id: number
  valueRu: string
  valueEn: string
  valueUz: string
}

export type TProductGroupAttributeName = {
  id: number
  nameRu: string
  nameEn: string
  nameUz: string
}

export type TProductGroupAttributeNameTrade = {
  name: string
  id: number
}

export type TProductBanner = {
  id: number,
  commodityGroupClassifier: {
    id: number,
    parent: {
      id: number
      nameRu: string
      nameEn: string
      nameUz: string
      image: TFile,
      bannerImage: TFile
    },
    nameRu: string
    nameEn: string
    nameUz: string
  },
  price: string,
  deliveryAddress: string,
  deliveryDistrict: TDistrictCountry,
  measurement: TMeasurement,
  isFavourite: boolean
}

export type TProductGroupPopular = {
  id: number
  parentId: number
  nameRu: string
  nameEn: string
  nameUz: string
  image: TFile
  count: number
}

export type TProductGroupAttribute = TProductGroupAttributeName & {
  attributes: TProductAttributeValue[]
}

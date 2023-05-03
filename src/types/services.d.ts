import { TFile } from '~/types/files'

export type TServiceCategory = {
  id: number
  nameRu: string
  nameEn: string
  nameUz: string
  serviceCount: number
}

export type TServicePartner = {
  id: number
  companyName: string
  image: TFile
}

export type TService = {
  category: Omit<TServiceCategory, 'serviceCount'>
  descriptionEn: string
  descriptionRu: string
  descriptionUz: string
  id: number
  image: TFile
  isActive: boolean
  nameEn: string
  nameRu: string
  nameUz: string
  partners: TServicePartner[]
}

export type TAccountService = {
  id: number
  service: TService
}

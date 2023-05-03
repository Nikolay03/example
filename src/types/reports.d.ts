import { TFile } from '~/types/files'
import { TCountry, TRegion } from '~/types/geo'
import { Locales, ReportCoverages, ReportCategories } from '~/types/enums'

export type TReport = {
  category: ReportCategories
  createdDate: string
  description: string
  file: TFile
  fileFormat: string
  hasPurchased: boolean
  id: number
  isFree: boolean
  language: Locales
  miniDescription: string
  name: string
  previewFile: TFile
  price: string
  worldType: ReportCoverages
  worlds: TCountry[] | TRegion[] | null
}

export type TAccountReport = {
  id: number
  report: TReport
}

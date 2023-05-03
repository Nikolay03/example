import { Locales } from '~/types/enums'
import { TFile } from '~/types/files'
import { TProductGroup } from '~/types/products'

export type TNewsCategory = {
  id: number
  createdDate: string
  title: string
  keywords: string[]
  language: Locales
  newsCount: number
}

export type TNews = {
  category: TNewsCategory
  createdDate: string
  fullDescription: string
  id: number
  image: TFile
  keywords: string[]
  language: Locales
  productInterests: Omit<TProductGroup, 'children' | 'parent'>[]
  shortDescription: string
  sourceUrl: string
  title: string

}

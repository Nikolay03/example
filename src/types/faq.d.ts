import { Locales } from '~/types/enums'

export type TFaq = {
  id: number
  language: Locales
  question: string
  answer: string
}

export type TFaqGrouped = {
  id: number
  count: number
  faqs: TFaq[]
  language: Locales
  title: string
}

export type TFaqCategory = {
  id: number
  title: string
  count: number
}

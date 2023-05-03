export type TCurrency = {
  id: number
  ccy: string
  diff: string
  rate: number
}

export type TConfig = Record<string, string>

export type TStaticPage = {
  id: number
  key: string
  titleRu: string
  titleEn: string
  titleUz: string
  descriptionRu: string
  descriptionEn: string
  descriptionUz: string
  bodyRu: string
  bodyEn: string
  bodyUz: string
}

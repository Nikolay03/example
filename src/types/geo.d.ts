export type TGeolocation = {
  lat: number | string
  lon: number | string
}

export type TCountry = {
  id: number
  nameRu: string
  nameEn: string
  nameUz: string
}

export type TQualityStandard = {
  country: TCountry,
  createdDate: Date
  descriptionEn: string
  descriptionRu: string
  descriptionUz: string
  designationEn: string
  designationRu: string
  designationUz: string
  id: number
  isDelete: boolean
  modifiedDate: Date
  name: string
}

export type TRegion = {
  id: number
  nameRu: string
  nameEn: string
  nameUz: string
}

export type TDistrict = {
  id: number
  nameRu: string
  nameEn: string
  nameUz: string
}

export type TRegionCountry = TRegion & {
  country: TCountry
}

export type TDistrictCountry = TDistrict & {
  region: TRegion & {
    country: TCountry
  }
}

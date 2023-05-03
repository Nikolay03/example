import { TProductGroup } from '~/types/products'

export type TNotifications = {
  createdDate: string
  id: number
  isShow: boolean
  objectId: number
  objectModel: string
  textEn: string
  textRu: string
  textUz: string
}

export type TNotificationsCount = {
  count: number
  feedbackCount: number
}

export type TMailingNotify = {
  id: number
  nameEn: string
  nameRu: string
  nameUz: string
  setUser: boolean
}

export type TCgcNotify = {
  cgc: Omit<TProductGroup, 'children' | 'code' | 'parent'>
  nameEn: string
  nameRu: string
  nameUz: string
  id: number
  isActive: boolean
}

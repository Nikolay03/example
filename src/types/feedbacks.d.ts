import { FeedbackTypes } from '~/types/enums'
import { TFile } from '~/types/files'

export type TFeedback = {
  adminComment: string | null
  answerDate: string | null
  createdDate: string
  email: string
  file: TFile | null
  fio: string
  id: null
  isGuest: boolean
  message: string
  phone: string
  recipient: number
  recipientAnswer: string | null
  theme: string
  type: FeedbackTypes
}

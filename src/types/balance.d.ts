import { TUser } from '~/types/user'
import { InvoiceStatuses } from '~/types/enums'

export type TBalanceInvoice = {
  createdDate: string
  id: number
  nameEn: string
  nameRu: string
  nameUz: string
  paymentType: string | null
  price: string
  status: InvoiceStatuses
}

export type TBalanceTransaction = {
  comment: string | null
  createdDate: string
  id: number
  invoice: TBalanceInvoice
  price: string
  user: TUser
}

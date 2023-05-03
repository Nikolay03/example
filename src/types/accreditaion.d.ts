import { AccreditationStatuses } from '~/types/enums'

export type TAccreditation = {
  status: AccreditationStatuses
  modifiedDate: string
}

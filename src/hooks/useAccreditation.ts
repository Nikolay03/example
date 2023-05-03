import { equals, path, pathOr } from 'ramda'

import * as CONST from '~/constants/constants'
import * as ENUMS from '~/types/enums'
import { getUserReputation } from '~/utils/get'
import { useAuth } from '~/components/AuthProvider'

interface IUseAccreditation {
  userCanTrade: boolean
  userHasAccreditation: boolean
}

export default function useAccreditation (): IUseAccreditation {
  const { user } = useAuth()

  const userRating = getUserReputation(user)
  const userRatingRank = pathOr(0, [userRating, 'rank'], CONST.USER_REPUTATIONS)
  const userCanTrade = userRatingRank >= 3

  const accreditationStatus = path(['accreditation', 'status'], user)
  const userHasAccreditation = equals(ENUMS.AccreditationStatuses.APPROVED, accreditationStatus)

  return {
    userCanTrade,
    userHasAccreditation
  }
}

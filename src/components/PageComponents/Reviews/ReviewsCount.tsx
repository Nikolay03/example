import { ReactElement } from 'react'
import { sprintf } from 'sprintf-js'

import { PrimaryLink } from '~/components/Link'
import { USER_REVIEWS_URL } from '~/constants/routes'
import { getNumberDeclination } from '~/utils/string'
import { useTranslate } from '~/utils/translate'

interface Props {
  userId: number
  count: number
}

export default function ReviewsCount (props: Props): ReactElement {
  const { userId, count } = props

  const { t } = useTranslate()

  if (!count) return null

  const userReviewsUrl = sprintf(USER_REVIEWS_URL, userId)
  const countHumanize = getNumberDeclination(count, [
    t('reviews_count_variant_1_text'),
    t('reviews_count_variant_2_text'),
    t('reviews_count_variant_3_text')
  ])
  const label = `(${countHumanize})`

  return (
    <PrimaryLink href={userReviewsUrl}>
      {label}
    </PrimaryLink>
  )
}

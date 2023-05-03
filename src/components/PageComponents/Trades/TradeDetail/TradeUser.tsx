import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Stack } from '@chakra-ui/react'

import { TUser } from '~/types/user'
import { getUserReputation } from '~/utils/get'
import RatingStar from '~/components/RatingStar'
import { ReviewsCount } from '~/components/PageComponents/Reviews'

interface Props {
  user: TUser
}

export default function TradeUser (props: Props): ReactElement {
  const { user } = props

  const userId = prop('id', user)
  const userName = prop('name', user)
  const userRating = getUserReputation(user)
  const userReviewRating = prop('reviewRating', user)
  const userReviewCount = prop('reviewCount', user)

  const userNameAndRating = `${userName} (${userRating})`

  return (
    <Stack align={'flex-end'} spacing={1}>
      <Box>{userNameAndRating}</Box>
      <Stack align={'start'} direction={'row'} fontSize={'sm'}>
        <RatingStar isSimple={true} value={userReviewRating} />
        <ReviewsCount userId={userId} count={userReviewCount} />
      </Stack>
    </Stack>
  )
}

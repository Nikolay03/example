import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Stack } from '@chakra-ui/react'

import { getUserReputation } from '~/utils/get'
import RatingStar from '~/components/RatingStar'
import { VerticalDivider } from '~/components/Misc'
import { TUser } from '~/types/user'

interface Props {
  user: TUser
}

export default function ReviewsUserInfo (props: Props): ReactElement {
  const { user } = props

  const userName = prop('name', user)
  const userRating = getUserReputation(user)
  const userReviewRating = prop('reviewRating', user)

  return (
    <Stack
      align={'center'}
      direction={'row'}
      fontSize={'xl'}
      fontWeight={'semibold'}
      spacing={3}>
      <Box>{userName}</Box>
      <VerticalDivider />
      <Box>{userRating}</Box>
      <RatingStar
        isSimple={true}
        fontSize={'inherit'}
        size={5}
        value={userReviewRating}
      />
    </Stack>
  )
}

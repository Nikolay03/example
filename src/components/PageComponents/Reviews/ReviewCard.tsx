import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Stack, Text } from '@chakra-ui/react'

import { TUserReview } from '~/types/showcase'
import RatingStar from '~/components/RatingStar'

interface Props {
  data: TUserReview
}

export default function ReviewCard (props: Props): ReactElement {
  const { data } = props

  const user = prop('user', data)
  const userName = prop('name', user)
  const star = prop('star', data)
  const comment = prop('comment', data)

  return (
    <Stack
      borderColor={'gray.200'}
      borderWidth={1}
      borderRadius={'xl'}
      p={{ base: 6, md: 8 }}>
      <Box fontWeight={'semibold'}>{userName}</Box>
      <RatingStar isReadOnly={true} value={star} />
      <Text color={'gray.500'} lineHeight={'base'}>{comment}</Text>
    </Stack>
  )
}

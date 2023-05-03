import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Stack, Text } from '@chakra-ui/react'

import { phoneNumberParse } from '~/utils/fieldParsers'
import { useAuth } from '~/components/AuthProvider'
import RatingStar from '~/components/RatingStar'

export default function AccountUser (): ReactElement {
  const { user } = useAuth()

  const reviewRating = prop('reviewRating', user)
  const firstName = prop('firstName', user)
  const lastName = prop('lastName', user)
  const phoneNumber = phoneNumberParse(prop('phoneNumber', user))
  const username = prop('username', user)
  const fullName = `${firstName} ${lastName}`

  return (
    <Stack px={5} spacing={1}>
      <Text fontSize={'sm'} fontWeight={'bold'}>{fullName}</Text>

      <Box>
        <Text fontSize={'xs'}>{username}</Text>
        <Text fontSize={'xs'}>{phoneNumber}</Text>
      </Box>

      <RatingStar isSimple={true} value={reviewRating} />
    </Stack>
  )
}

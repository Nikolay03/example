import { ReactElement } from 'react'
import { head, isEmpty, path, prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import { Avatar, AvatarGroup, Box, Stack } from '@chakra-ui/react'

import { USER_DETAIL_URL } from '~/constants/routes'
import { TServicePartner } from '~/types/services'

interface Props {
  partners: TServicePartner[]
}

export default function ServicePartners (props: Props): ReactElement {
  const { partners } = props

  const router = useRouter()

  if (isEmpty(partners)) return null

  function onRedirectPartnerPage (id) {
    return router.push(sprintf(USER_DETAIL_URL, id))
  }

  if (partners.length > 1) {
    return (
      <AvatarGroup max={3}>
        {partners.map(partner => {
          const partnerId = prop('id', partner)
          const partnerImage = path<string>(['image', 'file'], partner)

          return (
            <Avatar
              key={partnerId}
              cursor={'pointer'}
              src={partnerImage}
              onClick={onRedirectPartnerPage.bind(null, partnerId)}
            />
          )
        })}
      </AvatarGroup>
    )
  }

  const partner = head(partners)
  const partnerId = prop('id', partner)
  const partnerName = prop('companyName', partner)
  const partnerImage = path<string>(['image', 'file'], partner)

  return (
    <Stack
      align={'center'}
      cursor={'pointer'}
      direction={'row'}
      onClick={onRedirectPartnerPage.bind(null, partnerId)}>
      <Avatar name={partnerName} src={partnerImage} />
      <Box fontWeight={'semibold'} noOfLines={1}>{partnerName}</Box>
    </Stack>
  )
}

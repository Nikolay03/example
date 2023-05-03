import { ReactElement } from 'react'
import { not, prop } from 'ramda'
import { Box, Stack } from '@chakra-ui/react'

import { useAccountNavigation } from './accountNavigation'
import AccountUser from './AccountUser'

import { NavLink } from '~/components/Link'

export default function AccountNav (): ReactElement {
  const { navigation } = useAccountNavigation()

  return (
    <Stack spacing={10}>
      <AccountUser />

      <Stack as={'nav'} spacing={4} mb={4}>
        {navigation.map(nav => {
          const key = prop('key', nav)
          const href = prop('href', nav)
          const title = prop('title', nav)
          const icon = prop('icon', nav)
          const hasPermission = prop('hasPermission', nav)

          if (not(hasPermission)) return null

          return (
            <NavLink
              key={key}
              href={href}
              alignItems={'center'}
              display={'flex'}
              fontWeight={'medium'}
              lineHeight={'1.25rem'}
              borderRadius={'xl'}
              py={4}
              px={5}
              sx={{
                '&.active': {
                  bgColor: 'gray.100'
                },
                '&:hover:not(.active)': {
                  color: 'primary.500'
                }
              }}>
              {icon}
              <Box
                flexGrow={1}
                ml={3}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}>
                {title}
              </Box>
            </NavLink>
          )
        })}
      </Stack>
    </Stack>
  )
}

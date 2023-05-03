import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import nav from '~/constants/nav'
import { useTranslate } from '~/utils/translate'
import { NavLink } from '~/components/Link'

export default function Navigation (): ReactElement {
  const { t } = useTranslate()

  return (
    <Stack
      as={'nav'}
      direction={'row'}
      display={{ base: 'none', lg: 'flex' }}
      spacing={6}>
      {nav.map(menu => (
        <NavLink
          key={menu.url}
          href={menu.url}
          sx={{
            '&.active': {
              color: 'primary.500'
            },
            '&:hover': {
              color: 'primary.500'
            }
          }}>
          {t(menu.title)}
        </NavLink>
      ))}
    </Stack>
  )
}

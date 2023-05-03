import { ReactElement } from 'react'
import { isEmpty } from 'ramda'
import { MenuListComponentProps } from 'react-select'
import { Box, Stack, Text } from '@chakra-ui/react'

import { TAttributeSelect } from './types'

import { useTranslate } from '~/utils/translate'

type Props = MenuListComponentProps<TAttributeSelect, true>

export default function ProductAttributesMenuList (props: Props): ReactElement {
  const { children, getStyles, theme, ...restProps } = props
  const { options } = restProps

  const { t } = useTranslate()

  const rootStyle = getStyles('menuList', { theme })

  if (isEmpty(options)) {
    return (
      <Box sx={rootStyle}>
        {children}
      </Box>
    )
  }

  return (
    <Box sx={rootStyle}>
      <Stack>
        <Box px={4} mt={2}>
          <Text color={'palette.common.orange'} fontSize={'xs'}>
            {t('trades_create_attributes_menu_hint')}
          </Text>
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Box>
  )
}

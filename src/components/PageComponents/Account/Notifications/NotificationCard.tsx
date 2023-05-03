import { ReactElement } from 'react'
import { Circle, Flex, Stack, Text, useToken } from '@chakra-ui/react'

import useNotificationButton from './useNotificationButton'

import { TNotifications } from '~/types/notifications'
import hexToRgba from '~/utils/hexToRgba'
import { useTranslate } from '~/utils/translate'
import Settings from '~/icons/common/Settings'

interface Props {
  data: TNotifications
}

export default function NotificationCard (props: Props): ReactElement {
  const { data } = props

  const { translateData } = useTranslate()

  const primaryColor = useToken('colors', 'primary.500')
  const iconBgColor = hexToRgba(primaryColor, '0.12')

  const button = useNotificationButton(data)
  const message = translateData(data, 'text')

  return (
    <Stack
      align={{ base: 'unset', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      justify={'space-between'}
      spacing={{ base: 6, md: 8 }}>
      <Stack direction={'row'} spacing={4}>
        <Circle bgColor={iconBgColor} size={9}>
          <Settings color={'primary.500'} />
        </Circle>
        <Flex as={Text} align={'center'} fontSize={'sm'}>
          {message}
        </Flex>
      </Stack>

      {button}
    </Stack>
  )
}

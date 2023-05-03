import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Button, ButtonProps, useBreakpointValue } from '@chakra-ui/react'

import * as ROUTES from '~/constants/routes'
import { TNotifications } from '~/types/notifications'
import { useTranslate } from '~/utils/translate'
import Link from '~/components/Link'

interface ActionButtonProps extends ButtonProps {
  href?: string
}

function ActionButton (props: ActionButtonProps) {
  const size = useBreakpointValue({ base: 'md', md: 'sm' })

  return (
    <Button
      alignSelf={'baseline'}
      h={{ base: 10, md: 9 }}
      minW={'auto'}
      w={{ base: 'full', sm: 'auto' }}
      size={size}
      {...props}
    />
  )
}

export default function useNotificationButton (data: TNotifications): ReactElement {
  const { t } = useTranslate()

  const objectId = prop('objectId', data)
  const objectModel = prop('objectModel', data)

  switch (objectModel) {
    case 'bargain_choose_winner': {
      const linkUrl = sprintf(ROUTES.TRADES_WINNER_URL, objectId)

      return (
        <ActionButton as={Link} href={linkUrl}>
          {t('trades_choose_winner_button')}
        </ActionButton>
      )
    }
    case 'bargain_invited':
    case 'bargain_winner': {
      const linkUrl = sprintf(ROUTES.TRADES_DETAIL_URL, objectId)

      return (
        <ActionButton as={Link} href={linkUrl}>
          {t('notifications_trade_detail_button')}
        </ActionButton>
      )
    }
    default: return null
  }
}

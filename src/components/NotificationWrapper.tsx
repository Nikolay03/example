import { Fragment, ReactNode, ReactElement, useEffect } from 'react'
import { path } from 'ramda'
import { useRouter } from 'next/router'
import { Box, Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { TNotificationsCount } from '~/types/notifications'
import firebase from '~/lib/firebase'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useDetail } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'

interface Props {
  children: ReactNode
}

type TFirebaseNotifyResponse = {
  data: {
    link?: string
    type?: string
  }
  notification: {
    body: string
    clickAction: string
    image: string
  }
}

export default function NotificationWrapper (props: Props): ReactElement {
  const { children } = props

  const { t } = useTranslate()

  const toast = useToast()

  const router = useRouter()

  const { fetchUserInfo, onUpdateUser } = useAuth()

  const { getDetail: getNotificationCount } = useDetail(API.NOTIFICATION_COUNT, null, false)

  function goToLink (link) {
    return router.push(link)
  }

  useEffect(() => {
    const isSupportedMessaging = firebase.messaging.isSupported()
    const messaging = isSupportedMessaging ? firebase.messaging() : null

    if (messaging) {
      messaging.onMessage((payload: TFirebaseNotifyResponse) => {
        // eslint-disable-next-line no-console
        console.log(payload)
        const link = path(['data', 'link'], payload)
        const type = path(['data', 'type'], payload)
        const message = path(['notification', 'body'], payload)

        if (type === 'payment') {
          fetchUserInfo()
        }

        toast({
          title: 'Уведомление',
          description: (
            <Stack spacing={1}>
              <Box>{message}</Box>
              {link && (
                <Box
                  color={'white'}
                  cursor={'pointer'}
                  fontSize={'sm'}
                  onClick={goToLink.bind(null, link)}>
                  {t('button_more_details')}
                </Box>
              )}
            </Stack>
          ),
          duration: 7000,
          isClosable: false,
          status: 'info',
          position: 'top-right'
        })

        getNotificationCount()
          .then((response: TNotificationsCount) => {
            onUpdateUser({
              notificationCount: response.count
            })
          })
      })
    }
  }, [])

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

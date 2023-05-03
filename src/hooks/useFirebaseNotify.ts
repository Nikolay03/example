import useToast from './useToast'

import firebase from '~/lib/firebase'
import { useTranslate } from '~/utils/translate'

async function getMessagingToken (): Promise<string> {
  try {
    const messaging = firebase.messaging()
    await Notification.requestPermission()

    return await messaging.getToken()
  }
  catch (error) {
    return await Promise.reject(error)
  }
}

interface UseFirebaseNotify {
  getNotifyToken: () => Promise<string>
}

export default function useFirebaseNotify (): UseFirebaseNotify {
  const { t } = useTranslate()

  const toast = useToast()

  function getNotifyToken (): Promise<string> {
    const hasNoAccess = !('Notification' in window)
    const isGranted = Notification.permission === 'granted'
    const isDenied = Notification.permission === 'denied'

    if (hasNoAccess) {
      toast({
        title: t('warning_default_label'),
        description: 'Ваш браузер не поддерживает уведомления',
        status: 'warning'
      })
      return
    }

    if (isGranted || !isDenied) {
      return getMessagingToken()
    }

    toast({
      title: t('warning_default_label'),
      description: 'Уведомления отключены',
      status: 'warning'
    })

    return Promise.resolve('')
  }

  return { getNotifyToken }
}

import { prop } from 'ramda'

import { useCreate } from '~/hooks/crud'
import { RESET_PASSWORD_SAVE } from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { TObject } from '~/types/constants'
import { TUseSubmit } from '~/types/hooks'

interface UseResetPassword {
  initialValues?: TObject
  onSuccess?: () => void
}

export default function useResetPassword ({ initialValues = {}, onSuccess }: UseResetPassword): TUseSubmit {
  const { t } = useTranslate()

  const toast = useToast()

  const { create, isLoading } = useCreate(RESET_PASSWORD_SAVE)

  function onSubmit (values) {
    const newPassword = prop('newPassword', values)

    return create({ newPassword, ...initialValues })
      .then(() => {
        toast({
          status: 'success',
          title: t('reset_password_success_title'),
          description: t('reset_password_success_message')
        })
      })
      .then(onSuccess)
  }

  return { isLoading, onSubmit }
}

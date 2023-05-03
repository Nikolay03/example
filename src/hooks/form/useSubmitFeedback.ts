import { path, prop } from 'ramda'

import * as API from '~/constants/api'
import { FeedbackTypes } from '~/types/enums'
import { TObject } from '~/types/constants'
import { TUseSubmit } from '~/types/hooks'
import { TFile } from '~/types/files'
import { replaceNilValues } from '~/utils/object'
import { phoneNumberParse } from '~/utils/fieldParsers'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'

interface TFeedbackRequest {
  recipient?: string
  fio?: string
  email?: string
  phone?: string
  theme?: string
  message?: string
  type?: FeedbackTypes
  file?: TFile
}

function serializer (values: TFeedbackRequest): TFeedbackRequest {
  return {
    recipient: prop('recipient', values),
    fio: prop('fio', values),
    email: prop('email', values),
    phone: prop('phone', values),
    theme: prop('theme', values),
    message: prop('message', values),
    type: prop('type', values),
    file: path(['file', 'id'], values)
  }
}

interface UseSubmitFeedbackParams {
  initialValues?: TObject
  onSuccess?: () => void
}

interface UseSubmitFeedback extends TUseSubmit {
  defaultValues: TFeedbackRequest
}

export default function useSubmitFeedback (type: string, params: UseSubmitFeedbackParams = {}): UseSubmitFeedback {
  const { initialValues, onSuccess } = params

  const { t } = useTranslate()

  const toast = useToast()

  const { user, isAuth } = useAuth()

  const { create, isLoading } = useCreate(API.FEEDBACK_CREATE)

  const firstName = prop('firstName', user)
  const lastName = prop('lastName', user)
  const username = prop('username', user)
  const phoneNumber = prop('phoneNumber', user)

  const userValues = isAuth
    ? {
      fio: `${firstName} ${lastName}`,
      email: username,
      phone: phoneNumberParse(phoneNumber)
    }
    : {}

  const defaultValues = replaceNilValues({
    ...initialValues,
    ...userValues,
    type
  })

  function onSubmit (values) {
    return create(serializer(values))
      .then(() => {
        toast({
          status: 'success',
          title: t('feedback_success_toast_title'),
          description: t('feedback_success_toast_description')
        })
      })
      .then(() => {
        if (typeof onSuccess === 'function') {
          onSuccess()
        }
      })
  }

  return { onSubmit, isLoading, defaultValues }
}

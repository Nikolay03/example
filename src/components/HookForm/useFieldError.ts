import { prop } from 'ramda'
import { FieldError } from 'react-hook-form'

import { useTranslate } from '~/utils/translate'

export default function useFieldError (error: FieldError): string {
  const { t } = useTranslate()

  const errorMessages = {
    required: t('field_error_required')
  }

  const errorType = prop('type', error)
  const errorMessage = prop('message', error)

  return errorMessage || errorMessages[errorType]
}

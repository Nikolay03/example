import { has, ifElse, omit, pipe, prop } from 'ramda'

import { TObject } from '~/types/constants'
import toCamelCase from '~/utils/toCamelCase'
import { useToast } from '~/hooks/index'
import { useTranslate } from '~/utils/translate'

const NON_FIELD_ERROR = 'nonFieldErrors'

function getDefaultNonFieldErrors (error: TObject) {
  return error ? { [NON_FIELD_ERROR]: [error] } : {}
}

type TSubmitErrors = {
  errors: TObject
  nonFieldError: string
}

interface UseSubmitForm {
  getSubmitErrors: (error) => TSubmitErrors
}

export default function useSubmitForm (): UseSubmitForm {
  const { t } = useTranslate()

  const toast = useToast()

  function getSubmitErrors (e): TSubmitErrors {
    const fieldErrors = e
    if (e instanceof Error) {
      toast({
        title: t('error_default_label'),
        description: e.message,
        status: 'error'
      })
      return
    }

    const formedErrorData = pipe(
      ifElse(
        has('detail'),
        pipe(
          prop('detail'),
          getDefaultNonFieldErrors
        ),
        toCamelCase
      )
    )(fieldErrors)

    const nonFieldError = prop(NON_FIELD_ERROR, formedErrorData)
    const restFieldErrors = omit([NON_FIELD_ERROR], formedErrorData)

    return {
      errors: restFieldErrors,
      nonFieldError
    }
  }

  return {
    getSubmitErrors
  }
}

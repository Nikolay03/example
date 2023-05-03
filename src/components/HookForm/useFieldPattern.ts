/* eslint-disable max-len */

import { useTranslate } from '~/utils/translate'

export type FieldPattern = {
  value: RegExp
  message: string
}

interface UseFieldPattern {
  emailFieldPattern: FieldPattern
  passwordFieldPattern: FieldPattern,
  urlFieldPattern: FieldPattern
}

export default function useFieldPattern (): UseFieldPattern {
  const { t } = useTranslate()

  const emailFieldPattern = {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: t('field_error_invalid_email')
  }

  const passwordFieldPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: t('field_error_password_chars_validate')
  }

  const urlFieldPattern = {
    value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
    message: t('field_error_invalid_url')
  }

  return {
    emailFieldPattern,
    passwordFieldPattern,
    urlFieldPattern
  }
}

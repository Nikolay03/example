import useFieldPattern, { FieldPattern } from './useFieldPattern'

import { useTranslate } from '~/utils/translate'

interface UseFieldRules {
  emailRules: {
    required: boolean
    pattern: FieldPattern
  }
  passwordRules: {
    required: boolean
    minLength: {
      value: number
      message: string
    }
    pattern: FieldPattern
  }
}

export default function useFieldRules (): UseFieldRules {
  const { t } = useTranslate()

  const { emailFieldPattern, passwordFieldPattern } = useFieldPattern()

  const emailRules = {
    required: true,
    pattern: emailFieldPattern
  }

  const passwordRules = {
    required: true,
    minLength: {
      value: 8,
      message: t('field_error_password_min_length', { minLength: 8 })
    },
    pattern: passwordFieldPattern
  }

  return {
    emailRules,
    passwordRules
  }
}

import { useTranslate } from '~/utils/translate'

type TValidateReturn = string | undefined

interface UseFieldValidate {
  validateEmail: (value) => TValidateReturn
  validateRequired: (value) => TValidateReturn
  validatePassword: (value) => TValidateReturn
  validateConfirmPassword: (confirmValue, value) => TValidateReturn
}

export default function useFieldValidate (): UseFieldValidate {
  const { t } = useTranslate()

  function validateRequired (value: string): TValidateReturn {
    return value ? undefined : t('field_error_required')
  }

  function validateEmail (value: string): TValidateReturn {
    if (!value) return validateRequired(value)
    // eslint-disable-next-line max-len
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = regexp.test(value)
    return isValid ? undefined : t('field_error_invalid_email')
  }

  function validatePassword (value: string): TValidateReturn {
    if (!value) return validateRequired(value)

    const minLength = 8
    if (value.length < minLength) return t('field_error_password_min_length', { minLength })

    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    const isValid = regexp.test(value)
    // (?=.*[a-z]) represent at least one lowercase character.
    // (?=.*[A-Z]) represents at least one uppercase character.
    // (?=.*\\d) represents at least one numeric value.
    // . represents any character except line break.
    // + represents one or more times.
    return isValid ? undefined : t('field_error_password_chars_validate')
  }

  function validateConfirmPassword (confirmValue: string, passwordValue: string): TValidateReturn {
    if (!confirmValue) return validateRequired(confirmValue)

    if (confirmValue !== passwordValue) {
      return 'Пароли не совпадают'
    }

    return undefined
  }

  return {
    validateEmail,
    validateRequired,
    validatePassword,
    validateConfirmPassword
  }
}

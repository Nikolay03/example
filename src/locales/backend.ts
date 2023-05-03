import inputs from './inputs'

import { TLocaleObject } from '~/types/locales'

export const BACKEND_LOCALE_PREFIX = 'backend'

const locales: TLocaleObject = {
  warning_default_label: {
    ru: 'Внимание',
    en: 'Warning',
    uz: 'Диққат'
  },
  error_default_label: {
    ru: 'Ошибка',
    en: 'Error',
    uz: 'Хатолик юз берди'
  },

  [`${BACKEND_LOCALE_PREFIX}_password`]: inputs.input_password_label,
  [`${BACKEND_LOCALE_PREFIX}_inn`]: inputs.input_inn_label,
  [`${BACKEND_LOCALE_PREFIX}_contactNumber`]: inputs.input_contact_number_label
}

export default locales

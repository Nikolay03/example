import { prop, path } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'

import { capitalize } from './string'

import locales from '~/locales/index'
import { TObject } from '~/types/constants'

function translate (key: string, locale: string): string {
  return path([key, locale], locales) || path([key, 'ru'], locales)
}

interface UseTranslate {
  t: <T = string>(key: string, params?: TObject) => string | T
  translateData: <T = string>(obj: TObject, valueKey: string) => T
}

export function useTranslate (): UseTranslate {
  const { locale } = useRouter()

  function t (key, params) {
    return params
      ? sprintf(translate(key, locale), params)
      : translate(key, locale)
  }

  function translateData (obj, valueKey) {
    const name = valueKey + capitalize(locale) /* titleRu, titleEn ... */
    const nameDefault = valueKey + capitalize('ru') /* titleRu: ru locale */
    const result = prop(name, obj)
    return result || prop(nameDefault, obj)
  }

  return { t, translateData }
}

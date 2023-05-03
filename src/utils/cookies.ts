import Cookies from 'js-cookie'

import { Locales } from '~/types/enums'

export const COOKIE_TOKEN_KEY = 'token'
export const COOKIE_LOCALE_KEY = 'NEXT_LOCALE'

function getCookie<T = string> (cookieName: string): T {
  if (typeof window !== 'undefined') {
    return Cookies.get(cookieName)
  }
  return null
}

export function getToken (): string {
  return getCookie(COOKIE_TOKEN_KEY)
}

export function setToken (token: string): void {
  Cookies.set(COOKIE_TOKEN_KEY, token, {
    expires: 7, // 7 days
    path: '/'
  })
}

export function removeToken (): void {
  Cookies.remove(COOKIE_TOKEN_KEY)
}

export function setLocale (locale: string): void {
  Cookies.set(COOKIE_LOCALE_KEY, locale, {
    expires: 365,
    path: '/'
  })
}

export function getLocale (fallbackLocale: Locales = Locales.UZ): Locales {
  return getCookie<Locales>(COOKIE_LOCALE_KEY) || fallbackLocale
}

import format from 'date-fns/format'
import formatDuration from 'date-fns/formatDuration'
import intervalToDuration from 'date-fns/intervalToDuration'
import { ru, enUS, uz, ko } from 'date-fns/locale'
import { useRouter } from 'next/router'

const locales = { ru, en: enUS, uz, ko }

export const DATE_FORMATS = {
  DATE_FORMAT_DEFAULT: 'dd.MM.yyyy',
  DATETIME_FORMAT_DEFAULT: 'dd.MM.yyyy \' | \' HH:mm',
  DATETIME_FORMAT_DEFAULT_SIMPLE: 'dd.MM.yyyy HH:mm',

  DATE_FORMAT_SHORT: 'dd.MM.yy',
  DATETIME_FORMAT_SHORT: 'dd.MM.yy \' | \' HH:mm',

  DATE_MONTH_FORMAT_SHORT: 'MM/yyyy',
  DATETIME_FORMAT_SHORT_SIMPLE: 'dd.MM.yy HH:mm',

  DATE_FORMAT_LOC: 'd MMMM, yyyy',
  DATETIME_FORMAT_LOC: 'd MMMM, yyyy \' | \' HH:mm',

  DATE_FORMAT_SERVER: 'yyyy-MM-dd',
  DATETIME_FORMAT_SERVER: 'yyyy-MM-dd HH:mm'
}

type FormatDurationOptions = {
  format?: string[]
  zero?: boolean
  delimiter?: string
}

interface UseDateFormat {
  dateFormat: (date: string, format?: string) => string
  getDurationFromInterval: (
    startDate: Date | string,
    endDate: Date | string,
    options?: FormatDurationOptions
  ) => string
}

function formatDate (dateString: string, locale: string, formatString: string): string {
  if (!dateString) return null
  return format(new Date(dateString), formatString, {
    locale: locales[locale]
  })
}

export function formatFalsyDate (date: Date, dateFormat: string) {
  if (!date) return null

  return format(date, dateFormat)
}

export function useDateFormat (): UseDateFormat {
  const { locale } = useRouter()

  function dateFormat (date, format = DATE_FORMATS.DATE_FORMAT_LOC) {
    return formatDate(date, locale, format)
  }

  function getDurationFromInterval (startDate, endDate, options = {}) {
    if (!startDate || !endDate) return ''

    const formedOptions = {
      ...options,
      locale: locales[locale]
    }

    const durationObject = intervalToDuration({
      start: new Date(startDate),
      end: new Date(endDate)
    })

    return formatDuration(durationObject, formedOptions)
  }

  return {
    dateFormat,
    getDurationFromInterval
  }
}

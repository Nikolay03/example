import { useRouter } from 'next/router'

interface UseBigNumberFormat {
  bigNumberFormat: (value: string | number) => string
}

interface NumberFormatOptions {
  localeMatcher?: string;
  style?: string;
  currency?: string;
  currencyDisplay?: string;
  currencySign?: string;
  useGrouping?: boolean;
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}

export function toNumber (value: number | string): number {
  const parsedStr = Number(value)
  return isNaN(parsedStr) ? 0 : parsedStr
}

export function numberFormat (value: number | string, suffix?: string, options?: NumberFormatOptions): string {
  const formatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    ...options
  })

  const number = toNumber(value)
  const formattedNumber = formatter.format(number)

  if (number && suffix) return `${formattedNumber} ${suffix}`
  if (number) return formattedNumber
  return suffix ? `0 ${suffix}` : '0'
}

export function useBigNumberFormat (): UseBigNumberFormat {
  const { locale } = useRouter()

  const numberAbbreviations = {
    ru: [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'тыс.' },
      { value: 1e6, symbol: 'млн.' },
      { value: 1e9, symbol: 'млрд.' },
      { value: 1e12, symbol: 'трлн.' }
    ],
    en: [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'm' },
      { value: 1e9, symbol: 'bn' },
      { value: 1e12, symbol: 'tn' }
    ],
    uz: [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'ming' },
      { value: 1e6, symbol: 'mln.' },
      { value: 1e9, symbol: 'mlrd.' },
      { value: 1e12, symbol: 'trln.' }
    ]
  }[locale]

  function bigNumberFormat (value: string | number): string {
    if (!value) return '0'

    const positiveValue = Math.abs(toNumber(value))
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = numberAbbreviations.slice().reverse().find(function (obj) {
      return positiveValue >= obj.value
    })

    return `${(positiveValue / item?.value).toFixed(2).replace(rx, '$1')} ${item?.symbol}`
  }

  return {
    bigNumberFormat
  }
}

/* eslint-disable max-len */
import { replace } from 'ramda'

export function withoutSpaceParse (value: string): string {
  if (!value) return ''
  return replace(/ /g, '', value)
}

export function phoneNumberParse (value: string): string {
  if (!value) return ''

  const withoutSpaces = withoutSpaceParse(value)
  const onlyNumsAndSymbol = replace(/[^\d\W]/g, '', withoutSpaces)

  if (onlyNumsAndSymbol.length <= 4) {
    return `${onlyNumsAndSymbol.slice(0, 4)} `
  }
  else if (onlyNumsAndSymbol.length <= 6) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)}`
  }
  else if (onlyNumsAndSymbol.length <= 9) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)}`
  }
  else if (onlyNumsAndSymbol.length <= 11) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)}`
  }
  else if (onlyNumsAndSymbol.length <= 13 || onlyNumsAndSymbol.length > 13) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)} ${onlyNumsAndSymbol.slice(11, 13)}`
  }
}

export function innNumberParse (value: string): string {
  if (!value) return ''
  return value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim()
}

import { isNil, mapObjIndexed } from 'ramda'

type FormatSelectValues = Record<string, { id: number }>
type FormatStaticSelectValues = Record<string, { id: string }>
type FormatDateValues = Record<string, Date>

export function formatSelectValues<T> (object: T): FormatSelectValues {
  const mapper = value => value ? ({ id: Number(value) }) : null
  return mapObjIndexed(mapper, object)
}

export function formatStaticSelectValues<T> (object: T): FormatStaticSelectValues {
  const mapper = value => isNil(value) ? null : ({ id: String(value) })
  return mapObjIndexed(mapper, object)
}

export function formatDateValues<T> (object: T): FormatDateValues {
  const mapper = date => date ? new Date(date) : null
  return mapObjIndexed(mapper, object)
}

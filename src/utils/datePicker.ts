import isToday from 'date-fns/isToday'
import isAfter from 'date-fns/isAfter'
import isSameDay from 'date-fns/isSameDay'

type FilterDateOptions = {
  allowSameDay?: boolean
}

export function filterPastDate (date: Date): boolean {
  const currentDate = new Date()
  const selectedDate = new Date(date)

  if (isToday(selectedDate)) return true
  return isAfter(selectedDate, currentDate)
}

export function filterPastTime (time: Date): boolean {
  const currentDate = new Date()
  const selectedDate = new Date(time)

  return currentDate.getTime() < selectedDate.getTime()
}

export function filterSelectedEndDate (startDate: Date, endDate: Date, options: FilterDateOptions = {}): boolean {
  const { allowSameDay = false } = options

  if (allowSameDay && isSameDay(startDate, endDate)) return true

  return isAfter(new Date(endDate), new Date(startDate))
}

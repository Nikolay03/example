import { ReactElement, ReactNode } from 'react'
import isSameDay from 'date-fns/isSameDay'
import { Box } from '@chakra-ui/react'

interface CalendarContainerProps {
  children: ReactNode
}

interface PopperContainerProps {
  children: ReactNode
}

export function calendarContainer (props: CalendarContainerProps): ReactElement {
  const { children } = props

  return (
    <Box
      bgColor={'white'}
      border={'1px solid'}
      borderRadius={'md'}
      borderColor={'gray.200'}
      display={'inline-block'}
      pos={'relative'}
      sx={{
        '& .react-datepicker__header': {
          bgColor: 'gray.100',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          '& .react-datepicker__day-name': {
            color: 'inherit'
          },
          '&.react-datepicker__header--time': {
            display: 'none'
          }
        },
        '& .day': {
          borderRadius: 'base',
          color: 'inherit',
          '&:hover': {
            bgColor: 'gray.200'
          },
          '&[class*="selected"]': {
            bgColor: 'palette.common.blue',
            color: 'white'
          },
          '&[class*="disabled"]': {
            opacity: '0.5',
            pointerEvents: 'none'
          },
          '&[class*="outside-month"]': {
            opacity: '0.5'
          },
          '&.current_day:not([class*="selected"])': {
            bgColor: 'primary.500',
            color: 'white'
          }
        },
        '& .time': {
          '&.selected_time': {
            bgColor: 'var(--chakra-colors-palette-common-blue) !important',
            color: 'var(--chakra-colors-white) !important'
          }
        }
      }}>
      {children}
    </Box>
  )
}

export function dayClassName (date: Date): string {
  const isToday = isSameDay(new Date(), date)
  return isToday ? 'day current_day' : 'day'
}

export function timeClassName (time: Date, hour: number, minute: number) : string {
  const hours = time.getHours()
  const minutes = time.getMinutes()

  const isActive = hour === hours && minute === minutes

  return isActive ? 'time selected_time' : 'time'
}

export function popperContainer (props: PopperContainerProps): ReactElement {
  const { children } = props

  return (
    <Box sx={{
      '& .react-datepicker-popper': {
        zIndex: 2000
      }
    }}>
      {children}
    </Box>
  )
}

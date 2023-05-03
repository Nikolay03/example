/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, ReactElement } from 'react'
import { omit } from 'ramda'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.min.css'
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-AU'
import uz from 'date-fns/locale/uz'
import { useController, useFormContext } from 'react-hook-form'
import styled from '@emotion/styled'
import { Box, Icon, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'

import FormControl from '../../FormControl'

import { calendarContainer, dayClassName, timeClassName, popperContainer } from './utils'
import CalendarIcon from './CalendarIcon'

import { FormFieldProps } from '~/types/components'
import { DATE_FORMATS } from '~/utils/date'

registerLocale('ru', ru)
registerLocale('en', en)
registerLocale('uz', uz)

const DatePickerWrapper = styled(Box)`
  & .react-datepicker-wrapper {
    display: block;
  }
  
  & .datepicker_calendar {
    font-family: inherit;
  }
`

const CustomInput = (props, ref) => (
  <InputGroup>
    <Input {...props} ref={ref} autoComplete={'off'} readOnly={true} />
    <InputRightElement height={'full'} pointerEvents={'none'} right={1} zIndex={'unset'}>
      <Icon as={CalendarIcon} color={'gray.500'} />
    </InputRightElement>
  </InputGroup>
)

const CustomInputRef = forwardRef<HTMLInputElement, InputProps>(CustomInput)

interface Props extends FormFieldProps<Omit<ReactDatePickerProps, 'onChange'>> {
  size?: string
  variant?: string
  showTimeSelect?: boolean
  onlyMonthSelect?: boolean
}

export default function DatePicker (props: Props): ReactElement {
  const {
    name,
    label,
    isRequired,
    rules,
    size,
    showTimeSelect,
    onlyMonthSelect,
    variant,
    ...restProps
  } = props

  const { locale } = useRouter()

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })
  const { value, onChange, ...inputProps } = omit(['ref'], field)
  const { invalid, error } = fieldState

  const dateFormat = showTimeSelect
    ? DATE_FORMATS.DATETIME_FORMAT_LOC
    : onlyMonthSelect
      ? DATE_FORMATS.DATE_MONTH_FORMAT_SHORT
      : DATE_FORMATS.DATE_FORMAT_LOC

  function onChangeDate (value: Date) {
    const time = format(value, 'HH:mm')
    const currentTime = format(new Date(), 'HH:mm')
    if (time === '00:00') {
      const formedDateTime = format(value, `yyyy-MM-dd ${currentTime}`)
      onChange(new Date(formedDateTime))
      return
    }
    onChange(value)
  }

  return (
    <FormControl
      id={name}
      isInvalid={invalid}
      isRequired={isRequired}
      label={label}
      error={error}>
      <DatePickerWrapper>
        {/*  @ts-ignore */}
        <ReactDatePicker
          {...inputProps}
          onChange={onChangeDate}
          calendarClassName={'datepicker_calendar'}
          calendarContainer={calendarContainer}
          customInput={(
            <CustomInputRef
              size={size}
              variant={variant}
            />
          )}
          dayClassName={dayClassName}
          dateFormat={dateFormat}
          locale={locale}
          placeholderText={''}
          portalId={'datepicker-portal'}
          popperContainer={popperContainer}
          selected={value}
          showTimeSelect={showTimeSelect}
          // @ts-ignore
          timeClassName={timeClassName}
          timeIntervals={15}
          {...restProps}
        />
      </DatePickerWrapper>
    </FormControl>
  )
}

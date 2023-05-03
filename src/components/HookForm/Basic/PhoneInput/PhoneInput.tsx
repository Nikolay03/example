// @ts-nocheck todo
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { useRouter } from 'next/router'
import { useController, useFormContext } from 'react-hook-form'
import ru from 'react-phone-number-input/locale/ru.json'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'
import { Globe } from 'react-feather'
import PhoneNumberInput, { isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input'
import styled from '@emotion/styled'
import { Box, Input as ChakraInput, InputProps, useMergeRefs } from '@chakra-ui/react'

import FormControl from '../../FormControl'
import InputGroup, { InputGroupProps } from '../InputGroup'

import { CountrySelectWithIcon } from './CountrySelect'

import { FormFieldProps } from '~/types/components'
import { useTranslate } from '~/utils/translate'

const Container = styled(Box)`
  & .PhoneInput {
    width: 100%;
  }
  & .PhoneInputCountryIcon--border {
    border-radius: 2px;
    box-shadow: none;
    overflow: hidden;
  }
`

const defaultCountry = 'UZ'
const labels = { ru, en, uz: en }

interface CustomInputProps extends InputProps {
  innerRef: Ref<HTMLInputElement>
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function Input (props, ref) {
  // eslint-disable-next-line react/prop-types
  const { innerRef, ...restProps } = props

  const inputRef = useMergeRefs(innerRef, ref)

  return (
    <ChakraInput ref={inputRef} {...restProps} />
  )
})

interface Props extends FormFieldProps<InputProps>, Omit<InputGroupProps, 'children'> {}

export default function PhoneInput (props: Props): ReactElement {
  const {
    name,
    label,
    size,
    variant,
    rules,
    isRequired,
    leftElement,
    rightElement,
    elementProps,
    ...restProps
  } = props

  const { t } = useTranslate()

  const { locale } = useRouter()

  const { control } = useFormContext()

  const [country, setCountry] = useState(defaultCountry)

  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      validate: value => {
        if (!value) return undefined

        const countryCode = getCountryCallingCode(country)
        const valueIsCode = value === `+${countryCode}`

        if (valueIsCode) return undefined

        const isValid = isValidPhoneNumber(value)
        return isValid ? undefined : t('field_error_invalid_phone')
      }
    },
    defaultValue: ''
  })

  const { ref, ...inputProps } = field
  const { invalid, error } = fieldState

  return (
    <Container>
      <FormControl
        id={name}
        label={label}
        error={error}
        isInvalid={invalid}
        isRequired={isRequired}>
        <InputGroup
          leftElement={leftElement}
          rightElement={rightElement}
          elementProps={elementProps}>
          <PhoneNumberInput
            innerRef={ref}
            labels={labels[locale]}
            defaultCountry={defaultCountry}
            countrySelectComponent={props => {
              return CountrySelectWithIcon({
                ...props,
                onChange: country => {
                  setCountry(country)
                  props.onChange(country)
                }
              })
            }}
            inputComponent={CustomInput}
            internationalIcon={Globe}
            countryOptionsOrder={['UZ', 'RU', 'KZ']}
            limitMaxLength={true}
            international={true}
            size={size}
            variant={variant}
            {...inputProps}
            {...restProps}
          />
        </InputGroup>
      </FormControl>
    </Container>
  )
}

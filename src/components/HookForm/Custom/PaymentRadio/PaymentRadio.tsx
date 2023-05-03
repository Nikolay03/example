import { ReactElement, ReactNode } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Box, SimpleGrid, useToken, useRadio, useRadioGroup, RadioProps } from '@chakra-ui/react'

import FormControl from '../../FormControl'

import PaymentPayme from './PaymentPayme'
import PaymentClick from './PaymentClick'

import { BalancePaymentTypes } from '~/types/enums'
import hexToRgba from '~/utils/hexToRgba'
import { FormFieldProps } from '~/types/components'

interface RadioCardProps extends RadioProps {
  children: ReactNode
}

function RadioCard (props: RadioCardProps) {
  const { children } = props

  const { getInputProps, getCheckboxProps } = useRadio(props)
  const [gray500] = useToken('colors', ['gray.500'])

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as={'label'}>
      <input {...input} id={undefined} />
      <Box
        {...checkbox}
        borderColor={hexToRgba(gray500, '0.3')}
        borderWidth={2}
        cursor={'pointer'}
        h={'100px'}
        p={8}
        pointerEvents={input.defaultChecked ? 'none' : 'unset'}
        transition={'all 200ms'}
        borderRadius={'xl'}
        _hover={{
          borderColor: hexToRgba(gray500, '0.7')
        }}
        _checked={{
          borderColor: 'primary.500'
        }}>
        {children}
      </Box>
    </Box>
  )
}

export default function PaymentRadio (props: FormFieldProps): ReactElement {
  const { name, label, isRequired, defaultValue } = props

  const options = [
    { value: BalancePaymentTypes.PAYME, content: <PaymentPayme /> },
    { value: BalancePaymentTypes.CLICK, content: <PaymentClick /> }
  ]

  const { control } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange: field.onChange,
    value: field.value
  })

  const group = getRootProps()

  return (
    <FormControl
      id={name}
      label={label}
      isRequired={isRequired}>
      <SimpleGrid columns={options.length} spacing={5} {...group}>
        {options.map(option => {
          const { value, content } = option
          const radio = getRadioProps({ value })

          return (
            <RadioCard key={value} {...radio}>
              {content}
            </RadioCard>
          )
        })}
      </SimpleGrid>
    </FormControl>
  )
}

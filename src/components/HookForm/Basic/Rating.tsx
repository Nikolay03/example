import { ReactElement } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react'

import { FormFieldProps } from '~/types/components'
import RatingStar from '~/components/RatingStar'

export default function Rating (props: FormFieldProps): ReactElement {
  const { name, label, isRequired } = props

  const { control } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue: 0
  })

  const { value, onChange } = field

  return (
    <FormControl id={name} isRequired={isRequired}>
      {label && <FormLabel mb={4}>{label}</FormLabel>}

      <Flex align={'center'} justify={'space-between'}>
        <RatingStar
          value={value}
          onChange={onChange}
          size={9}
          spacing={2}
        />

        {!!value && (
          <Box fontSize={'2xl'}>
            {Number(value).toFixed(1)}
          </Box>
        )}
      </Flex>
    </FormControl>
  )
}

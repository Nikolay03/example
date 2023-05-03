import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Range, getTrackBackground } from 'react-range'
import { useController, useFormContext } from 'react-hook-form'
import { Box, Center, Circle, Flex, Stack, useTheme } from '@chakra-ui/react'

import { useBigNumberFormat } from '~/utils/number'
import useInputSizes from '~/components/CustomSelect/useInputSizes'
import FormControl from '~/components/HookForm/FormControl'

const renderThumb = ({ props }) => (
  <Circle bgColor={'primary.500'} size={'10px'} {...props} />
)

interface Props {
  name: string
  min: number
  max: number,
  label?: string
  size?: string
  valueSuffix?: string
}

export default function RangeSlider (props: Props): ReactElement {
  const { name, size = 'md', label, valueSuffix } = props

  const { colors, radii } = useTheme()

  const { bigNumberFormat } = useBigNumberFormat()

  const inputSizes = useInputSizes()

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: [0, 0]
  })

  const borderRadius = prop(path<string>([size, 'borderRadius'], inputSizes), radii)

  const [minValue, maxValue] = field.value

  const limit = 10000000 // 10 mln
  const max = props.max > limit ? limit : props.max
  const step = max / 1000

  return (
    <FormControl
      id={name}
      label={label}
      error={fieldState.error}
      isInvalid={fieldState.invalid}>
      <Center
        bgColor={'white'}
        borderRadius={borderRadius}
        h={'48px'}
        px={3}
        py={2}>
        <Stack w={'full'}>
          <Flex
            align={'center'}
            color={'primary.500'}
            justify={'space-between'}
            fontSize={'sm'}>
            <span>{bigNumberFormat(minValue)} {valueSuffix}</span>
            <span>{bigNumberFormat(maxValue)} {valueSuffix}</span>
          </Flex>
          {/*  @ts-ignore */}
          <Range
            step={step}
            min={props.min}
            max={max}
            values={field.value}
            onChange={field.onChange}
            renderTrack={({ props: trackProps, children }) => (
              <Flex
                px={'5px'}
                w={'full'}
                onMouseDown={trackProps.onMouseDown}
                onTouchStart={trackProps.onTouchStart}>
                <Box
                  ref={trackProps.ref}
                  bg={getTrackBackground({
                    values: field.value,
                    min: props.min,
                    max,
                    colors: [colors.gray[200], colors.primary[500], colors.gray[200]]
                  })}
                  borderRadius={'2px'}
                  h={'2px'}
                  w={'full'}>
                  {children}
                </Box>
              </Flex>
            )}
            renderThumb={renderThumb}
          />
        </Stack>
      </Center>
    </FormControl>
  )
}

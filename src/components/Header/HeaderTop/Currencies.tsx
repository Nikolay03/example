import { ReactElement, ReactNode } from 'react'
import { pipe, prop } from 'ramda'
import { ArrowUpRight, ArrowDownRight } from 'react-feather'
import { Box, Circle, HStack, Flex, Text, Skeleton, useToken } from '@chakra-ui/react'

import hexToRgba from '~/utils/hexToRgba'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useETPData } from '~/components/Utils/Contexts'

interface CurrencyProps {
  name: string
  change: 'up' | 'down'
  children: ReactNode
}

function Currency (props: CurrencyProps): ReactElement {
  const { name, change, children } = props

  const { t } = useTranslate()

  const [green, red] = useToken('colors', [
    'palette.common.green',
    'palette.common.red'
  ])

  const lightGreen = hexToRgba(green, '0.15')
  const lightRed = hexToRgba(red, '0.15')

  const circleProps = {
    ml: { base: 2, lg: 3 },
    size: 4
  }
  const currencyLabel = `${name} ${t('header_currency_bank')} `

  return (
    <Flex align={'center'}>
      <Text fontSize={'sm'} fontWeight={'semibold'}>
        <Box as={'span'} color={'gray.500'}>
          {currencyLabel}
        </Box>
        <Box as={'span'}>{children}</Box>
      </Text>
      {change === 'up' && (
        <Circle bgColor={lightGreen} color={green} {...circleProps}>
          <ArrowUpRight size={12} />
        </Circle>
      )}
      {change === 'down' && (
        <Circle bgColor={lightRed} color={red} {...circleProps}>
          <ArrowDownRight size={12} />
        </Circle>
      )}
    </Flex>
  )
}

export default function Currencies (): ReactElement {
  const { currencyData } = useETPData()

  const data = prop('data', currencyData)
  const isLoading = prop('isLoading', currencyData)

  return (
    <HStack
      as={Skeleton}
      display={{ base: 'none', md: 'flex' }}
      isLoaded={!isLoading}
      startColor={'gray.700'}
      endColor={'gray.900'}
      minH={'20px'}
      minW={'300px'}
      spacing={{ base: 3, lg: 6 }}>
      {data.map(currency => {
        const id = prop('id', currency)
        const ccy = prop('ccy', currency)
        const rate = prop('rate', currency)
        const diff = pipe(prop('diff'), Number)(currency)
        const change = diff > 0 ? 'up' : 'down'

        return (
          <Currency key={id} name={ccy} change={change}>
            {numberFormat(rate, null, {
              minimumFractionDigits: 2
            })}
          </Currency>
        )
      })}
    </HStack>
  )
}

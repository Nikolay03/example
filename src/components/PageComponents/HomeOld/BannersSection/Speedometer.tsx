import { ReactElement } from 'react'
import { includes, split } from 'ramda'
import AnimatedNumber from 'animated-number-react'
import styled from '@emotion/styled'
import { Box, Stack, useToken } from '@chakra-ui/react'
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  Inject,
  PointersDirective,
  PointerDirective,
  Gradient,
  RangesDirective,
  RangeDirective
} from '@syncfusion/ej2-react-circulargauge'

import { toNumber, useBigNumberFormat } from '~/utils/number'

const GaugeWrapper = styled(Box)`
  height: 250px;
  margin: 0 -25px;
  overflow: hidden;
  position: relative;
  & #gauge_CircularGaugeBorder {
    fill: none;
  }
  & svg {
    margin: auto;
  }
`

interface Props {
  value: number
  label: string
}

export default function Speedometer (props: Props): ReactElement {
  const { value, label } = props

  const colors = ['palette.common.darkGray', 'primary.500']
  const [darkGray, primary500] = useToken('colors', colors)

  const { bigNumberFormat } = useBigNumberFormat()

  const bigNumberFormatValue = bigNumberFormat(value)
  const [formattedValue, numberAbbr] = split(' ', bigNumberFormatValue)
  const numberValue = toNumber(formattedValue)
  const isFloatNumber = includes('.', formattedValue)

  const minValue = 0
  const maxValue = Math.ceil((numberValue + 100) / 100) * 100
  const maxMajorTicks = 10
  const maxMinorTicks = 50

  const ticksColor = '#f7941e'

  const rangeLinearGradient = {
    startValue: '0%',
    endValue: '50%',
    colorStop: [
      { color: primary500, offset: '0%', opacity: 0.9 },
      { color: darkGray, offset: '100%', opacity: 0.9 }
    ]
  }

  const axisCommonProps = {
    startAngle: 270,
    endAngle: 90,
    minimum: minValue,
    maximum: maxValue,
    lineStyle: { width: 0 }
  }

  const rangeCommonProps = {
    start: minValue,
    end: maxValue,
    linearGradient: rangeLinearGradient
  }

  const majorTicksInterval = maxValue / maxMajorTicks
  const minorTicksInterval = maxValue / maxMinorTicks
  const animationDuration = 500

  const formatValue = (val: number): string => Number(val).toFixed(isFloatNumber ? 2 : 0)

  return (
    <GaugeWrapper>
      <Stack
        lineHeight={1}
        pos={'absolute'}
        spacing={1}
        textAlign={'center'}
        bottom={{ base: 1, sm: 0 }}
        left={'50%'}
        transform={'translate(-50%, -100%)'}>
        <Box fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={'bold'}>
          <AnimatedNumber
            value={numberValue}
            formatValue={formatValue}
            duration={animationDuration}
          />
          {numberAbbr}
        </Box>
        <Box fontWeight={'semibold'}>{label}</Box>
      </Stack>

      <CircularGaugeComponent id={'gauge'}>
        <Inject services={[Gradient]} />
        <AxesDirective>
          {/* outer axis */}
          <AxisDirective
            {...axisCommonProps}
            radius={'130%'}
            majorTicks={{ width: 0 }}
            minorTicks={{ width: 0 }}
            labelStyle={{ font: { size: '0' } }}>
            <PointersDirective>
              <PointerDirective
                radius={'100%'}
                color={'transparent'}
                pointerWidth={0}
                cap={{ radius: 0, border: null }}
                needleStartWidth={0}
                animation={{ enable: false }}>
              </PointerDirective>
            </PointersDirective>
            <RangesDirective>
              <RangeDirective
                {...rangeCommonProps}
                startWidth={6}
                endWidth={6}
                roundedCornerRadius={2}
              />
            </RangesDirective>
          </AxisDirective>

          {/* inner axis */}
          <AxisDirective
            {...axisCommonProps}
            radius={'80%'}
            majorTicks={{
              color: ticksColor,
              interval: majorTicksInterval,
              height: 15,
              position: 'Outside',
              offset: 4,
              width: 1
            }}
            minorTicks={{
              color: ticksColor,
              height: 5,
              position: 'Outside',
              offset: 4,
              interval: minorTicksInterval,
              width: 1
            }}
            labelStyle={{
              font: {
                size: '11px',
                fontFamily: 'Gilroy',
                fontWeight: 'bold'
              },
              position: 'Outside',
              offset: 0
            }}>
            <PointersDirective>
              <PointerDirective
                value={numberValue}
                radius={'115%'}
                color={primary500}
                pointerWidth={15}
                cap={{
                  radius: 12,
                  border: { color: primary500, width: 3 },
                  color: 'white'
                }}
                needleTail={{ length: '0%' }}
                needleStartWidth={2}
                animation={{ enable: true, duration: animationDuration }}>
              </PointerDirective>
            </PointersDirective>
            <RangesDirective>
              <RangeDirective
                {...rangeCommonProps}
                startWidth={10}
                endWidth={10}
                roundedCornerRadius={4}
              />
            </RangesDirective>
          </AxisDirective>
        </AxesDirective>
      </CircularGaugeComponent>
    </GaugeWrapper>
  )
}

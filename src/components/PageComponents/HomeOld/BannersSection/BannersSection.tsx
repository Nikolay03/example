import { ReactElement } from 'react'
import { Box, Button, Grid, Text, TextProps, useToken } from '@chakra-ui/react'

import useSpeedometer from './useSpeedometer'
import Card from './Card'
import Speedometer from './Speedometer'

import { ABOUT_URL } from '~/constants/routes'
import hexToRgba from '~/utils/hexToRgba'
import { useTranslate } from '~/utils/translate'
import Link from '~/components/Link'

const Description = (props: TextProps): ReactElement => (
  <Text
    color={'gray.500'}
    fontSize={{ base: 'md', md: 'lg' }}
    fontWeight={'semibold'}
    mt={4}
    mb={6}
    {...props}
  />
)

export default function BannersSection (): ReactElement {
  const { t } = useTranslate()

  const {
    data,
    title,
    recordLabel,
    recordValueLabel,
    speedometerLabel
  } = useSpeedometer()

  const [primary500, orange] = useToken('colors', ['primary.500', 'palette.common.orange'])

  const leftCardBgColor = hexToRgba(orange, '0.08')
  const rightCardBgColor = hexToRgba(primary500, '0.06')

  return (
    <Grid
      as={'section'}
      gap={6}
      templateColumns={{
        base: '100%',
        lg: '1fr minmax(450px, 35%)'
      }}>
      <Card isMain={true} title={t('home_banner_left_title')} bgColor={leftCardBgColor}>
        <Description>
          {t('home_banner_left_description')}
        </Description>
        <Button as={Link} href={ABOUT_URL} size={'lg'}>
          {t('button_learn_more')}
        </Button>
      </Card>

      <Card title={title} bgColor={rightCardBgColor}>
        <Description>
          {recordLabel}
          <Box as={'span'} color={'primary.500'}>
            {recordValueLabel}
          </Box>
        </Description>
        <Speedometer value={data.value} label={speedometerLabel} />
      </Card>
    </Grid>
  )
}

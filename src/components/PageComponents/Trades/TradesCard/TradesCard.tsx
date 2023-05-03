import { ReactElement } from 'react'
import { prop } from 'ramda'
import { ChevronRight } from 'react-feather'
import { Box, Button, Stack } from '@chakra-ui/react'

import TradesStatus from '../TradesStatus'

import { TRADES_URL } from '~/constants/routes'
import { TRADES_KIND } from '~/constants/constants'
import { TTradesTable } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { numberFormat } from '~/utils/number'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { DetailValue } from '~/components/Misc'
import Link from '~/components/Link'

interface Props {
  data: TTradesTable
}

export default function TradesCard (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  const id = prop('id', data)
  const product = translateData(prop('commodityGroupClassifier', data), 'name')
  const volume = prop('volume', data)
  const measurement = translateData(prop('measurement', data), 'name')
  const amount = numberFormat(volume, measurement)
  const organizer = prop('organizer', data)
  const rating = prop('rating', data)
  const kind = prop('kind', data)
  const kindName = t(TRADES_KIND.object[kind])
  const deliveryDistrict = prop('deliveryDistrict', data)
  const deliveryRegion = translateData(prop('region', deliveryDistrict), 'name')
  const bargainEndDatetime = dateFormat(
    prop('bargainEndDatetime', data),
    DATE_FORMATS.DATETIME_FORMAT_DEFAULT
  )
  const status = prop('status', data)
  const detailUrl = `${TRADES_URL}/${id}`

  return (
    <Box bgColor={'gray.100'} borderRadius={'xl'} p={8}>
      <Box fontSize={'xl'} fontWeight={'semibold'} noOfLines={2} mb={4}>
        {product}
      </Box>

      <Stack mb={6} spacing={3}>
        <DetailValue
          label={t('trades_table_th_volume')}
          value={amount}
        />
        <DetailValue
          label={t('trades_table_th_region')}
          value={deliveryRegion}
        />
        <DetailValue
          label={t('trades_table_th_organizer')}
          value={organizer}
        />
        <DetailValue
          label={t('trades_table_th_rating')}
          value={rating}
        />
        <DetailValue
          label={t('trades_table_th_trade_kind')}
          value={kindName}
        />
        <DetailValue
          label={t('trades_table_th_end_date')}
          value={bargainEndDatetime}
        />
        <DetailValue
          label={t('trades_table_th_status')}
          value={<TradesStatus status={status} />}
        />
      </Stack>

      <Button as={Link} rightIcon={<ChevronRight />} href={detailUrl} variant={'link'}>
        {t('button_more_details')}
      </Button>
    </Box>
  )
}

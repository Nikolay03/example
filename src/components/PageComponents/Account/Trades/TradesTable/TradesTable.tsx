import { Fragment, ReactElement } from 'react'
import { isEmpty, prop } from 'ramda'
import { useRouter } from 'next/router'
import { sprintf } from 'sprintf-js'
import { Edit, Trash2 } from 'react-feather'
import { Icon, IconButton, Stack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import { TradesTabs } from '../tradesTabs'
import { useTradesList } from '../TradesListProvider'

import { TRADE_DELETE } from '~/constants/api'
import { TRADES_KIND } from '~/constants/constants'
import { TRADES_URL, ACCOUNT_TRADES_UPDATE_URL } from '~/constants/routes'
import { TradeStatuses } from '~/types/enums'
import { TAccountTrades } from '~/types/trades'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { useRemove } from '~/hooks/crud'
import { TradesStatus } from '~/components/PageComponents/Trades'
import { PrimaryLink } from '~/components/Link'
import { TableEmptyData, TableSortingLabel } from '~/components/Table'

interface Props {
  results: TAccountTrades[]
}

export default function TradesTable (props: Props): ReactElement {
  const { results } = props

  const router = useRouter()

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  const { remove } = useRemove()

  const { fetchTrades } = useTradesList()

  const isDraft = prop('tab', router.query) === TradesTabs.TAB_DRAFT

  return (
    <Fragment>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <TableSortingLabel
                name={'id'}
                label={t('trades_table_th_id')}
              />
            </Th>
            <Th>
              <TableSortingLabel
                name={'kind'}
                label={t('trades_table_th_trade_kind')}
              />
            </Th>
            <Th>
              <TableSortingLabel
                name={'commodity_group_classifier'}
                label={t('trades_table_th_product')}
              />
            </Th>
            <Th>
              <TableSortingLabel
                name={'volume'}
                label={t('trades_table_th_volume')}
              />
            </Th>
            <Th>
              <TableSortingLabel
                name={'bargain_end_datetime'}
                label={t('trades_table_th_end_date')}
              />
            </Th>
            <Th>
              <TableSortingLabel
                name={'status'}
                label={t('trades_table_th_status')}
              />
            </Th>
            {isDraft && (
              <Th />
            )}
          </Tr>
        </Thead>
        <Tbody>
          {results.map(item => {
            const id = prop('id', item)
            const kind = prop('kind', item)
            const kindName = t(TRADES_KIND.object[kind])
            const commodityGroupClassifier = prop('commodityGroupClassifier', item)
            const product = translateData(commodityGroupClassifier, 'name')
            const volume = prop('volume', item)
            const measurement = translateData(prop('measurement', item), 'name')
            const volumeAmount = volume ? numberFormat(volume, measurement) : null
            const bargainEndDatetime = dateFormat(prop('bargainEndDatetime', item), DATE_FORMATS.DATETIME_FORMAT_SHORT)
            const status = isDraft ? TradeStatuses.DRAFT : prop('status', item)
            const detailUrl = `${TRADES_URL}/${id}`

            const onUpdateTrades = () => {
              return router.push(sprintf(ACCOUNT_TRADES_UPDATE_URL, id))
            }

            const onDeleteTrades = () => {
              return remove(sprintf(TRADE_DELETE, id))
                .then(() => fetchTrades())
            }

            return (
              <Tr key={id}>
                <Td>
                  {isDraft
                    ? id
                    : (
                      <PrimaryLink href={detailUrl}>
                        {id}
                      </PrimaryLink>
                    )}
                </Td>
                <Td>{kindName}</Td>
                <Td>{product}</Td>
                <Td>{volumeAmount}</Td>
                <Td>{bargainEndDatetime}</Td>
                <Td>
                  <TradesStatus status={status} />
                </Td>
                {isDraft && (
                  <Td isNumeric={true}>
                    <Stack direction={'row'}>
                      <IconButton
                        aria-label={'Edit trades'}
                        icon={<Icon as={Edit} />}
                        size={'xs'}
                        onClick={onUpdateTrades}
                      />
                      <IconButton
                        aria-label={'Delete trades'}
                        colorScheme={'red'}
                        icon={<Icon as={Trash2} />}
                        size={'xs'}
                        onClick={onDeleteTrades}
                      />
                    </Stack>
                  </Td>
                )}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {isEmpty(results) && (
        <TableEmptyData />
      )}
    </Fragment>
  )
}

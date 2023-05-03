import { ReactElement, MouseEvent } from 'react'
import { equals, isEmpty, path, prop } from 'ramda'
import { useRouter } from 'next/router'
import { Button, Stack, Table, Tbody, Td, Tr } from '@chakra-ui/react'

import tableHeaderData from './tableHeaderData'
import TradesTableSimpleHead from './TradesTableSimpleHead'
import TradesTableSortingHead from './TradesTableSortingHead'
import TradesStatus from './TradesStatus'

import { TRADES_URL } from '~/constants/routes'
import { TRADES_KIND } from '~/constants/constants'
import { TradeStatuses } from '~/types/enums'
import { TTradesTable } from '~/types/trades'
import { getCommodityProductName } from '~/utils/get'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { TableContainer, TableOverflow, TableEmptyData } from '~/components/Table'
import { TableSkeleton } from '~/components/Skeletons'
import Link from '~/components/Link'

interface Props {
  results: TTradesTable[]
  isLoading?: boolean
  withSorting?: boolean
}

export default function TradesTable (props: Props): ReactElement {
  const { results, isLoading, withSorting = true } = props

  const router = useRouter()

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  if (isLoading) {
    return (
      <TableContainer>
        <TableSkeleton
          rowCount={6}
          columnCount={10}
        />
      </TableContainer>
    )
  }

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation()

  return (
    <TableContainer>
      <TableOverflow isClickable={true}>
        <Table>
          {withSorting && <TradesTableSortingHead />}
          {!withSorting && <TradesTableSimpleHead />}
          <Tbody>
            {results.map(item => {
              const id = prop('id', item)
              const kind = prop('kind', item)
              const kindName = t(TRADES_KIND.object[kind])
              const organizer = prop('organizer', item)
              const isOrganizer = prop('isOrganizer', item)
              const rating = prop('rating', item)
              const product = translateData(prop('commodityGroupClassifier', item), 'name')
              const parentProduct = translateData(path(['commodityGroupClassifier', 'parent'], item), 'name')
              const formedProduct = getCommodityProductName(product, parentProduct)
              const volume = prop('volume', item)
              const measurement = translateData(prop('measurement', item), 'name')
              const amount = numberFormat(volume, measurement)
              const deliveryDistrict = prop('deliveryDistrict', item)
              const deliveryRegion = translateData(prop('region', deliveryDistrict), 'name')
              const bargainEndDatetime = dateFormat(
                prop('bargainEndDatetime', item),
                DATE_FORMATS.DATETIME_FORMAT_DEFAULT
              )
              const status = prop('status', item)
              const isActive = equals(TradeStatuses.ACTIVE, status)

              const detailUrl = `${TRADES_URL}/${id}`

              const values = {
                id: id,
                commodity_group_classifier: formedProduct,
                volume: amount,
                delivery_region: deliveryRegion,
                user__last_name: organizer,
                user__rating: rating,
                kind: kindName,
                bargain_end_datetime: bargainEndDatetime,
                status: (
                  <Stack direction={'row'} justify={'flex-end'} onClick={stopPropagation}>
                    <TradesStatus status={status} />
                    {isActive && (
                      <Button as={Link} href={detailUrl} size={'xs'}>
                        {isOrganizer
                          ? t('trades_table_view_button')
                          : t('trades_table_participate_button')
                        }
                      </Button>
                    )}
                  </Stack>
                )
              }

              return (
                <Tr
                  key={id}
                  _hover={{ color: 'primary.500' }}
                  onClick={() => router.push(detailUrl)}>
                  {tableHeaderData.map(item => {
                    return (
                      <Td key={item.name} isNumeric={item.isNumeric}>
                        {values[item.name]}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>

        {isEmpty(results) && (
          <TableEmptyData />
        )}
      </TableOverflow>
    </TableContainer>
  )
}

import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Stack, Table, Tbody, Td, Th, Thead, Tr, Tooltip } from '@chakra-ui/react'

import ReputationLegend from './ReputationLegend'

import { CURRENCY_UZB } from '~/constants/constants'
import { TUserReputation } from '~/types/reputations'
import { innNumberParse } from '~/utils/fieldParsers'
import { getUserReputation } from '~/utils/get'
import { numberFormat, useBigNumberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { TableContainer, TableOverflow } from '~/components/Table'
import { TableActions } from '~/components/Table/TableActions'
import { TableSearch } from '~/components/Search'
import RatingStar from '~/components/RatingStar'
import { PrimaryLink } from '~/components/Link'
import { USER_DETAIL_URL } from '~/constants/routes'
import { TableSkeleton } from '~/components/Skeletons'

interface Props {
  data: {
    results: TUserReputation[]
    isLoading?: boolean
  }
  onSearch: (search) => void
}

export default function ReputationTable (props: Props): ReactElement {
  const { data, onSearch } = props

  const { t, translateData } = useTranslate()

  const { bigNumberFormat } = useBigNumberFormat()

  const { results, isLoading } = data

  const tableActions = (
    <TableActions>
      <TableSearch
        placeholder={t('rating_table_search_placeholder')}
        onSearch={onSearch}
      />
    </TableActions>
  )

  if (isLoading) {
    return (
      <TableContainer>
        {tableActions}

        <TableSkeleton
          rowCount={7}
          columnCount={10}
        />
      </TableContainer>
    )
  }

  return (
    <Stack spacing={6}>
      <TableContainer>
        {tableActions}

        <TableOverflow>
          <Table>
            <Thead>
              <Tr>
                <Th>{t('rating_table_th_tin')}</Th>
                <Th>{t('rating_table_th_company')}</Th>
                <Th>{t('rating_table_th_region')}</Th>
                <Th>{t('rating_table_th_volume')}</Th>
                <Th>{t('rating_table_th_reputation')}</Th>
                <Th>{t('rating_table_th_rating')}</Th>
                <Th>{t('rating_table_th_tax_committee')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map(item => {
                const id = prop('id', item)
                const inn = innNumberParse(prop('inn', item))
                const name = prop('name', item)
                const region = prop('region', item)
                const regionName = translateData(region, 'name')
                const volumePrice = Math.abs(prop('volumePrice', item))
                const volumeQuantity = prop('volumeQuantity', item)
                const volumePriceFormatted = bigNumberFormat(volumePrice)
                const volumeQuantityFormatted = numberFormat(volumeQuantity)
                const volume = `${volumePriceFormatted} / ${volumeQuantityFormatted}`
                const volumeTooltip = numberFormat(volumePrice, CURRENCY_UZB)
                const rating = getUserReputation(item)
                const reviewRating = prop('reviewRating', item)
                const reason = prop('reason', item)

                const userDetailUrl = sprintf(USER_DETAIL_URL, id)

                return (
                  <Tr key={id}>
                    <Td minW={28}>{inn}</Td>
                    <Td>
                      <PrimaryLink href={userDetailUrl}>
                        {name}
                      </PrimaryLink>
                    </Td>
                    <Td>{regionName}</Td>
                    <Td>
                      <Tooltip
                        isDisabled={!volumePrice}
                        label={volumeTooltip}
                        placement={'top'}>
                        {volume}
                      </Tooltip>
                    </Td>
                    <Td>{rating}</Td>
                    <Td>
                      <RatingStar
                        isReadOnly={true}
                        size={3}
                        value={reviewRating}
                      />
                    </Td>
                    <Td>{reason}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableOverflow>
      </TableContainer>

      <ReputationLegend />
    </Stack>
  )
}

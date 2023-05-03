import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import { TRADE_PUBLIC_LIST } from '~/constants/api'
import { TradeStatuses } from '~/types/enums'
import { TTradesTable } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import { useRouterQuery } from '~/hooks/url'
import { SubTitle, TabTitle, TabTitleWrap, useTabTitle } from '~/components/Titles'
import { TradesContainer } from '~/components/PageComponents/Trades'
import Pagination from '~/components/Pagination'

const tradesStatusList = [
  { value: TradeStatuses.ACTIVE, title: 'trades_table_filter_active' },
  { value: TradeStatuses.CLOSED, title: 'trades_table_filter_closed' }
]

export default function ShowcaseUserTrades (): ReactElement {
  const { t } = useTranslate()

  const { routerQuery: { slug } } = useRouterQuery()

  const { tab, onChangeTab } = useTabTitle<TradeStatuses>({
    initialTab: TradeStatuses.ACTIVE,
    queryKey: 'status',
    withQuery: true
  })

  const { results, isLoading, count } = useRequest<TTradesTable>(TRADE_PUBLIC_LIST, {
    params: { status: tab, user: slug }
  })

  return (
    <Stack spacing={6}>
      <TabTitleWrap>
        <SubTitle mb={'unset'}>
          {t('showcase_users_trades')}
        </SubTitle>

        <TabTitle
          tabs={tradesStatusList}
          value={tab}
          onChange={onChangeTab}
          size={'sm'}
        />
      </TabTitleWrap>

      <TradesContainer
        results={results}
        isLoading={isLoading}
      />

      <Pagination totalRecords={count} />
    </Stack>
  )
}

import { ReactElement } from 'react'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import { Container } from '@chakra-ui/react'

import { TRADE_PARTICIPANTS_LIST } from '~/constants/api'
import { ROOT_URL, TRADES_DETAIL_URL, TRADES_URL } from '~/constants/routes'
import { TTradesParticipantWinner } from '~/types/trades'
import { TStateListData } from '~/types/state'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent
} from '~/components/Breadcumb'
import { SubTitle } from '~/components/Titles'
import { TradeWinnerTable } from '~/components/PageComponents/Trades/TradeWinner'
import Pagination from '~/components/Pagination'

export interface TradeWinnerProps {
  data: TStateListData<TTradesParticipantWinner>
}

export default function TradeWinner (props: TradeWinnerProps): ReactElement {
  const { data } = props

  const { query: { slug } } = useRouter()

  const { t } = useTranslate()

  const { results, isLoading, count, refetch } = useRequest<TTradesParticipantWinner>(TRADE_PARTICIPANTS_LIST, {
    initialData: data,
    params: { bargain: slug }
  })

  return (
    <PageWrapper title={t('trades_choose_winner_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={TRADES_URL}>
              {t('trades_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={sprintf(TRADES_DETAIL_URL, slug)}>
              {t('trades_detail_id', { id: slug })}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('trades_choose_winner_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <Container maxW={'container.sm'} textAlign={'center'}>
          <SubTitle>
            {t('trades_choose_winner_page_title')}
          </SubTitle>
        </Container>

        <TradeWinnerTable
          bargain={slug}
          results={results}
          isLoading={isLoading}
          refetch={refetch}
        />

        <Pagination totalRecords={count} />
      </PageLayout>
    </PageWrapper>
  )
}

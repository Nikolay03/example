import { ReactElement } from 'react'
import { Plus } from 'react-feather'
import { Flex, Icon } from '@chakra-ui/react'

import { ROOT_URL, ACCOUNT_TRADES_CREATE_URL } from '~/constants/routes'
import { TStateListData } from '~/types/state'
import { TTradesTable } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import useAccreditation from '~/hooks/useAccreditation'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent
} from '~/components/Breadcumb'
import { PageTitle } from '~/components/Titles'
import { SearchForm } from '~/components/PageForms'
import { TradesContainer } from '~/components/PageComponents/Trades'
import Pagination from '~/components/Pagination'
import { PrimaryLink } from '~/components/Link'

export interface TradesProps {
  api: string
  tradeData: TStateListData<TTradesTable>
}

export default function Trades (props: TradesProps): ReactElement {
  const { api, tradeData } = props

  const { t } = useTranslate()

  const { userCanTrade } = useAccreditation()

  const { results, count, isLoading } = useRequest<TTradesTable>(api, {
    initialData: tradeData
  })

  return (
    <PageWrapper title={t('trades_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('trades_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <SearchForm />

        <Flex align={'center'} justify={'space-between'} my={10}>
          <PageTitle maxW={null} mx={null} mb={null} textAlign={null}>
            {t('trades_page_title')}
          </PageTitle>

          {userCanTrade && (
            <PrimaryLink
              alignItems={'center'}
              display={'inline-flex'}
              fontSize={'lg'}
              href={ACCOUNT_TRADES_CREATE_URL}>
              <Icon as={Plus} boxSize={5} mr={1} />

              {t('trades_create_button')}
            </PrimaryLink>
          )}
        </Flex>

        <TradesContainer
          results={results}
          isLoading={isLoading}
        />

        <Pagination totalRecords={count} />
      </PageLayout>
    </PageWrapper>
  )
}

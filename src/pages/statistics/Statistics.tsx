import { ReactElement } from 'react'
import { Flex } from '@chakra-ui/react'

import StatisticsGrid from '~/components/PageComponents/Statistics/StatisticsGrid'
import { ROOT_URL } from '~/constants/routes'
import { TStateListData } from '~/types/state'
import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent
} from '~/components/Breadcumb'
import { PageHeading } from '~/components/Titles'
import { TProductGroupAttributeNameTrade } from '~/types/products'

export interface StatisticsProps {
  statisticsExportProductsData: TStateListData<TProductGroupAttributeNameTrade>
}

export default function Statistics (props: StatisticsProps): ReactElement {
  const { statisticsExportProductsData } = props

  const { t } = useTranslate()

  return (
    <PageWrapper title={t('statistics_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('statistics_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex
          align={'center'}
          gridRowGap={4}
          justify={'space-between'}
          mb={{ base: 6, md: 16 }}
          wrap={'wrap'}>
          <PageHeading>
            {t('statistics_page_title')}
          </PageHeading>
        </Flex>
        <StatisticsGrid />
      </PageLayout>
    </PageWrapper>
  )
}

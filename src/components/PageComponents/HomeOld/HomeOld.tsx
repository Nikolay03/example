import { ReactElement } from 'react'

import HomeProvider, { HomePageProps } from './HomeProvider'
import FilterSection from './FilterSection'
import StatsSection from './StatsSection'
import PopularSection from './PopularSection'
import TradesSection from './TradesSection'
import ReportsSection from './ReportsSection'
import ReputationSection from './ReputationSection'
import NewsSection from './NewsSection'
import AboutSection from './AboutSection'

import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { BaseLayout } from '~/components/Layouts'
import StatisticsSection from '~/components/PageComponents/HomeOld/StatisticsSection'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'

export default function HomeOld (props: HomePageProps): ReactElement {
  const { t } = useTranslate()

  return (
    <HomeProvider {...props}>
      <PageWrapper title={t('home_page_title')}>
        <BaseLayout>
          <FilterSection />
          <StatsSection />
          <PopularSection />
          <TradesSection />
          <ReputationSection />
          <StatisticsSection >
            <SectionTitleWrap>
              <SectionTitle mb={{ base: 4, md: 'unset' }}>
                {t('home_section_statistics_title')}
              </SectionTitle>
            </SectionTitleWrap>
          </StatisticsSection>
          <ReportsSection />
          <NewsSection />
          <AboutSection />
        </BaseLayout>
      </PageWrapper>
    </HomeProvider>
  )
}

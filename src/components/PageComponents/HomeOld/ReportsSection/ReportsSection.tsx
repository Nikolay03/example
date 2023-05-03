import { ReactElement } from 'react'

import HomeSection from '../HomeSection'

import ReportsList from './ReportsList'
import ReportBanner from './ReportBanner'

import { ReportCategories } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import Container from '~/components/Container'
import { REPORT_TABS, useReportsList } from '~/components/PageComponents/Reports'
import { SectionTitle, SectionTitleWrap, TabTitle } from '~/components/Titles'

export default function ReportsSection (): ReactElement {
  const { t } = useTranslate()

  const pageSize = 7

  const {
    results,
    count,
    isLoading,
    category,
    onChangeTab
  } = useReportsList({
    params: { category: ReportCategories.ANALYTICAL },
    staticParams: { pageSize }
  })

  return (
    <HomeSection>
      <Container>
        <SectionTitleWrap
          align={{ base: 'unset', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}>
          <SectionTitle mb={{ base: 4, md: 'unset' }}>
            {t('home_section_reports_title')}
          </SectionTitle>

          <TabTitle
            tabs={REPORT_TABS}
            value={category}
            onChange={onChangeTab}
          />
        </SectionTitleWrap>

        <ReportsList
          list={results}
          count={count}
          isLoading={isLoading}
          pageSize={pageSize}
        />

        <ReportBanner />
      </Container>
    </HomeSection>
  )
}

import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

import HomeProvider, { HomePageProps } from './HomeProvider'
import DayStatisticsSection from './DayStatisticsSection/DayStatisticsSection'
import NewsSection from './NewsSection'
import ReputationSection from './ReputationSection'

import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { BaseLayout } from '~/components/Layouts'
import ProductsCarouselSection from '~/components/PageComponents/Home/ProductsCarouselSection'
import { ProductsSection } from '~/components/PageComponents/Home/ProductsSection'
import AboutSection from '~/components/PageComponents/Home/AboutSection'
import StatisticsSection from '~/components/PageComponents/HomeOld/StatisticsSection'
import { PageTitle } from '~/components/Titles'

export default function Home (props: HomePageProps): ReactElement {
  const { t } = useTranslate()

  return (
    <HomeProvider {...props}>
      <PageWrapper title={t('home_page_title')}>
        <BaseLayout themeType={'azure'}>
          <Box maxWidth={'100vw'} overflow={'hidden'} as={'section'}>
            <ProductsCarouselSection />
          </Box>
          <ProductsSection />
          <DayStatisticsSection />
          <NewsSection />
          <ReputationSection />
          <AboutSection />
        </BaseLayout>
      </PageWrapper>
    </HomeProvider>
  )
}

import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Button, Center, Link, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import HomeSection from '../HomeSection'
import { STATISTICS_CATEGORY_TWO } from '../../Statistics/StatisticsFilter'

import { useTranslate } from '~/utils/translate'
import Container from '~/components/Container'
import { PageTitle } from '~/components/Titles'
import { DayStatisticsCard, DayStatisticsGrid } from '~/components/PageComponents/Home/DayStatisticsSection'
import { useDetailRequest } from '~/hooks/api'
import { TTradeStats } from '~/types/trades'
import { TRADE_STATS } from '~/constants/api'
import { useBigNumberFormat } from '~/utils/number'
import Build from '~/icons/stistics/Build'
import Clock from '~/icons/stistics/Clock'
import Operator from '~/icons/stistics/Operator'
import LineStat from '~/icons/stistics/LineStat'
import useMediaBreakpoint from '~/hooks/useMediaBreakpoint'
import * as ROUTES from '~/constants/routes'
import * as ENUMS from '~/types/enums'

export default function DayStatisticsSection (): ReactElement {
  const { t } = useTranslate()
  const router = useRouter()

  function onRedirect () {
    router.push({
      pathname: ROUTES.STATISTICS_PAGE_URL,
      query: {
        category: ENUMS.StatisticsCategoryTypes.EXPORT, [STATISTICS_CATEGORY_TWO]: ENUMS.StatisticsCompareTypes.PRODUCTS
      }
    })
  }

  const isLargerThanMd = useMediaBreakpoint({ breakpoint: 'md' })

  const { data, isLoading } = useDetailRequest<TTradeStats>(TRADE_STATS)

  const { bigNumberFormat } = useBigNumberFormat()

  const dayActiveCompanies = prop('dayActiveCompanies', data) || 0
  const daySalesSpeed = prop('daySalesSpeed', data) || 0
  const dayTradingVolume = prop('dayTradingVolume', data) || 0
  const dayActiveTrades = prop('dayActiveBargains', data) || 0
  if (isLargerThanMd) {
    return (
      <>
        <Box as={'section'} pt={0} pb={{ base: 8, md: 16 }}>
          <Container variant={'azure'}>
            <PageTitle mb={{ base: 10 }}>
              {t('home_section_stats_title')}
            </PageTitle>

            <DayStatisticsGrid isLoading={isLoading}>
              <DayStatisticsCard
                icon={<Build boxSize={12} />}
                label={t('stats_companies_label')}
                value={bigNumberFormat(dayActiveCompanies)}
              />
              <DayStatisticsCard
                icon={<Clock boxSize={12} />}
                label={t('stats_sales_rate_label')}
                value={bigNumberFormat(daySalesSpeed)}
              />
              <DayStatisticsCard
                icon={<LineStat boxSize={12} />}
                label={t('stats_trades_volume_label')}
                value={bigNumberFormat(dayTradingVolume)}
              />
              <DayStatisticsCard
                icon={<Operator boxSize={12} />}
                label={t('stats_daily_trades_label')}
                value={bigNumberFormat(dayActiveTrades)}
              />
            </DayStatisticsGrid>
            <Center>
              <Button
                mt={10}
                borderRadius={'none'}
                borderColor={'primary.500'} color={'primary.500'} variant={'outline'} as={Link}
                onClick={onRedirect}
              >
                {t('button_more_stat')}
              </Button>
            </Center>
          </Container>
        </Box>
      </>
    )
  } return null
}

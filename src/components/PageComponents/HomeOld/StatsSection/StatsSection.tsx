import { ReactElement } from 'react'
import { Box, StackProps } from '@chakra-ui/react'
import { prop } from 'ramda'

import HomeSection from '../HomeSection'

import StatCard from './StatCard'
import StatsGrid from './StatsGrid'

import { TRADE_STATS } from '~/constants/api'
import { TTradeStats } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useBigNumberFormat } from '~/utils/number'
import { useDetailRequest } from '~/hooks/api'
import Container from '~/components/Container'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'

interface StatCardProps extends StackProps {
  label: string
  value: string
}

export const Stat = (props: StatCardProps): ReactElement => (
  <StatCard>
    <Box fontSize={'3xl'} fontWeight={'bold'}>{props.value}</Box>
    <Box fontSize={'lg'} fontWeight={'semibold'}>{props.label}</Box>
  </StatCard>
)

export default function StatsSection (): ReactElement {
  const { t } = useTranslate()

  const { data, isLoading } = useDetailRequest<TTradeStats>(TRADE_STATS)

  const { bigNumberFormat } = useBigNumberFormat()

  const dayActiveCompanies = prop('dayActiveCompanies', data) || 0
  const daySalesSpeed = prop('daySalesSpeed', data) || 0
  const dayTradingVolume = prop('dayTradingVolume', data) || 0
  const dayActiveTrades = prop('dayActiveBargains', data) || 0

  return (
    <HomeSection bgColor={'gray.100'}>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>
            {t('home_section_stats_title')}
          </SectionTitle>
        </SectionTitleWrap>

        <StatsGrid isLoading={isLoading}>
          <Stat
            label={t('stats_companies_label')}
            value={bigNumberFormat(dayActiveCompanies)}
          />
          <Stat
            label={t('stats_sales_rate_label')}
            value={bigNumberFormat(daySalesSpeed)}
          />
          <Stat
            label={t('stats_trades_volume_label')}
            value={bigNumberFormat(dayTradingVolume)}
          />
          <Stat
            label={t('stats_daily_trades_label')}
            value={bigNumberFormat(dayActiveTrades)}
          />
        </StatsGrid>
      </Container>
    </HomeSection>
  )
}

import { SimpleGrid } from '@chakra-ui/react'
import { ReactNode } from 'react'

import HomeSection from '../HomeSection'

import Container from '~/components/Container'
import StatisticsExport from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsExport/StatisticsExport'
import StatisticsTrade from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsTrade/StatisticsTrade'
import useMediaBreakpoint from '~/hooks/useMediaBreakpoint'
import { useTranslate } from '~/utils/translate'

interface Props {
  children: ReactNode
  themeType?: string
}

const StatisticsSection = ({ children, themeType }: Props) => {
  const isAzure = themeType === 'azure'
  const { t } = useTranslate()

  const isLargerThanMd = useMediaBreakpoint({ breakpoint: 'md' })
  if (isLargerThanMd) {
    return (
      <HomeSection>
        <Container variant={isAzure && 'azure'}>
          {children}
          <SimpleGrid spacing={12} columns={{ base: 1, lg: 2 }} id={'1'}>
            {/* TODO delete or fix */}
            {/* @ts-ignore */}
            <StatisticsExport />
            <StatisticsTrade />
          </SimpleGrid>
        </Container>
      </HomeSection>
    )
  } return null
}

export default StatisticsSection

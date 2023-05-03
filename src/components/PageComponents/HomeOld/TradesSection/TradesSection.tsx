import { ReactElement } from 'react'

import HomeSection from '../HomeSection'

import { TRADES_URL } from '~/constants/routes'
import { TTradesTable } from '~/types/trades'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import Container from '~/components/Container'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'
import { MoreButton } from '~/components/Buttons'
import { TradesContainer } from '~/components/PageComponents/Trades'

export default function TradesSection (): ReactElement {
  const { t } = useTranslate()

  const { tradeData } = useHomeData()

  const { results } = getListData<TTradesTable>(tradeData)

  return (
    <HomeSection>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>
            {t('home_section_trades_title')}
          </SectionTitle>
          <MoreButton href={TRADES_URL} />
        </SectionTitleWrap>

        <TradesContainer
          results={results}
          withSorting={false}
        />
      </Container>
    </HomeSection>
  )
}

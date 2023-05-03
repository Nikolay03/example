import { ReactElement } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import PopularCategoryCard from './PopularCategoryCard'

import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import Container from '~/components/Container'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'
import { getListData } from '~/utils/fetch'

export default function PopularSection (): ReactElement {
  const { t } = useTranslate()

  const { popularProductsData } = useHomeData()

  const { results } = getListData(popularProductsData)

  return (
    <HomeSection pb={null}>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>
            {t('home_section_popular_title')}
          </SectionTitle>
        </SectionTitleWrap>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {results.map(item => (
            <PopularCategoryCard key={item.id} data={item} />
          ))}
        </SimpleGrid>
      </Container>
    </HomeSection>
  )
}

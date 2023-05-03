import { ReactElement } from 'react'
import { isEmpty, not } from 'ramda'

import HomeSection from '../HomeSection'

import { NEWS_LIST } from '~/constants/api'
import { NEWS_URL } from '~/constants/routes'
import { TNews } from '~/types/news'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import Container from '~/components/Container'
import { SectionTitleWrap, SectionTitle } from '~/components/Titles'
import { MoreButton } from '~/components/Buttons'
import { NewsGrid, NewsCard } from '~/components/PageComponents/News'

export default function NewsSection (): ReactElement {
  const { t } = useTranslate()

  const { newsData } = useHomeData()

  const { results, count, isLoading } = useRequest<TNews>(NEWS_LIST, {
    disableLocale: false,
    initialData: newsData,
    params: { pageSize: 3 }
  })

  const hasMoreNews = not(isEmpty(results)) && count > 3

  return (
    <HomeSection>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>
            {t('home_section_news_title')}
          </SectionTitle>

          {hasMoreNews && (
            <MoreButton href={NEWS_URL} />
          )}
        </SectionTitleWrap>

        <NewsGrid isLoading={isLoading}>
          {results.map(news => (
            <NewsCard key={news.id} data={news} />
          ))}
        </NewsGrid>
      </Container>
    </HomeSection>
  )
}

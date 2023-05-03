import { ReactElement } from 'react'
import { prop } from 'ramda'

import { NEWS_CATEGORY_LIST } from '~/constants/api'
import { TNewsCategory } from '~/types/news'
import { useTranslate } from '~/utils/translate'
import { Categories, CategoryItem, useCategories, useFetchCategories } from '~/components/Categories'

interface Props {
  allCount: number
}

export default function NewsCategories (props: Props): ReactElement {
  const { allCount } = props

  const { t } = useTranslate()

  const { activeCategory, onSelectCategory } = useCategories()

  const { isLoading, results } = useFetchCategories<TNewsCategory>(NEWS_CATEGORY_LIST)

  return (
    <Categories
      allCount={allCount}
      allServicesLabel={t('news_categories_all')}
      isLoading={isLoading}>
      {results.map(category => {
        const id = String(prop('id', category))
        const title = prop('title', category)
        const count = prop('newsCount', category)
        const isActive = id === activeCategory

        return (
          <CategoryItem
            key={id}
            count={count}
            isActive={isActive}
            onClick={onSelectCategory.bind(null, id)}>
            {title}
          </CategoryItem>
        )
      })}
    </Categories>
  )
}

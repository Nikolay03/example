import { ReactElement } from 'react'
import { prop } from 'ramda'

import { FAQ_CATEGORY_LIST } from '~/constants/api'
import { TFaqCategory } from '~/types/faq'
import { useTranslate } from '~/utils/translate'
import { Categories, CategoryItem, useCategories, useFetchCategories } from '~/components/Categories'

interface Props {
  allCount: number
}

export default function FaqCategories (props: Props): ReactElement {
  const { allCount } = props

  const { t } = useTranslate()

  const { activeCategory, onSelectCategory } = useCategories()

  const { isLoading, results } = useFetchCategories<TFaqCategory>(FAQ_CATEGORY_LIST)

  return (
    <Categories
      allCount={allCount}
      allServicesLabel={t('faq_categories_all')}
      isLoading={isLoading}>
      {results.map(category => {
        const id = String(prop('id', category))
        const title = prop('title', category)
        const count = prop('count', category)
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

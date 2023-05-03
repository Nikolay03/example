import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { includes, prop } from 'ramda'
import { useFormContext } from 'react-hook-form'

import { getTopParentByChildren } from './getTopParentByChildren'
import ProductsLevel from './ProductsLevel'

import * as API from '~/constants/api'
import { TProductGroup } from '~/types/products'
import { useTranslate } from '~/utils/translate'
import { useDebounce } from '~/hooks/index'
import { useRequest } from '~/hooks/api'
import { CheckboxGroup, RadioGroup } from '~/components/HookForm'
import { SearchField } from '~/components/Search'

const groupComponents = {
  checkbox: CheckboxGroup,
  radio: RadioGroup
}

interface Props {
  name: string
  type?: 'checkbox' | 'radio'
  initialValue?: string[]
}

function ProductsGroup (props: Props): ReactElement {
  const { name, type, initialValue } = props

  const { t } = useTranslate()

  const isFirstTime = useRef(true)
  const [searchValue, setSearchValue] = useState('')
  const searchValueDebounced = useDebounce(searchValue, 500)

  const { results, isLoading, refetch } = useRequest<TProductGroup>(API.PRODUCT_GROUP_CLASS_LIST, {
    disableUrlParams: true,
    params: { pageSize: 25 },
    shouldRetryOnError: false
  })

  const { watch } = useFormContext()

  useEffect(() => {
    if (searchValueDebounced) {
      isFirstTime.current = false
    }

    if (!isFirstTime.current) {
      refetch({
        search: searchValueDebounced
      })
    }
  }, [searchValueDebounced])

  const onInputChange = useCallback((event) => {
    setSearchValue(event.target.value)
  }, [])

  const GroupComponent = groupComponents[type]

  const value: string | string[] = initialValue ?? watch(name)
  const activeParents = getTopParentByChildren(results, value)
  const activeParentsIds = Array.isArray(activeParents)
    ? activeParents.map(parents => parents?.id)
    : activeParents ? [activeParents.id] : []

  return (
    <Stack>
      <SearchField
        onChange={onInputChange}
        value={searchValue}
        isLoading={isLoading}
        placeholder={t('input_product_group_search_placeholder')}
      />

      <GroupComponent name={name}>
        {results.map(product => {
          const productId = prop('id', product)
          const isSelected = includes(productId, activeParentsIds)

          return (
            <ProductsLevel
              key={productId}
              product={product}
              type={type}
              isSelected={isSelected}
            />
          )
        })}
      </GroupComponent>
    </Stack>
  )
}

ProductsGroup.defaultProps = {
  type: 'checkbox'
}

export default ProductsGroup

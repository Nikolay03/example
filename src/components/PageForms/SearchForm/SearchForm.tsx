import { ReactElement, useState, useCallback } from 'react'
import { Box, Center, Flex } from '@chakra-ui/react'
import { join, mapObjIndexed } from 'ramda'
import { useRouter } from 'next/router'

import SearchFormFields from './SearchFormFields'

import { SEARCH_URL } from '~/constants/routes'
import { TObject } from '~/types/constants'
import { TradeTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { HookForm } from '~/components/HookForm'

interface Props {
  onReset?: () => void
  defaultValues?: TObject
  initialTab?: TradeTypes
  initialExpanded?: boolean
}

const searchTypes: { id: TradeTypes, title: string }[] = [
  { id: TradeTypes.SALE, title: 'filter_tab_offer' },
  { id: TradeTypes.PURCHASE, title: 'filter_tab_demand' }
]

const getFieldValue = (fieldValue: any) => {
  if (!fieldValue) return null
  if (['string', 'number'].includes(typeof fieldValue)) return fieldValue
  if (fieldValue?.id) return fieldValue.id
  return fieldValue
}

export default function SearchForm (props: Props): ReactElement {
  const { defaultValues, initialTab = TradeTypes.SALE, initialExpanded, onReset } = props

  const router = useRouter()

  const { t } = useTranslate()

  const [bargainType, setBargainType] = useState<TradeTypes>(initialTab)

  const onSubmitForm = useCallback(values => {
    const { prices, salesVolume, ...restValues } = values
    const formattedValues = {
      ...mapObjIndexed(getFieldValue, restValues),
      page: 1,
      prices: prices ? join('-', prices) : undefined,
      salesVolume: salesVolume ? join('-', salesVolume) : undefined,
      bargainType
    }

    router.push({
      pathname: SEARCH_URL,
      query: formattedValues
    })
  }, [bargainType])

  return (
    <HookForm onSubmit={onSubmitForm} defaultValues={defaultValues}>
      <Flex>
        {searchTypes.map(item => {
          const id = item.id
          const title = item.title
          const isActive = bargainType === id

          return (
            <Center
              key={id}
              as={'button'}
              bgColor={isActive ? 'gray.100' : 'whiteAlpha.600'}
              borderRadius={'xl'}
              borderBottomStartRadius={'0'}
              borderBottomEndRadius={'0'}
              color={'palette.text.default'}
              fontWeight={'semibold'}
              px={8}
              py={4}
              transition={'all 200ms'}
              type={'button'}
              onClick={() => setBargainType(id)}>
              {t(title)}
            </Center>
          )
        })}
      </Flex>
      <Box
        bgColor={'gray.100'}
        borderRadius={'2xl'}
        borderTopStartRadius={'0'}
        px={6}
        py={8}>
        <SearchFormFields onReset={onReset} initialExpanded={initialExpanded} />
      </Box>
    </HookForm>
  )
}

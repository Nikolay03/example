import { ReactElement } from 'react'
import { prop } from 'ramda'
import { useFormContext } from 'react-hook-form'
import { Search } from 'react-feather'
import { Box, Button, Flex, Grid, Icon, Stack, useDisclosure } from '@chakra-ui/react'

import SearchFormExtraFields from './SearchFormExtraFields'

import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import { TTradesMaxPrice } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useDetailRequest } from '~/hooks/api'
import Filter from '~/icons/common/Filter'
import { Input, StaticSelectField } from '~/components/HookForm'

interface Props {
  onReset?: () => void
  initialExpanded?: boolean
}

export default function SearchFormFields (props: Props): ReactElement {
  const { onReset, initialExpanded = false } = props

  const { t } = useTranslate()

  const { reset } = useFormContext()

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: initialExpanded })

  const { data } = useDetailRequest<TTradesMaxPrice>(API.TRADE_MAX_PRICE)

  const maxPrice = prop('maxPrice', data) || 0
  const maxVolume = prop('maxVolume', data) || 0

  function onResetForm () {
    if (typeof onReset === 'function') onReset()
    reset({
      prices: [0, maxPrice],
      salesVolume: [0, maxVolume]
    })
  }

  return (
    <Stack spacing={6}>
      <Grid
        alignItems={'flex-end'}
        templateColumns={{
          base: '100%',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, minmax(0px, 1fr))'
        }}
        gap={6}>
        <Box gridColumn={{ base: 'unset', md: '2/1', lg: '4/1' }}>
          <Input
            name={'search'}
            label={t('input_search_label')}
            placeholder={t('input_search_placeholder')}
            leftElement={<Icon as={Search} color={'gray.500'} />}
            size={'lg'}
            variant={'outline'}
          />
        </Box>

        <StaticSelectField
          name={'productsFrom'}
          list={CONST.USER_TYPE.list}
          label={t('input_products_from_label')}
          size={'lg'}
          variant={'outline'}
        />

        {isOpen && (
          <SearchFormExtraFields
            maxPrice={maxPrice}
            maxVolume={maxVolume}
          />
        )}
      </Grid>

      <Flex
        align={'center'}
        justify={'space-between'}
        wrap={{ base: 'wrap', md: 'unset' }}
        gridRowGap={6}>
        <Button
          colorScheme={'gray'}
          leftIcon={<Filter />}
          variant={'link'}
          onClick={onToggle}>
          {isOpen ? t('button_collapse_filter') : t('button_expand_filter')}
        </Button>

        <Stack direction={'row'} spacing={4} w={{ base: 'full', md: 'auto' }}>
          <Button
            bg={'transparent'}
            borderColor={'gray.500'}
            flexBasis={'100%'}
            size={'lg'}
            variant={'secondary'}
            onClick={onResetForm}>
            {t('button_reset_filter')}
          </Button>

          <Button
            bg={'gray.500'}
            color={'white'}
            colorScheme={'gray'}
            flexBasis={'100%'}
            size={'lg'}
            type={'submit'}
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.700' }}>
            {t('button_apply_filter')}
          </Button>
        </Stack>
      </Flex>
    </Stack>
  )
}

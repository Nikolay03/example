import { ReactElement, useState } from 'react'
import { useToken, Button, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { prop } from 'ramda'

import { useTranslate } from '~/utils/translate'
import hexToRgba from '~/utils/hexToRgba'
import { useCreate } from '~/hooks/crud'
import * as API from '~/constants/api'
import { TProductBanner } from '~/types/products'
import { useAuth } from '~/components/AuthProvider'
import { LOGIN_URL } from '~/constants/routes'

interface FavouriteRequest {
  id: number
}
export function favouriteSerializer (values: FavouriteRequest): FavouriteRequest {
  return {
    id: prop('id', values)
  }
}

interface Props {
  data: TProductBanner
}

export default function ProductsCardActions ({ data }: Props): ReactElement {
  const { t } = useTranslate()
  const { user } = useAuth()
  const [primaryColor] = useToken('colors', ['palette.common.darkGray'])
  const id = prop('id', data)
  const userId = prop('id', user)
  const isFavouriteProduct = prop('isFavourite', data)
  const favouriteCreate = useCreate(API.FAVOURITE_CREATE)
  const [isFavourite, setFavourite] = useState(isFavouriteProduct)
  const router = useRouter()
  function onSubmitFavourite () {
    return userId
      ? favouriteCreate.create(favouriteSerializer({ id })).then(() => {
        setFavourite(!isFavourite)
      })
      : router.push(LOGIN_URL)
  }
  return (
    <Flex
      bgColor={hexToRgba(primaryColor, '0.72')}
      height={'100%'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack spacing={{ lg: 8 }}>
        <Button
          isLoading={favouriteCreate.isLoading}
          isFullWidth={true}
          type={'button'}
          fontSize={{ base: 'xs', md: 'md' }}
          variant={'whiteSecond'}
          borderRadius={'none'}
          onClick={() => onSubmitFavourite()}
        >
          {isFavourite ? t('favourite_button_remove') : t('favourite_button_add')}
        </Button>
      </Stack>
    </Flex>
  )
}

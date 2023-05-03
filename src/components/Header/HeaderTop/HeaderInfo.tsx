import { Fragment, ReactElement } from 'react'
import { Flex, Text, useToken } from '@chakra-ui/react'
import { Heart } from 'react-feather'
import { prop } from 'ramda'
import { useRouter } from 'next/router'

import Languages from './Languages'

import EtpInfo from '~/components/EtpInfo'
import { useAuth } from '~/components/AuthProvider'
import { ACCOUNT_TRADES_URL, LOGIN_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'

interface Props {
  themeType?: 'azure'
}

export default function HeaderInfo ({ themeType }: Props): ReactElement {
  // const isLargerThanXL = useMediaBreakpoint({ breakpoint: 'xl' })
  const { t } = useTranslate()

  const { user } = useAuth()
  const userId = prop('id', user)
  const isAzure = themeType === 'azure'
  const [primary500] = useToken('colors', ['primary.500'])

  const router = useRouter()
  function redirectFavourite () {
    return router.replace(userId
      ? {
        pathname: ACCOUNT_TRADES_URL,
        query: { page: 1, tab: 'favourite' }
      }
      : {
        pathname: LOGIN_URL
      }, null, { shallow: true })
  }

  return (
    <Flex align={'center'} ml={'auto'}>
      <EtpInfo
        direction={'row'}
        spacing={{ base: 3, lg: 6 }}
        mr={{ base: 0, lg: 6 }}>
        <Flex
          align={'center'} onClick={redirectFavourite}
          cursor={'pointer'}>
          <Heart size={'18px'} color={primary500} />
          <Text fontSize={isAzure ? 'md' : 'sm'} ml={'10px'}>
            {t('favourite_title')}
          </Text>
        </Flex>
      </EtpInfo>

      <Languages display={{ base: 'none', lg: 'flex' }} />
    </Flex>
  )
}

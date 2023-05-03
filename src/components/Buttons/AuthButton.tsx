import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Skeleton } from '@chakra-ui/react'
import { prop } from 'ramda'

import { ACCOUNT_PERSONAL_URL, LOGIN_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useAuth } from '~/components/AuthProvider'
import { PrimaryLink } from '~/components/Link'

interface Props {
  isFullWidth?: boolean
  themeType?: 'azure'
}

export default function AuthButton (props: Props): ReactElement {
  const { isFullWidth, themeType } = props
  const isAzure = themeType === 'azure'
  const { t } = useTranslate()

  const router = useRouter()

  const { isAuth, isUserLoading, user } = useAuth()

  function toSignIn () {
    return router.push(LOGIN_URL)
  }

  const lastName = prop('lastName', user)
  const firstName = prop('firstName', user)
  const fullName = `${lastName} ${firstName}`

  return (
    <Skeleton
      display={isFullWidth ? 'flex' : 'inline-flex'}
      isLoaded={!isUserLoading}>
      {isAuth && (
        <PrimaryLink
          href={ACCOUNT_PERSONAL_URL}
          border={'1px solid'}
          borderColor={isAzure ? 'palette.common.white' : 'primary.500'}
          borderRadius={'lg'}
          display={'block'}
          lineHeight={'none'}
          px={3}
          py={2}
          w={'174px'}>
          <Box
            color={'palette.text.default'}
            fontSize={'sm'}
            fontWeight={'bold'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}>
            {fullName}
          </Box>
          <Box fontSize={'xs'} color={isAzure ? 'palette.common.white' : 'palette.text.default'}>
            {t('button_user_account')}
          </Box>
        </PrimaryLink>
      )}

      {!isAuth && (
        <Button onClick={toSignIn} {...props}>
          {t('button_sign_in')}
        </Button>
      )}
    </Skeleton>
  )
}

import { ReactElement } from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'

import LoginFormFields from './LoginFormFields'

import { REGISTRATION_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useAuth } from '~/components/AuthProvider'
import { HookForm } from '~/components/HookForm'
import { AuthFormContainer } from '~/components/PageComponents/Auth'
import { AsideTitle } from '~/components/Titles'
import { PrimaryLink } from '~/components/Link'
import { ResetPass } from '~/components/PageComponents/Login'

function onLoginWithOneId () {
  const oneIdBaseUrl = 'https://sso.egov.uz/sso/oauth/Authorization.do'
  const redirectUri = window.location.origin
  const clientid = 'at_agrosanoat_markazi'
  const state = 'null'
  // eslint-disable-next-line max-len
  const url = `${oneIdBaseUrl}?response_type=one_code&client_id=${clientid}&redirect_uri=${redirectUri}&scope=myportal&state=${state}`
  window.location.replace(url)
}

export default function LoginHookForm (): ReactElement {
  const { t } = useTranslate()

  const { onLogin } = useAuth()

  return (
    <AuthFormContainer>
      <Stack justifyContent={'space-between'} h={'full'} spacing={8}>
        <Stack spacing={3}>
          <Stack spacing={8}>
            <AsideTitle fontSize={{ base: 'md', sm: 'lg' }}>
              {t('login_page_description_text')}
            </AsideTitle>

            <HookForm onSubmit={onLogin}>
              <LoginFormFields />
            </HookForm>
          </Stack>

          <ResetPass />

          <Button alignSelf={'center'} variant={'link'} onClick={onLoginWithOneId}>
            {t('login_with_one_id')}
          </Button>
        </Stack>

        <Box fontWeight={'semibold'} textAlign={'center'}>
          {t('login_dont_have_an_account')}
          <PrimaryLink
            fontWeight={'inherit'}
            href={REGISTRATION_URL}
            ml={1}
            textDecor={'underline'}>
            {t('login_register')}
          </PrimaryLink>
        </Box>
      </Stack>
    </AuthFormContainer>
  )
}

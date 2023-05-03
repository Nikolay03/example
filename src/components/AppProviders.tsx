import { ReactNode, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { AuthProvider } from '~/components/AuthProvider'
import NotificationWrapper from '~/components/NotificationWrapper'
import { DataProvider, DOMProvider } from '~/components/Utils/Contexts'
import { PageTransition } from '~/components/Animation'
import { ErrorProvider } from '~/components/ErrorModal'

interface Props {
  children: ReactNode
}

export default function AppProviders (props: Props): ReactElement {
  const { children } = props

  const { pathname } = useRouter()

  return (
    <AuthProvider>
      <NotificationWrapper>
        <DataProvider>
          <DOMProvider>
            <PageTransition id={pathname} disableAnimation={true}>
              <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}
                scriptProps={{ async: true, defer: true, appendTo: 'body' }}>
                <ErrorProvider>
                  {children}
                </ErrorProvider>
              </GoogleReCaptchaProvider>
            </PageTransition>
          </DOMProvider>
        </DataProvider>
      </NotificationWrapper>
    </AuthProvider>
  )
}

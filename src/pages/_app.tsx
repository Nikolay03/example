import { ReactElement, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import ProgressBar from '@badrap/bar-of-progress'

import theme from '~/theme/index'
import FontStyles from '~/theme/FontStyles'
import { initializeFirebase } from '~/lib/firebase'
import * as gtag from '~/lib/gtag'
import AppProviders from '~/components/AppProviders'

const progress = new ProgressBar({
  size: 2,
  color: theme.colors.primary['500'],
  className: 'bar-of-progress',
  delay: 100
})

initializeFirebase()

function App (props: AppProps): ReactElement {
  const { Component, pageProps } = props

  const router = useRouter()

  useEffect(() => {
    function handleRouterChangeStart () {
      progress.start()
    }
    function handleRouteChangeComplete (url) {
      progress.finish()
      gtag.pageview(url)
    }
    function handleRouterChangeError () {
      progress.finish()
    }

    router.events.on('routeChangeStart', handleRouterChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouterChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouterChangeError)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <FontStyles />

      <AppProviders>
        {/*  @ts-ignore */}
        <Component {...pageProps} />
      </AppProviders>
    </ChakraProvider>
  )
}

export default App

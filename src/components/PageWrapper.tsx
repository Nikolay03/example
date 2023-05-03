import { Fragment, ReactNode, ReactElement } from 'react'
import Head from 'next/head'

function formatTitle (title: string): string {
  if (title) return `${title} - ETP`
  return ''
}

const defaultDescription = 'Uzbekistan Electronic Trading Platform (ETP Uzbekistan)'
const keywordsArray: string[] = [
  'Торговая площадка Узбекистана',
  'Торговля',
  'Торги',
  'Аукцион',

  'Uzbekistan trading platform',
  'Trading',
  'Trades',
  'Auction'
]

interface Props {
  children: ReactNode
  title: string
  description?: string
}

function PageWrapper (props: Props): ReactElement {
  const { children, title, description } = props

  const keywords = keywordsArray.join(',')

  return (
    <Fragment>
      <Head>
        <meta content={'IE=edge'} httpEquiv={'X-UA-Compatible'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'} />
        <meta name={'keywords'} content={keywords} />
        <title>{formatTitle(title)}</title>
        <meta name={'description'} content={description} />

        <link rel={'apple-touch-icon'} sizes={'57x57'} href={'/icons/apple-icon-57x57.png'} />
        <link rel={'apple-touch-icon'} sizes={'60x60'} href={'/icons/apple-icon-60x60.png'} />
        <link rel={'apple-touch-icon'} sizes={'72x72'} href={'/icons/apple-icon-72x72.png'} />
        <link rel={'apple-touch-icon'} sizes={'76x76'} href={'/icons/apple-icon-76x76.png'} />
        <link rel={'apple-touch-icon'} sizes={'114x114'} href={'/icons/apple-icon-114x114.png'} />
        <link rel={'apple-touch-icon'} sizes={'120x120'} href={'/icons/apple-icon-120x120.png'} />
        <link rel={'apple-touch-icon'} sizes={'144x144'} href={'/icons/apple-icon-144x144.png'} />
        <link rel={'apple-touch-icon'} sizes={'152x152'} href={'/icons/apple-icon-152x152.png'} />
        <link rel={'apple-touch-icon'} sizes={'180x180'} href={'/icons/apple-icon-180x180.png'} />
        <link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/icons/android-icon-192x192.png'} />
        <link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/icons/favicon-32x32.png'} />
        <link rel={'icon'} type={'image/png'} sizes={'96x96'} href={'/icons/favicon-96x96.png'} />
        <link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/icons/favicon-16x16.png'} />
        <link rel={'shortcut icon'} href={'/favicon.ico'} type={'image/x-icon'} />
        <link rel={'icon'} href={'/favicon.ico'} type={'image/x-icon'} />
        <link rel={'manifest'} href={'/manifest.json'} />
      </Head>
      {children}
    </Fragment>
  )
}

PageWrapper.defaultProps = {
  description: defaultDescription
}

export default PageWrapper

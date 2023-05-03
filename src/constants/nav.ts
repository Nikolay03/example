import * as ROUTES from '~/constants/routes'

type TNavItem = {
  url: string
  title: string
}

const nav: TNavItem[] = [
  {
    url: ROUTES.TRADES_URL,
    title: 'header_nav_trades'
  },
  {
    url: ROUTES.SERVICES_URL,
    title: 'header_nav_services'
  },
  {
    url: ROUTES.RATING_URL,
    title: 'header_nav_rating'
  },
  {
    url: ROUTES.REPORTS_URL,
    title: 'header_nav_reports'
  },
  {
    url: ROUTES.NEWS_URL,
    title: 'header_nav_news'
  },
  {
    url: ROUTES.FAQ_URL,
    title: 'header_nav_faq'
  },
  {
    url: ROUTES.ABOUT_URL,
    title: 'header_nav_about'
  }
]

export default nav

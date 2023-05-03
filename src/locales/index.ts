/* eslint-disable max-len */
import error404 from './error404'
import about from './about'
import account from './account'
import backend from './backend'
import common from './common'
import faq from './faq'
import feedback from './feedback'
import favourite from './favourite'
import filter from './filter'
import inputs from './inputs'
import login from './login'
import news from './news'
import productCarousel from './productCarousel'
import notifications from './notifications'
import rating from './rating'
import registration from './registration'
import report from './report'
import reviews from './reviews'
import search from './search'
import select from './select'
import services from './services'
import showcase from './showcase'
import stats from './stats'
import trades from './trades'
import statistics from './statistics'

import * as ENUMS from '~/types/enums'
import { TLocaleObject } from '~/types/locales'
import products from '~/locales/products'

const locales: TLocaleObject = {
  ...error404,
  ...backend,
  ...common,
  ...inputs,
  ...select,
  ...login,
  ...registration,
  ...filter,
  ...favourite,

  ...about,
  ...productCarousel,
  ...products,
  ...account,
  ...faq,
  ...feedback,
  ...news,
  ...notifications,
  ...rating,
  ...report,
  ...reviews,
  ...statistics,
  ...search,
  ...services,
  ...showcase,
  ...stats,
  ...trades,
  // Header top info
  header_currency_bank: {
    ru: 'ЦБ',
    en: 'CB',
    uz: 'МБ'
  },

  // Header nav
  header_nav_trades: {
    ru: 'Торги',
    en: 'Trades',
    uz: 'Савдолар'
  },
  header_nav_services: {
    ru: 'Услуги',
    en: 'Services',
    uz: 'Хизматлар'
  },
  header_nav_rating: {
    ru: 'Рейтинг',
    en: 'Rating',
    uz: 'Рейтинг'
  },
  header_nav_analytics: {
    ru: 'Аналитика',
    en: 'Analytics',
    uz: 'Аналитика'
  },
  header_nav_reports: {
    ...report.reports_page_title
  },
  header_nav_news: {
    ru: 'Новости',
    en: 'News',
    uz: 'Янгиликлар'
  },
  header_nav_faq: {
    ...faq.faq_page_title
  },
  header_nav_about: {
    ...about.about_page_title
  },
  header_call_center: {
    ru: 'Связаться с колл центром',
    en: 'Contact the call center',
    uz: 'Колл-марказ билан боғланиш'
  },

  // Page titles & descriptions
  home_page_title: {
    ru: 'Главная',
    en: 'Home',
    uz: 'Бош саҳифа'
  },

  // Home
  home_section_stats_title: {
    ru: 'Статистика дня',
    en: '',
    uz: 'Кун статистикаси'
  },
  home_product_cost: {
    ru: 'Начальная цена',
    en: '',
    uz: 'Бошланғич нарх'
  },
  home_section_popular_title: {
    ru: 'Популярные категории',
    en: '',
    uz: 'Оммабоп категориялар'
  },
  home_section_services_title: {
    ru: 'Услуги',
    en: 'Services',
    uz: 'Хизматлар'
  },
  home_section_trades_title: {
    ru: 'Текущие торги',
    en: 'Current trades',
    uz: 'Жорий савдолар'
  },
  home_section_reports_title: {
    ...report.reports_page_title
  },
  home_section_reports_view_all: {
    ru: 'Смотреть все отчеты',
    en: 'View all reports',
    uz: 'Барча ҳисоботларни кўриш'
  },
  home_section_reports_banner_title: {
    ru: 'Получите аналитический отчет, заполнив необходимые данные',
    en: '',
    uz: 'Зарур маълумотларни киритиб, таҳлилий ҳисоботни олинг'
  },
  home_section_reports_banner_description: {
    ru: 'Вы также можете связаться с аналитическим департаментом “Электронного портала агропромышленного рынка”, используя контакты: <span>%(contacts)s</span>',
    en: '',
    uz: 'Сиз, шунингдек, <span>%(contacts)s</span> контактлардан фойдаланган ҳолда “Elektron agrosanoat bozori portali” таҳлил департаменти билан боғланишингиз мумкин'
  },
  home_section_companies_rating_title: {
    ...rating.rating_page_title
  },
  home_section_statistics_title: {
    ru: 'Статистика',
    en: '',
    uz: 'Статистика'
  },
  [`home_section_statistics_chart_line_${ENUMS.StatisticsTypes.EXPORT}_title`]: {
    ru: 'Экспорт',
    en: '',
    uz: 'Экспорт'
  },
  [`home_section_statistics_chart_line_${ENUMS.StatisticsTypes.IMPORT}_title`]: {
    ru: 'Импрорт',
    en: '',
    uz: 'Импорт'
  },
  home_section_statistics_chart_bar_title: {
    ru: 'Торги',
    en: 'Trades',
    uz: 'Савдолар'
  },
  home_section_statistics_chart_sale: {
    ru: 'Продажи',
    en: 'Trades',
    uz: 'Сотувлар'
  },
  home_section_news_title: {
    ...news.news_page_title
  },
  home_section_about_title: {
    ru: 'О проекте',
    en: '',
    uz: 'Лойиҳа ҳақида'
  },
  home_section_description: {
    ru: 'О проекте',
    en: '',
    uz: 'Лойиҳа ҳақида'
  },

  auth_user_data_loading: {
    ru: 'Загрузка данных пользователя...',
    en: 'Loading user data...',
    uz: 'Фойдаланувчи маълумотларини юклаш'
  },

  common_choose_category: {
    ru: 'Выберите категорию',
    en: 'Choose category',
    uz: 'Категорияни танланг'
  },

  footer_nav_title_about: {
    ru: 'О портале',
    en: '',
    uz: 'Портал ҳақида'
  },
  footer_nav_title_help: {
    ru: 'Помощь',
    en: '',
    uz: 'Ёрдам'
  },
  footer_nav_title_contacts: {
    ru: 'Контакты',
    en: '',
    uz: 'Боғланиш учун маълумотлар'
  },
  footer_nav_title_send: {
    ru: 'Быть в курсе',
    en: '',
    uz: 'Ҳабардор бўлиш'
  },
  footer_copyright_text: {
    ru: '© %(year)s %(etp)s. %(version)s. Все права защищены.',
    en: '© %(year)s %(etp)s. %(version)s. All rights reserved.',
    uz: '© %(year)s %(etp)s. %(version)s. Все права защищены.'
  }
}

export default locales

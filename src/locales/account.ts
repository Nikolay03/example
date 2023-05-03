/* eslint-disable max-len */
import accountAccreditation from './accountAccreditation'
import accountBalance from './accountBalance'
import accountFeedbacks from './accountFeedbacks'
import accountMailing from './accountMailing'
import accountSecurity from './accountSecurity'
import accountServices from './accountServices'

import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  ...accountAccreditation,
  ...accountBalance,
  ...accountFeedbacks,
  ...accountMailing,
  ...accountSecurity,
  ...accountServices,

  account_page_title: {
    ru: 'Персональный кабинет',
    en: 'Personal cabinet',
    uz: 'Шахсий кабинет'
  },

  // Navigation
  account_nav_main: {
    ru: 'Мой аккаунт',
    en: 'My account',
    uz: 'Менинг аккаунтим'
  },
  account_nav_balance: {
    ru: 'Баланс',
    en: 'Balance',
    uz: 'Баланс'
  },
  account_nav_mailing: {
    ru: 'Управление рассылками',
    en: 'Mailing',
    uz: 'Жўнатмаларни бошқариш'
  },
  account_nav_notifications: {
    ru: 'Уведомления',
    en: 'Notifications',
    uz: 'Билдиришномалар'
  },
  account_nav_reports: {
    ru: 'Мои отчеты',
    en: 'My reports',
    uz: 'Менинг ҳисоботларим'
  },
  account_nav_security: {
    ru: 'Безопасность',
    en: 'Security',
    uz: 'Хавфсизлик'
  },
  account_nav_trades: {
    ru: 'Мои торги',
    en: 'My trades',
    uz: 'Менинг савдоларим'
  },
  account_nav_feedbacks: {
    ru: 'Запросы с витрины',
    en: 'Feedbacks from showcase',
    uz: 'Пештахтадан сўровлар'
  },
  account_nav_services: {
    ru: 'Услуги',
    en: 'Services',
    uz: 'Хизматлар'
  },

  // Account main
  account_change_photo: {
    ru: 'Изменить фото',
    en: '',
    uz: 'Расмни ўзгартириш'
  },
  account_upload_photo_preview: {
    ru: 'Предпросмотр фото',
    en: 'Photo preview',
    uz: 'Расмни олдиндан кўриш'
  },
  account_company_info: {
    ru: 'Информация о компании',
    en: 'Company information',
    uz: 'Компания ҳақида маълумот'
  },
  account_update_success_title: {
    ru: 'Сохранено',
    en: '',
    uz: 'Сақланди'
  },
  account_update_success_message: {
    ru: 'Данные обновлены',
    en: '',
    uz: 'Маълумотлар янгиланди'
  },

  account_no_access_title: {
    ru: 'Отказано в доступе',
    en: 'Access denied',
    uz: 'Рухсат рад этилди'
  },
  account_no_access_text: {
    ru: 'Вы не авторизованы, пожалуйста войдите в аккаунт',
    en: 'You are not logged in, please log in',
    uz: 'Саҳифани кўриш учун тизимга шахсий кабинет орқали киринг'
  },
  account_no_permission_text: {
    ru: 'У вас недостаточно прав, чтобы просмотреть данную страницу',
    en: 'You have no permissions to view this page',
    uz: 'Ушбу саҳифани кўриш учун сизда рухсат йўқ'
  }
}

export default locales

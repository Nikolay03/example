/* eslint-disable max-len */
import { AccreditationStatuses } from '~/types/enums'
import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  account_accreditation_title: {
    ru: 'Аккредитация',
    en: 'Accreditation',
    uz: 'Аккредитация'
  },
  account_no_accreditation: {
    ru: 'Нет аккредитации?',
    en: 'No accreditation?',
    uz: 'Аккредитация мавжуд эмас'
  },
  account_accreditation_fill_form: {
    ru: 'Заполните форму',
    en: 'Fill form',
    uz: 'Шаклни тўлдиринг'
  },
  account_accreditation_placeholder_text: {
    ru: 'Для того, чтобы начать торговать, Вам необходимо пройти аккредитацию.',
    en: '',
    uz: 'Савдо қилишни бошлаш учун аккредитациядан ўтишингиз зарур'
  },
  account_accreditation_price_label: {
    ru: 'Цена аккредитации: %(price)s',
    en: 'Accreditation price: %(price)s',
    uz: 'Аккредитация нархи: %(price)s'
  },
  account_accreditation_price_free: {
    ru: 'Бесплатно',
    en: 'Free',
    uz: 'Бепул'
  },
  account_accreditation_status: {
    ru: 'Статус аккредитации',
    en: '',
    uz: 'Аккредитация ҳолати'
  },
  [`account_accreditation_status_${AccreditationStatuses.NEW}`]: {
    ru: 'запрос отправлен',
    en: '',
    uz: 'сўров юборилди'
  },
  [`account_accreditation_status_${AccreditationStatuses.IN_PROCESS}`]: {
    ru: 'в процессе',
    en: '',
    uz: 'кўриб чиқилмоқда'
  },
  [`account_accreditation_status_${AccreditationStatuses.APPROVED}`]: {
    ru: 'одобрен',
    en: '',
    uz: 'маъқулланди'
  },
  [`account_accreditation_status_${AccreditationStatuses.REJECTED}`]: {
    ru: 'отклонен',
    en: '',
    uz: 'рад этилди'
  },
  account_accreditation_date: {
    ru: 'Дата аккредитации:',
    en: '',
    uz: 'Аккредитация санаси'
  },
  account_accreditation_modal_description: {
    ru: 'Для того чтобы начать торговать, Вам необходимо пройти аккредитацию. Пожалуйста, заполните форму ниже.',
    en: '',
    uz: 'Савдо қилишни бошлаш учун Сиз аккредитациядан ўтишингиз керак. Илтимос, қуйидаги шаклни тўлдиринг.'
  },
  account_accreditation_modal_success_title: {
    ru: 'Ваша заяка отправлена',
    en: '',
    uz: 'Сўровингиз юборилди'
  },
  account_accreditation_modal_success_description: {
    ru: 'Заявка на аккредитацию будет рассмотрена в течение 3 рабочих дней. Сам процесс аккредитации может занять больше времени.',
    en: '',
    uz: 'Аккредитация учун ариза 3 иш куни ичида кўриб чиқилади. Аккредитация жараёнининг ўзи кўпроқ вақт талаб қилиши мумкин.'
  },
  // Deny modal
  accreditation_deny_modal_title: {
    ru: 'Пройдите аккредитацию',
    en: '',
    uz: 'Аккредитациядан ўтинг'
  },
  accreditation_deny_modal_trades_participate_description: {
    ru: 'Участвовать в торгах могут только аккредитованные пользователи. Чтобы пройти аккредитацию вам необходимо подать заявку на аккредитацию',
    en: '',
    uz: 'Савдоларда фақат аккредитациядан ўтган фойдаланувчилар иштирок этиши мумкин. Аккредитациядан ўтиш учун ариза топширишингиз керак'
  },
  accreditation_deny_modal_trades_create_description: {
    ru: 'Создавать торги могут только аккредитованные пользователи. Чтобы пройти аккредитацию вам необходимо подать заявку на аккредитацию',
    en: '',
    uz: 'Савдоларни фақат аккредитациядан ўтган фойдаланувчилар яратиши мумкин. Аккредитациядан ўтиш учун ариза топширишингиз керак'
  },
  accreditation_deny_modal_button: {
    ru: 'Подать заявку',
    en: '',
    uz: 'Ариза топшириш'
  }
}

export default locales

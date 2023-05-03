import inputs from './inputs'

import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  account_feedbacks_search_placeholder: {
    ru: 'Поиск по теме, сообщению, моему комментарию',
    en: '',
    uz: 'Мавзу, хабар, менинг изоҳим бўйича излаш'
  },
  account_feedbacks_th_full_name: {
    ...inputs.input_full_name_label
  },
  account_feedbacks_th_subject: {
    ...inputs.input_email_subject_label
  },
  account_feedbacks_th_receive_date: {
    ru: 'Дата запроса',
    en: '',
    uz: 'Сўров санаси'
  },
  account_feedbacks_th_reply_date: {
    ru: 'Дата ответа',
    en: '',
    uz: 'Жавоб санаси'
  },

  account_feedbacks_detail_title: {
    ru: 'Детали запроса',
    en: '',
    uz: 'Сўров тафсилотлари'
  },
  account_feedbacks_detail_full_name_label: {
    ...inputs.input_full_name_label
  },
  account_feedbacks_detail_email_label: {
    ...inputs.input_email_label
  },
  account_feedbacks_detail_phone_label: {
    ...inputs.input_phone_label
  },
  account_feedbacks_detail_subject_label: {
    ...inputs.input_email_subject_label
  },
  account_feedbacks_detail_file_label: {
    ru: 'Прикрепленный файл',
    en: '',
    uz: 'Бириктирилган файл'
  },
  account_feedbacks_detail_comment_label: {
    ru: 'Комментарий',
    en: '',
    uz: 'Изоҳ'
  },
  account_feedbacks_detail_answer_label: {
    ru: 'Ваши заметки',
    en: '',
    uz: 'Қайдларингиз'
  },

  input_feedback_response_message: {
    ru: 'Добавить заметки к запросу',
    en: '',
    uz: 'Сўровга қайд қўшиш'
  }
}

export default locales

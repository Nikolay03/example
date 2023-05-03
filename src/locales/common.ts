import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  // Buttons
  button_see_more: {
    ru: 'Смотреть все',
    en: 'View all',
    uz: 'Ҳаммасини кўриш'
  },
  button_learn_more: {
    ru: 'Узнать подробнее',
    en: 'Learn more',
    uz: 'Батафсил билиш'
  },
  button_more_details: {
    ru: 'Подробнее',
    en: 'More details',
    uz: 'Батафсил'
  },
  button_more_stat: {
    ru: 'Показать подробную статистику',
    en: 'More details',
    uz: 'Батафсил статистикани кўрсатиш'
  },
  button_send: {
    ru: 'Отправить',
    en: 'Send',
    uz: 'Юбориш'
  },
  button_sign_in: {
    ru: 'Войти в аккаунт',
    en: 'Log in',
    uz: 'Аккаунтга кириш'
  },
  button_log_out: {
    ru: 'Выйти',
    en: 'Log out',
    uz: 'Чиқиш'
  },
  button_user_account: {
    ru: 'Мой аккаунт',
    en: 'My account',
    uz: 'Менинг аккаунтим'
  },
  button_upload_file: {
    ru: 'Загрузить файл',
    en: 'Upload file',
    uz: 'Файл юклаш'
  },
  button_upload_file_loading: {
    ru: 'Идет загрузка... %(progress)s',
    en: 'Uploading... %(progress)s',
    uz: 'Юкланмоқда... %(progress)s'
  },
  button_remove_file: {
    ru: 'Удалить',
    en: 'Remove',
    uz: 'Ўчириш'
  },
  button_back: {
    ru: 'Назад',
    en: 'Back',
    uz: 'Қайтиш'
  },
  button_continue: {
    ru: 'Продолжить',
    en: 'Continue',
    uz: 'Давом этиш'
  },
  button_confirm: {
    ru: 'Подтвердить',
    en: 'Confirm',
    uz: 'Тасдиқлаш'
  },
  button_cancel: {
    ru: 'Отменить',
    en: 'Cancel',
    uz: 'Бекор қилиш'
  },
  button_send_code: {
    ru: 'Отправить код',
    en: 'Send code',
    uz: 'Кодни юбориш'
  },
  button_save: {
    ru: 'Сохранить',
    en: 'Save',
    uz: 'Сақлаш'
  },
  button_understood: {
    ru: 'Понятно',
    en: 'Understood',
    uz: 'Тушунарли'
  },
  button_edit: {
    ru: 'Редактировать',
    en: 'Edit',
    uz: 'Таҳрир қилиш'
  },

  // Inputs & etc.
  select_default_placeholder: {
    ru: 'Выберите...',
    en: 'Select...',
    uz: 'Танланг...'
  },
  select_not_found_message: {
    ru: 'Не найдено',
    en: 'No options',
    uz: 'Топилмади'
  },
  select_not_found_message_with_text: {
    ru: 'Не найдено "%(text)s"',
    en: 'No options for "%(text)s"',
    uz: '"%(text)s" топилмади'
  },
  select_loading_message: {
    ru: 'Загрузка...',
    en: 'Loading...',
    uz: 'Юкланмоқда...'
  },

  field_error_required: {
    ru: 'Обязательное поле',
    en: 'Required field',
    uz: 'Майдонни тўлдириш мажбурий '
  },
  field_error_invalid_email: {
    ru: 'Неверный адрес эл. почты',
    en: 'Invalid email pattern',
    uz: 'Эл. почта манзили нотўғри'
  },
  field_error_password_min_length: {
    ru: 'Пароль должен состоять не менее чем из %(minLength)s символов',
    en: 'Password should have at least %(minLength)s characters',
    uz: 'Парол камида %(minLength)s та белгидан кам бўлмаслиги керак'
  },
  field_error_password_chars_validate: {
    ru: 'Пароль должен содержать прописные, строчные и числовые значения',
    en: 'Password should contain uppercase, lowercase and numeric values',
    uz: 'Парол бош ҳарф, кичик ҳарф ва рақамдан иборат бўлиши керак'
  },
  field_error_password_confirm: {
    ru: 'Пароли не совпадают',
    en: '',
    uz: 'Пароллар мос келмади'
  },
  field_error_invalid_phone: {
    ru: 'Неверный формат номера',
    en: 'Invalid phone number',
    uz: 'Телефон рақам формати нотўғри'
  },
  field_error_invalid_url: {
    ru: 'Неверный формат URL',
    en: 'Invalid URL format',
    uz: 'URL формати нотўғри'
  },
  field_error_end_date: {
    ru: 'Конечная дата должна быть больше начальной',
    en: 'The end date must be greater than the start date',
    uz: 'Якуний сана бошланиш санасидан катта бўлиши керак'
  },
  country_none_text: {
    ru: 'Страну',
    en: 'Country',
    uz: 'Давлат'
  },
  supermarket_none_text: {
    ru: 'супермаркет',
    en: 'super market',
    uz: 'супермаркет'
  },
  product_none_text: {
    ru: 'Продукт',
    en: 'Product',
    uz: 'Маҳсулот'
  },
  table_no_data: {
    ru: 'Нет данных',
    en: 'No data',
    uz: 'Маълумотлар йўқ'
  },

  // Misc
  common_file_size: {
    ru: 'Размер файла',
    en: 'File size',
    uz: 'Файл хажми'
  }
}

export default locales

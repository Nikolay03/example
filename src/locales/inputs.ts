import * as ENUMS from '~/types/enums'
import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  input_first_name_label: {
    ru: 'Имя',
    en: 'Name',
    uz: 'Исм'
  },
  input_last_name_label: {
    ru: 'Фамилия',
    en: '',
    uz: 'Фамилия'
  },
  input_patronymic_name_label: {
    ru: 'Отчество',
    en: '',
    uz: 'Отасининг исми'
  },
  input_full_name_label: {
    ru: 'Ф.И.О.',
    en: 'Full Name',
    uz: 'Ф.И.О.'
  },
  input_email_label: {
    ru: 'Email',
    en: 'Email',
    uz: 'Email'
  },
  input_phone_label: {
    ru: 'Номер телефона',
    en: 'Phone number',
    uz: 'Телефон рақами'
  },
  input_email_subject_label: {
    ru: 'Тема',
    en: 'Subject',
    uz: 'Мавзу'
  },
  input_login_email_label: {
    ru: 'Номер телефона / Email',
    en: '',
    uz: 'Телефон рақами / Email'
  },
  input_password_label: {
    ru: 'Пароль',
    en: 'Password',
    uz: 'Пароль'
  },
  input_new_password_label: {
    ru: 'Новый пароль',
    en: 'New password',
    uz: 'Янги пароль'
  },
  input_email_placeholder: {
    ru: 'Напишите Email',
    en: 'Enter your email',
    uz: 'Emailни киритинг'
  },
  input_confirm_password_label: {
    ru: 'Подтвердите пароль',
    en: 'Confirm password',
    uz: 'Паролни тасдиқланг'
  },
  input_message_label: {
    ru: 'Сообщение',
    en: '',
    uz: 'Хабар'
  },
  input_company_address_label: {
    ru: 'Адрес',
    en: 'Address',
    uz: 'Манзил'
  },

  // Filter inputs
  input_search_label: {
    ru: 'Поиск',
    en: 'Search',
    uz: 'Излаш'
  },
  input_search_placeholder: {
    ru: 'Введите необходимые ключевые слова для поиска',
    en: 'Enter required keywords for search',
    uz: 'Керакли қидирув калит сўзларини киритинг'
  },
  input_price_label: {
    ru: 'Цена UZS',
    en: '',
    uz: 'Нархи UZS'
  },
  input_sales_volume_label: {
    ru: 'Объем продаж',
    en: '',
    uz: 'Савдо ҳажми'
  },
  input_incoterms_label: {
    ru: 'Поставка Incoterms',
    en: '',
    uz: 'Incoterms етказиб бериш'
  },
  input_products_from_label: {
    ru: 'Товары от',
    en: '',
    uz: 'дан маҳсулотлар'
  },
  input_origin_country_label: {
    ru: 'Страна происхождения',
    en: '',
    uz: 'Келиб чиқиш мамлакати'
  },
  input_product_culture_label: {
    ru: 'Тип культуры',
    en: '',
    uz: 'Экин тури'
  },
  input_product_species_label: {
    ru: 'Вид',
    en: '',
    uz: 'Тур'
  },
  input_product_variety_label: {
    ru: 'Сорт',
    en: '',
    uz: 'Нав'
  },
  input_product_location_label: {
    ru: 'Местонахождение товара',
    en: '',
    uz: 'Маҳсулот жойлашган манзил'
  },
  input_location_country_placeholder: {
    ru: 'Выберите страну',
    en: '',
    uz: 'Мамлакатни танланг'
  },
  input_location_region_placeholder: {
    ru: 'Выберите регион',
    en: '',
    uz: 'Ҳудудни танланг'
  },
  input_location_district_placeholder: {
    ru: 'Выберите район',
    en: '',
    uz: 'Туманни танланг'
  },

  // Registration inputs
  input_user_type_label: {
    ru: 'Тип пользователя',
    en: '',
    uz: 'Фойдаланувчи'
  },
  input_position_label: {
    ru: 'Должность',
    en: '',
    uz: 'Лавозими'
  },
  input_phone_number_note: {
    ru: 'Примечание: Этот номер будет использоваться для работы с порталом',
    en: '',
    uz: 'Эслатма: Ушбу рақамдан портал билан ишлашда фойдаланилади'
  },
  input_contact_number_label: {
    ru: 'Контактный номер',
    en: '',
    uz: 'Боғланиш учун телефон рақами'
  },
  input_contact_number_note: {
    ru: 'Примечание: Это дополнительный номер для контактов',
    en: '',
    uz: 'Эслатма: Бу боғланиш учун қўшимча рақам'
  },
  input_confirmation_code_label: {
    ru: 'Код подтверждения',
    en: '',
    uz: 'Тасдиқлаш коди'
  },
  input_login_label: {
    ru: 'Email (логин)',
    en: '',
    uz: 'Email (логин)'
  },
  input_etp_password_label: {
    ru: 'ETP пароль',
    en: '',
    uz: 'ETP пароль'
  },
  input_etp_password_note: {
    ru: 'Примечание: Не менее 8 знаков, должен содержать в себе как минимум по одной: буква, заглавная буква, цифра.',
    en: '',
    uz: 'Эслатма: 8 та белгидан кам эмас, камида биттадан: ҳарф, бош ҳарф, рақам бўлиши керак'
  },
  input_inn_label: {
    ru: 'ИНН',
    en: '',
    uz: 'СТИР'
  },
  input_company_name_label: {
    ru: 'Название компании',
    en: '',
    uz: 'Компаниянинг номланиши'
  },
  input_company_type_label: {
    ru: 'Тип компании',
    en: '',
    uz: 'Компания тури'
  },
  input_company_description_label: {
    ru: 'О компании',
    en: '',
    uz: 'Компания ҳақида'
  },
  input_website_label: {
    ru: 'Сайт',
    en: '',
    uz: 'Сайт'
  },
  input_country_label: {
    ru: 'Страна',
    en: '',
    uz: 'Мамлакат'
  },
  input_region_label: {
    ru: 'Регион',
    en: '',
    uz: 'Ҳудуд'
  },
  input_product_group_search_label: {
    ru: 'Выберите группы товаров по интересам ниже или воспользуйтесь поиском по наименованию',
    en: '',
    uz: 'Қизиқишларингиз бўйича қуйидаги маҳсулот гуруҳларини танланг ёки ном бўйича излашдан фойдаланинғ'
  },
  input_product_group_search_placeholder: {
    ru: 'Поиск по наименованию',
    en: '',
    uz: 'Номланиш бўйича излаш'
  },

  // Accreditation inputs
  input_passport_individual_label: {
    ru: 'Паспорт',
    en: '',
    uz: 'Паспорт'
  },
  input_passport_entity_label: {
    ru: 'Паспорт генерального директора',
    en: '',
    uz: 'Бош директор паспорти'
  },
  input_inn_individual_label: {
    ru: 'ИНН физического лица',
    en: '',
    uz: 'Жисмоний шахснинг СТИРи'
  },
  input_inn_entity_label: {
    ru: 'ИНН фирмы',
    en: '',
    uz: 'Фирма СТИРи'
  },

  // Trades create inputs (step 1)
  input_trades_kind_label: {
    ru: 'Конкурс/Аукцион',
    en: '',
    uz: 'Танлов/Аукцион'
  },
  input_trades_position_label: {
    ru: 'На повышение/На понижение',
    en: '',
    uz: 'Юқорилаш/Пастлаш'
  },
  input_trades_type_label: {
    ru: 'Тип торгов',
    en: '',
    uz: 'Савдо тури'
  },
  input_trades_start_date_label: {
    ru: 'Дата и время начала торгов',
    en: '',
    uz: 'Савдоларнинг бошланиш санаси ва вақти'
  },
  input_trades_end_date_label: {
    ru: 'Дата и время завершения торгов',
    en: '',
    uz: 'Савдоларнинг тугалланиш санаси ва вақти'
  },
  input_statistics_start_date_label: {
    ru: 'Начало периода',
    en: '',
    uz: 'Даврнинг бошланиши'
  },
  input_statistics_end_date_label: {
    ru: 'Конец периода',
    en: '',
    uz: 'Даврнинг якуни'
  },
  input_statistics_second_start_date_label: {
    ru: 'Начало второго периода ',
    en: '',
    uz: 'Иккинчи даврнинг бошланиши'
  },
  input_statistics_second_end_date_label: {
    ru: 'Конец второго периода',
    en: '',
    uz: 'Иккинчи даврнинг якуни'
  },
  input_statistics_period_label: {
    ru: 'Период',
    en: '',
    uz: 'Давр'
  },
  input_trades_privacy_label: {
    ru: 'Тип торгов по возможности участия',
    en: '',
    uz: 'Иштирок этиш имконияга кўра савдо тури'
  },
  input_trades_participants_visibility_label: {
    ru: 'Участники видят',
    en: '',
    uz: 'Иштирокчилар кўради'
  },
  input_trades_participants_label: {
    ru: 'Добавьте участников для закрытых торгов',
    en: '',
    uz: 'Ёпиқ савдолар учун иштирокчиларни қўшинг'
  },
  input_trades_participants_placeholder: {
    ru: 'Начните писать имя/фамилию',
    en: '',
    uz: 'Исм/фамилия ёзишни бошланг'
  },
  input_trades_vat_label: {
    ru: 'НДС',
    en: '',
    uz: 'ҚҚС'
  },
  input_trades_vat_included_label: {
    ru: 'НДС включен в цену',
    en: '',
    uz: 'ҚҚС нархга киритилган'
  },
  input_trades_responsible_person_label: {
    ru: 'Ответственное контактное лицо',
    en: '',
    uz: 'Боғланиш учун масъул'
  },
  // Trades create inputs (step 2) type = purchase
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_terms_label`]: {
    ru: 'Условия закупки и оплаты',
    en: '',
    uz: 'Харид қилиш ва тўлаш шартлари'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_start_date_label`]: {
    ru: 'Дата начала поставки',
    en: '',
    uz: 'Етказиб беришнинг бошланиш санаси'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_end_date_label`]: {
    ru: 'Дата окончания поставки',
    en: '',
    uz: 'Етказиб бериш тугалланадиган сана'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_country_label`]: {
    ru: 'Страна поставки',
    en: '',
    uz: 'Етказиб бериш мамлакати'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_region_label`]: {
    ru: 'Регион поставки',
    en: '',
    uz: 'Етказиб бериш ҳудуди'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_district_label`]: {
    ru: 'Район поставки',
    en: '',
    uz: 'Етказиб бериш тумани'
  },
  [`input_trades_${ENUMS.TradeTypes.PURCHASE}_transfer_address_label`]: {
    ru: 'Адрес поставки',
    en: '',
    uz: 'Етказиб бериш манзили'
  },
  // Trades create inputs (step 2) type = sale
  [`input_trades_${ENUMS.TradeTypes.SALE}_terms_label`]: {
    ru: 'Условия отгрузки и оплаты',
    en: '',
    uz: 'Юклаб жўнатиш ва тўлов шартлари'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_start_date_label`]: {
    ru: 'Дата начала отгрузки',
    en: '',
    uz: 'Юклаб жўнатиш бошланиш санаси'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_end_date_label`]: {
    ru: 'Дата окончания отгрузки',
    en: '',
    uz: 'Юклаб жўнатиш тугаш санаси'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_country_label`]: {
    ru: 'Страна отгрузки',
    en: '',
    uz: 'Юклаб жўнатиладиган мамлакат'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_region_label`]: {
    ru: 'Регион отгрузки',
    en: '',
    uz: 'Юклаб жўнатиладиган ҳудуд'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_district_label`]: {
    ru: 'Район отгрузки',
    en: '',
    uz: 'Юклаб жўнатиладиган туман'
  },
  [`input_trades_${ENUMS.TradeTypes.SALE}_transfer_address_label`]: {
    ru: 'Адрес отгрузки',
    en: '',
    uz: 'Жўнатиладиган манзил'
  },
  // Trades create inputs (step 2) geo
  input_trades_transfer_geo: {
    ru: 'Выбор геолокации',
    en: 'Select geolocation',
    uz: 'Географик жойлашувни танланг'
  },
  // Trades create inputs (step 3)
  input_trades_product_group_label: {
    ru: 'Товарная группа',
    en: '',
    uz: 'Маҳсулот гуруҳи'
  },
  input_trades_producing_country_label: {
    ru: 'Страна производитель',
    en: '',
    uz: 'Ишлаб чиқарувчи мамлакат'
  },
  input_trades_quality_standard: {
    ru: 'Стандарт качества',
    en: '',
    uz: 'Сифат стандарти'
  },
  input_trades_product_attributes_label: {
    ru: 'Дополнительные параметры товара',
    en: '',
    uz: 'Товарнинг қўшимча параметрлари'
  },
  input_trades_product_volume_label: {
    ru: 'Объем',
    en: '',
    uz: 'Ҳажм'
  },
  input_trades_product_description_label: {
    ru: 'Описание товара',
    en: '',
    uz: 'Маҳсулот таснифи'
  },
  input_trades_product_price_label: {
    ru: 'Начальная цена за единицу измерения',
    en: '',
    uz: 'Ўлчов бирилиги учун бошланғич нарх'
  },
  input_trades_currency_label: {
    ru: 'Валюта',
    en: '',
    uz: 'Валюта'
  },
  input_trades_product_documents_label: {
    ru: 'Документы',
    en: '',
    uz: 'Ҳужжатлар'
  },
  input_trades_product_images_label: {
    ru: 'Фотографии',
    en: '',
    uz: 'Фотосуратлар'
  },

  // Trades participate
  input_trades_participate_document_label: {
    ru: 'Документ',
    en: '',
    uz: 'Ҳужжат'
  },
  input_trades_participate_proposed_amount_label: {
    ru: 'Предлагаемая сумма',
    en: '',
    uz: 'Таклиф этилаётган сумма'
  },
  input_trades_participate_description_label: {
    ru: 'Описание',
    en: '',
    uz: 'Тасниф'
  },

  // Trades review
  input_trades_review_organizer_rating_label: {
    ru: 'Оцените огранизатора',
    en: '',
    uz: 'Ташкилотчиларга баҳо беринг'
  },
  input_trades_review_winner_rating_label: {
    ru: 'Оцените победителя',
    en: '',
    uz: 'Ғолибни танланг'
  },
  input_trades_review_comment_label: {
    ru: 'Комментарии',
    en: '',
    uz: 'Фикр-мулоҳазалар'
  },

  // Trades upload contract
  input_trades_contract_label: {
    ru: 'Договор (PDF)',
    en: '',
    uz: 'Шартнома (PDF)'
  },

  // Balance top up
  input_balance_top_up_amount: {
    ru: 'Введите сумму (UZS)',
    en: '',
    uz: 'Суммани киритинг (UZS)'
  }
}

export default locales

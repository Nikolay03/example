/* eslint-disable max-len */
import inputs from './inputs'

import { TLocaleObject } from '~/types/locales'
import * as ENUMS from '~/types/enums'

const locales: TLocaleObject = {
  trades_detail_page_title: {
    ru: 'Детали торгов',
    en: '',
    uz: 'Савдолар тафсилотлари'
  },
  trades_detail_id: {
    ru: 'Торги №%(id)s',
    en: 'Trades #%(id)s',
    uz: 'Савдолар'
  },
  trades_detail_time_left: {
    ru: 'осталось: %(timeLeft)s',
    en: '%(timeLeft)s left',
    uz: 'қолди: %(timeLeft)s left'
  },
  trades_detail_kind_label: {
    ...inputs.input_trades_kind_label
  },
  trades_detail_position_label: {
    ...inputs.input_trades_position_label
  },
  trades_detail_type_label: {
    ...inputs.input_trades_type_label
  },
  trades_detail_geolocation_label: {
    ru: 'Геолокация',
    en: 'Geolocation',
    uz: 'Географик жойлашув'
  },
  trades_detail_show_map_label: {
    ru: 'Показать на карте',
    en: 'Show on map',
    uz: 'Харитада кўрсатиш'
  },
  trades_detail_winner_label: {
    ru: 'Победитель',
    en: '',
    uz: 'Ғолиб'
  },
  trades_detail_start_date_label: {
    ru: 'Начало',
    en: '',
    uz: 'Боши'
  },
  trades_detail_end_date_label: {
    ru: 'Завершение',
    en: '',
    uz: 'Охири'
  },
  trades_detail_privacy_label: {
    ru: 'Участие',
    en: '',
    uz: 'Иштирок этиш'
  },
  trades_detail_visibility_label: {
    ...inputs.input_trades_participants_visibility_label
  },
  trades_detail_vat_label: {
    ...inputs.input_trades_vat_label
  },
  trades_detail_vat_is_included_label: {
    ru: '(включен в цену)',
    en: '',
    uz: '(нархга киритилган)'
  },
  trades_detail_vat_is_not_included_label: {
    ru: '(не включен в цену)',
    en: '',
    uz: '(нархга киритилмаган)'
  },
  trades_detail_contact_person_label: {
    ru: 'Контактное лицо',
    en: '',
    uz: 'Боғланиш учун шахс'
  },
  trades_detail_producing_country_label: {
    ...inputs.input_trades_producing_country_label
  },
  trades_detail_producing_quality_standard_label: {
    ...inputs.input_trades_quality_standard
  },
  trades_detail_product_price_label: {
    ru: 'Начальная цена за <strong>%(measurementShort)s</strong> (%(measurementLong)s)',
    en: '',
    uz: '<strong>%(measurementShort)s</strong> (%(measurementLong)s) учун бошланғич нарх'
  },
  trades_detail_product_volume_label: {
    ...inputs.input_trades_product_volume_label
  },
  trades_detail_product_attributes_label: {
    ...inputs.input_trades_product_attributes_label
  },
  trades_detail_product_images_label: {
    ru: 'Фотографии товара',
    en: '',
    uz: 'Маҳсулот фотосурати'
  },
  trades_detail_product_documents_label: {
    ru: 'Документы, добавленные организатором к торгу/конкурсу',
    en: '',
    uz: 'Ташкилотчи томонидан савдога/танловга қўшилган ҳужжатлар'
  },
  trades_detail_contract_templates: {
    ru: 'Шаблоны договоров',
    en: 'Contract templates',
    uz: 'Шартнома шакллари'
  },

  trades_participants_title: {
    ru: 'Участники',
    en: 'Participants',
    uz: 'Иштирокчилар'
  },
  trades_participants_th_name: {
    ru: 'Участник',
    en: '',
    uz: 'Иштирокчи'
  },
  trades_participants_th_rating: {
    ru: 'Рейтинг',
    en: '',
    uz: 'Рейтинг'
  },
  trades_participants_th_bet: {
    ru: 'Ставка',
    en: '',
    uz: 'Ставка'
  },
  trades_participants_th_total: {
    ru: 'Сумма',
    en: '',
    uz: 'Сумма'
  },
  trades_participants_th_proposal: {
    ru: 'Предложение',
    en: '',
    uz: 'Таклиф'
  },
  trades_participants_extra_info: {
    ru: 'Доп. информация',
    en: '',
    uz: 'Қўшимча маълумот'
  },
  trades_participants_th_description: {
    ...inputs.input_trades_participate_description_label
  },
  trades_participants_download_doc_button: {
    ru: 'Скачать документ',
    en: '',
    uz: 'Ҳужжатни юклаб олиш'
  },
  trades_participate_button: {
    ru: 'Принять участие в торгах',
    en: '',
    uz: 'Савдоларда иштирок этиш'
  },
  trades_participate_auction_modal_title: {
    ru: 'Участвовать в аукционе',
    en: '',
    uz: 'Аукционда қатнашиш'
  },
  trades_participate_competition_modal_title: {
    ru: 'Участвовать в конкурсе',
    en: '',
    uz: 'Танловда қатнашиш'
  },
  trades_participate_auction_modal_description: {
    ru: 'Для того чтобы участвовать в аукционе, введите свое предложение.',
    en: '',
    uz: 'Аукционда қатнашиш учун ўз таклифингизни киритинг'
  },
  [`trades_participate_auction_${ENUMS.TradePositions.UP}_modal_description_hint`]: {
    ru: 'Ставка должна быть <span>не меньше %(price)s.</span>',
    en: '',
    uz: 'Ставка %(price)s.</span>дан кам бўлмаслиги керак <span>'
  },
  [`trades_participate_auction_${ENUMS.TradePositions.DOWN}_modal_description_hint`]: {
    ru: 'Ставка должна быть <span>не больше %(price)s.</span>',
    en: '',
    uz: 'Ставка %(price)s.</span>дан кўп бўлмаслиги керак <span>'
  },
  trades_participate_competition_modal_description: {
    ru: 'Для участия в конкурсе введите предлагаемую вами цену и добавьте описание вашего предложения. Также, если необходимо, вы можете прикрепить  документ (Гувохному, паспорт, сертификат). <span>Предложение организатора: %(price)s</span>',
    en: '',
    uz: 'Танловда қатнашиш учун таклиф қилинаётган нархни киритинг ва таклифингиз тавсифини танифланг. Бундан ташқари, агар керак бўлса, ҳужжатни (Гувохнома, паспорт, сертификат) илова қилишингиз мумкин. <span>Ташкилотчи таклифи %(price)s</span>'
  },
  trades_participate_competition_button: {
    ru: 'Принять участие',
    en: '',
    uz: 'Иштирок этиш'
  },
  trades_participate_success_title: {
    ru: 'Отправлено',
    en: '',
    uz: 'Юборилди'
  },
  trades_participate_success_message: {
    ru: 'Вы отправили запрос на участие',
    en: '',
    uz: 'Сиз иштирок этиш учун сўров юбордингиз'
  },
  trades_upload_contract: {
    ru: 'Загрузить договор',
    en: '',
    uz: 'Шартномани юклаб олиш'
  },
  trades_download_contract: {
    ru: 'Скачать договор',
    en: '',
    uz: 'Шартномани юклаб олиш'
  },
  trades_upload_contract_success_title: {
    ru: 'Загружено',
    en: '',
    uz: 'Юкланди'
  },
  trades_upload_contract_success_message: {
    ru: 'Договор загружен',
    en: '',
    uz: 'Шартнома юкланди'
  },

  trades_other_title: {
    ru: 'Другие торги по товарной группе "%(productName)s"',
    en: '',
    uz: 'Товар гуруҳи бўйича бошқа товарлар "%(productName)s"'
  },

  trades_participate_deny_modal_title: {
    ru: 'Пройдите аккредитацию',
    en: '',
    uz: 'Аккредитациядан ўтинг'
  },
  trades_participate_deny_modal_description: {
    ru: 'Участвовать в торгах могут только аккредитованные пользователи. Чтобы пройти аккредитацию вам необходимо подать заявку на аккредитацию',
    en: '',
    uz: 'Савдоларда фақат аккредитациядан ўтган фойдаланувчилар иштирок этиши мумкин. Аккредитациядан ўтиш учун ариза топширишингиз зарур'
  },
  trades_participate_deny_modal_button: {
    ru: 'Подать заявку',
    en: '',
    uz: 'Ариза топшириш'
  }
}

export default locales

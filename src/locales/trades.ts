/* eslint-disable max-len */
import tradesCreate from './tradesCreate'
import tradesDetail from './tradesDetail'
import tradesReview from './tradesReview'

import { TradeStatuses } from '~/types/enums'
import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  ...tradesCreate,
  ...tradesDetail,
  ...tradesReview,

  trades_page_title: {
    ru: 'Все торги',
    en: '',
    uz: 'Барча савдолар'
  },

  trades_table_search_placeholder: {
    ru: 'Поиск по товару, компании',
    en: '',
    uz: 'Маҳсулот, компаниялар бўйича излаш'
  },

  // Table headings
  trades_table_th_id: {
    ru: 'ID',
    en: '',
    uz: 'ID'
  },
  trades_table_th_trade_kind: {
    ru: 'Тип торгов',
    en: '',
    uz: 'Савдо тури'
  },
  trades_table_th_organizer: {
    ru: 'Организатор',
    en: '',
    uz: 'Ташкилотчи'
  },
  trades_table_th_rating: {
    ru: 'Рейтинг',
    en: '',
    uz: 'Рейтинг'
  },
  trades_table_th_product: {
    ru: 'Товар',
    en: '',
    uz: 'Маҳсулот'
  },
  trades_table_th_volume: {
    ru: 'Объем',
    en: '',
    uz: 'Хажм'
  },
  trades_table_th_region: {
    ru: 'Регион',
    en: '',
    uz: 'Ҳудуд'
  },
  trades_table_th_end_date: {
    ru: 'Завершение',
    en: '',
    uz: 'Тугаллаш'
  },
  trades_table_th_status: {
    ru: 'Статус',
    en: '',
    uz: 'Мақом'
  },
  trades_table_th_action: {
    ru: 'Действие',
    en: '',
    uz: 'Ҳаракат'
  },
  trades_table_th_status_action: {
    ru: 'Статус / Действие',
    en: '',
    uz: 'Мақом / Ҳаракат'
  },

  // Misc
  [`trades_table_status_${TradeStatuses.ACTIVE}`]: {
    ru: 'Актив',
    en: '',
    uz: 'Актив'
  },
  [`trades_table_status_${TradeStatuses.CLOSED}`]: {
    ru: 'Завершен',
    en: '',
    uz: 'Тугалланди'
  },
  [`trades_table_status_${TradeStatuses.CANCELED}`]: {
    ru: 'Отменен',
    en: '',
    uz: 'Бекор қилинди'
  },
  [`trades_table_status_${TradeStatuses.DRAFT}`]: {
    ru: 'Черновик',
    en: '',
    uz: 'Қоралама'
  },
  trades_table_participate_button: {
    ru: 'Участвовать',
    en: '',
    uz: 'Иштирок этиш'
  },
  trades_table_view_button: {
    ru: 'Посмотреть',
    en: '',
    uz: 'Кўриш'
  },
  trades_table_filter_active: {
    ru: 'Текущие',
    en: '',
    uz: 'Жорий'
  },
  trades_table_filter_closed: {
    ru: 'Завершенные',
    en: '',
    uz: 'Тугаллаш'
  },

  // Account trades
  trades_tab_organizer: {
    ru: 'Организатор',
    en: '',
    uz: 'Ташкилотчи'
  },
  trades_tab_participant: {
    ru: 'Участвую',
    en: '',
    uz: 'Қатнашаман'
  },
  trades_tab_invited: {
    ru: 'Приглашен',
    en: '',
    uz: 'Таклиф этилди'
  },
  trades_tab_draft: {
    ru: 'Черновики',
    en: '',
    uz: 'Қораламалар'
  },
  trades_tab_favourite: {
    ru: 'Избранное',
    en: '',
    uz: 'Танланган'
  },

  // Choose winner
  trades_choose_winner_page_title: {
    ru: 'Выбор победителя',
    en: '',
    uz: 'Ғолибни танлаш'
  },
  trades_choose_winner_button: {
    ru: 'Выбрать',
    en: '',
    uz: 'Танлаш'
  },
  trades_choose_winner_modal_title: {
    ru: 'Вы действительно хотите выбрать данного участника как победителя?',
    en: '',
    uz: 'Ушбу иштирокчини ҳақиқатан ҳам ғолиб сифатида танламоқчимисиз?'
  },
  trades_choose_winner_modal_description: {
    ru: 'После нажатия на кнопку “Подтвердить”, Вы не сможете изменить свой выбор',
    en: '',
    uz: '“Тасдиқлаш тугмаси босилганидан кейин ўз танловингизни ўзгартира олмайсиз”'
  },
  trades_choose_winner_success_title: {
    ru: 'Победитель выбран',
    en: '',
    uz: 'Ғолиб танланди'
  },
  trades_choose_winner_success_message: {
    ru: '%(winner)s - победитель торга №%(tradeId)s',
    en: '',
    uz: '№%(tradeId)s савдоси ғолиби - %(winner)s'
  },
  trades_choose_winner_no_data: {
    ru: 'На Ваше предложение не поступило заявок, рекомендуем снизить цену или разместить предложение на более длительный срок',
    en: '',
    uz: 'Таклифингиз бўйича аризалар олинмади, нархни пасайтириш ёки таклифни узоқроқ муддатга жойлаштиришни тавсия қиламиз'
  },

  trades_count_variant_1_text: {
    ru: 'товар',
    en: 'product',
    uz: 'маҳсулот'
  },
  trades_count_variant_2_text: {
    ru: 'товара',
    en: 'products',
    uz: 'маҳсулотлар'
  },
  trades_count_variant_3_text: {
    ru: 'товаров',
    en: 'products',
    uz: 'маҳсулотлар'
  }
}

export default locales

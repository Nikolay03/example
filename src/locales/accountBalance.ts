import { InvoiceStatuses } from '~/types/enums'
import { TLocaleObject } from '~/types/locales'

const locales: TLocaleObject = {
  account_balance_title: {
    ru: 'Общий баланс',
    en: '',
    uz: 'Умумий баланс'
  },

  account_balance_top_up_short: {
    ru: 'Пополнить',
    en: '',
    uz: 'Тўлдириш'
  },
  account_balance_top_up: {
    ru: 'Пополнить баланс',
    en: '',
    uz: 'Балансни тўлдириш'
  },
  account_balance_top_up_description: {
    ru: 'Пополните баланс для того, чтобы покупать ресурсы на портале и производить транзакции',
    en: '',
    uz: 'Порталда ресурсларни сотиб олиш ва транзакцияларни амалга ошириш учун балансингизни тўлдиринг'
  },
  account_balance_top_up_choose_type: {
    ru: 'Выберите платежную систему',
    en: '',
    uz: 'Тўлов тизимини танланг'
  },

  account_balance_tab_invoice: {
    ru: 'Счета к оплате',
    en: '',
    uz: 'Тўлов учун ҳисоблар'
  },
  account_balance_tab_transactions: {
    ru: 'Транзакции',
    en: '',
    uz: 'Транзакциялар'
  },

  // Table common
  account_balance_th_id: {
    ru: 'Номер',
    en: '',
    uz: 'Рақам'
  },
  account_balance_th_date: {
    ru: 'Дата и время',
    en: '',
    uz: 'Санаси ва вақти'
  },
  account_balance_th_action: {
    ru: 'Действие',
    en: '',
    uz: 'Ҳаракат'
  },

  // Table invoice
  account_balance_invoice_th_name: {
    ru: 'Основание',
    en: '',
    uz: 'Асос'
  },
  account_balance_invoice_th_price: {
    ru: 'Сумма',
    en: '',
    uz: 'Сумма'
  },
  account_balance_invoice_th_status: {
    ru: 'Статус',
    en: '',
    uz: 'Мақом'
  },
  [`account_balance_invoice_status_${InvoiceStatuses.PAID}`]: {
    ru: 'оплачен',
    en: '',
    uz: 'тўланди'
  },
  [`account_balance_invoice_status_${InvoiceStatuses.PENDING}`]: {
    ru: 'ожидание',
    en: '',
    uz: 'кутиш'
  },
  [`account_balance_invoice_status_${InvoiceStatuses.CANCEL}`]: {
    ru: 'отменён',
    en: '',
    uz: 'бекор қилинди'
  },
  account_balance_invoice_pay: {
    ru: 'Оплатить',
    en: '',
    uz: 'Тўлаш'
  },
  account_balance_invoice_details: {
    ru: 'Детали',
    en: '',
    uz: 'Тафсилотлар'
  },

  // Table transaction
  account_balance_trans_th_invoice_number: {
    ru: 'Номер инвойса',
    en: '',
    uz: 'Инвойс рақами'
  },
  account_balance_trans_th_detail: {
    ru: 'Детали',
    en: '',
    uz: 'Тафсилотлар'
  },
  account_balance_trans_th_accrual: {
    ru: 'Начисление',
    en: '',
    uz: 'Ҳисобга ўтказиш'
  },
  account_balance_trans_th_debit: {
    ru: 'Списание',
    en: '',
    uz: 'Ҳисобдан ечиб олиш'
  },
  account_balance_trans_th_payment_type: {
    ru: 'Способ оплаты',
    en: '',
    uz: 'Тўлов усули'
  },

  // Invoice detail
  account_balance_invoice_detail_title: {
    ru: 'Счет к оплате отменен',
    en: '',
    uz: 'Тўлов учун ҳисоб бекор қилинди'
  },
  account_balance_invoice_total_amount: {
    ru: 'Сумма счета',
    en: '',
    uz: 'Ҳисоб суммаси'
  },
  // Invoice pay
  account_balance_invoice_pay_title: {
    ru: 'Оплатить счет',
    en: '',
    uz: 'Ҳисобни тўлаш'
  },
  account_balance_invoice_pay_success_title: {
    ru: 'Оплачено',
    en: '',
    uz: 'Тўланди'
  },
  account_balance_invoice_pay_success_message: {
    ru: 'Счет оплачен',
    en: '',
    uz: 'Ҳисоб тўланди'
  },

  // Transaction detail
  account_balance_trans_detail_accrual_title: {
    ru: 'Детали начисления',
    en: '',
    uz: 'Ҳисобга ўтказиш тафсилотлари'
  },
  account_balance_trans_detail_debit_title: {
    ru: 'Детали списания',
    en: '',
    uz: 'Ҳисобдан ечиб олиш тафсилотлари'
  },
  account_balance_trans_detail_accrual_amount: {
    ru: 'Сумма начисления',
    en: '',
    uz: 'Ҳисобга ёзиладиган сумма'
  },
  account_balance_trans_detail_debit_amount: {
    ru: 'Сумма списания',
    en: '',
    uz: 'Ҳисобдан ечиладиган сумма'
  }
}

export default locales

import { TSelectListItem } from '~/types/constants'
import * as ENUMS from '~/types/enums'
import { RatingDesignations } from '~/types/enums'
import { arrayOfObjToObj, TArrayOfObjToObj } from '~/utils/array'

type UserReputationValue = {
  value: RatingDesignations
  rank: number
}

type TSplitList = {
  list: TSelectListItem[]
  object: TArrayOfObjToObj
}

export const CURRENCY_UZB = 'UZS'
export const CURRENCY_USD = 'USD'

export const DEV_HOST = 'localhost:3000'

export const USER_REPUTATIONS: {[key in string]: UserReputationValue} = {
  AAA: { value: RatingDesignations.AAA, rank: 5 },
  AA: { value: RatingDesignations.AA, rank: 4 },
  A: { value: RatingDesignations.A, rank: 3 },
  B: { value: RatingDesignations.B, rank: 2 },
  B_: { value: RatingDesignations.B_, rank: 1 },
  DEL: { value: RatingDesignations.DEL, rank: 0 }
}

const splitList = (list: TSelectListItem[]): TSplitList => ({
  list,
  object: arrayOfObjToObj(list)
})

export const RESET_PASSWORD = splitList([
  { id: ENUMS.ResetPasswordTypes.EMAIL, name: 'select_password_reset_type_list_email' },
  { id: ENUMS.ResetPasswordTypes.PHONE, name: 'select_password_reset_type_list_phone' }
])

export const USER_TYPE = splitList([
  { id: ENUMS.UserTypes.INDIVIDUAL, name: 'select_user_type_list_individual' },
  { id: ENUMS.UserTypes.ENTITY, name: 'select_user_type_list_entity' }
])

export const USER_TYPE_ALL = splitList([
  ...USER_TYPE.list,
  { id: ENUMS.UserTypes.PROVIDER, name: 'select_company_type_list_service_provider' }
])

export const COMPANY_TYPE = splitList([
  { id: 'supplier_purchaser', name: 'select_company_type_list_supplier_purchaser' },
  { id: 'service_provider', name: 'select_company_type_list_service_provider' }
])

export const TRADES_KIND = splitList([
  { id: ENUMS.TradeKinds.COMPETITION, name: 'select_trades_kind_competition' },
  { id: ENUMS.TradeKinds.AUCTION, name: 'select_trades_kind_auction' }
])

export const TRADES_POSITION = splitList([
  { id: ENUMS.TradePositions.UP, name: 'select_trades_position_up' },
  { id: ENUMS.TradePositions.DOWN, name: 'select_trades_position_down' }
])

export const TRADES_TYPE = splitList([
  { id: ENUMS.TradeTypes.SALE, name: 'select_trades_type_sale' },
  { id: ENUMS.TradeTypes.PURCHASE, name: 'select_trades_type_purchase' }
])
export const TRADES_VISIBILITY = splitList([
  { id: 'all_rates_and_users', name: 'select_trades_visibility_full' },
  { id: 'their_rates_and_result', name: 'select_trades_visibility_rates_and_result' },
  { id: 'their_rates', name: 'select_trades_visibility_rates' }
])

export const TRADES_PRIVACY = splitList([
  { id: ENUMS.TradePrivacies.PUBLIC, name: 'select_trades_privacy_public' },
  { id: ENUMS.TradePrivacies.PRIVATE, name: 'select_trades_privacy_private' }
])

export const TRADES_INCOTERMS = splitList([
  { id: 'exw', name: 'EXW' }, // ex works
  { id: 'fca', name: 'FCA' }, // free carrier
  { id: 'cpt', name: 'CPT' }, // carriage paid to
  { id: 'cip', name: 'CIP' }, // carriage and insurance paid to
  { id: 'dat', name: 'DAT' }, // delivered at terminal
  { id: 'dap', name: 'DAP' }, // delivered at place
  { id: 'ddp', name: 'DDP' } // delivered duty paid
])

export const STATISTICS_PERIOD = splitList([
  { id: ENUMS.StatisticsPeriodTypes.YEAR, name: 'select_statistics_period_year' },
  { id: ENUMS.StatisticsPeriodTypes.MONTH, name: 'select_statistics_period_month' }
])

export const STATISTICS_CATEGORY = splitList([
  { id: ENUMS.StatisticsCategoryTypes.EXPORT, name: 'select_statistics_export' },
  { id: ENUMS.StatisticsCategoryTypes.IMPORT, name: 'select_statistics_import' },
  { id: ENUMS.StatisticsCategoryTypes.SUPERMARKET, name: 'select_statistics_supermarket' },
  { id: ENUMS.StatisticsCategoryTypes.BOZOR, name: 'select_statistics_bozor' }
])

export const STATISTICS_COMPARE = splitList([
  { id: ENUMS.StatisticsCompareTypes.REGION, name: 'input_region_label' },
  { id: ENUMS.StatisticsCompareTypes.SUPERMARKETS, name: 'select_statistics_supermarket' },
  { id: ENUMS.StatisticsCompareTypes.COUNTRY, name: 'select_statistics_compare_country' },
  { id: ENUMS.StatisticsCompareTypes.PRODUCTS, name: 'select_statistics_compare_products' },
  { id: ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS, name: 'select_statistics_compare_products' },
  { id: ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS, name: 'select_statistics_compare_products' },
  { id: ENUMS.StatisticsCompareTypes.PERIOD, name: 'select_statistics_compare_period' }
])

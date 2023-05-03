interface THead {
  label: string
  name?: string
  isNumeric?: boolean
}

export default [
  { name: 'id', label: 'trades_table_th_id' },
  { name: 'commodity_group_classifier', label: 'trades_table_th_product' },
  { name: 'volume', label: 'trades_table_th_volume' },
  { name: 'delivery_region', label: 'trades_table_th_region' },
  { name: 'user__last_name', label: 'trades_table_th_organizer' },
  { name: 'user__rating', label: 'trades_table_th_rating' },
  { name: 'kind', label: 'trades_table_th_trade_kind' },
  { name: 'bargain_end_datetime', label: 'trades_table_th_end_date', isNumeric: true },
  { name: 'status', label: 'trades_table_th_status_action', isNumeric: true }
] as THead[]

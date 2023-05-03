import { useTranslate } from '~/utils/translate'
import { TStep } from '~/components/Utils/Contexts'

export default function useCreateSteps (): TStep[] {
  const { t } = useTranslate()

  return [
    {
      id: 1,
      key: 'trade_info',
      title: t('trades_create_step_trade_info')
    },
    {
      id: 2,
      key: 'transfer',
      title: t('trades_create_step_transfer')
    },
    {
      id: 3,
      key: 'product_info',
      title: t('trades_create_step_product_info')
    }
  ]
}

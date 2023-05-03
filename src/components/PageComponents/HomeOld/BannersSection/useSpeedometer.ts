import { useEffect, useState } from 'react'
import { prop } from 'ramda'

import { TRADE_STATS } from '~/constants/api'
import { CURRENCY_UZB } from '~/constants/constants'
import { TTradeStats } from '~/types/trades'
import { getNumberDeclination } from '~/utils/string'
import { useBigNumberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useDetailRequest } from '~/hooks/api'

export enum ValueKeys {
  OPEN_TRADES = 'open_trades',
  ACTIVE_COMPANIES = 'active_companies',
  SALES_SPEED = 'sales_speed',
  TRADES_VOLUME = 'trades_volume'
}

interface SpeedometerData {
  type: ValueKeys
  value: number
  recordValue: number | string
  duration: 'day'
}

interface UseSpeedometer {
  data: SpeedometerData
  title: string
  recordLabel: string
  recordValueLabel: string
  speedometerLabel: string
}

export default function useSpeedometer (): UseSpeedometer {
  const { t } = useTranslate()
  const [step, setStep] = useState(0)

  const stats = useDetailRequest<TTradeStats>(TRADE_STATS)

  const { bigNumberFormat } = useBigNumberFormat()

  const titles = {
    [ValueKeys.OPEN_TRADES]: t('speedometer_open_trades_title'),
    [ValueKeys.ACTIVE_COMPANIES]: t('speedometer_active_companies_title'),
    [ValueKeys.SALES_SPEED]: t('speedometer_sales_speed_title'),
    [ValueKeys.TRADES_VOLUME]: t('speedometer_trades_volume_title')
  }

  const recordLabels = {
    day: t('speedometer_day_record'),
    week: t('speedometer_week_record')
  }

  const recordValueLabels = value => ({
    [ValueKeys.OPEN_TRADES]: t('speedometer_open_trades_record_value', { value }),
    [ValueKeys.ACTIVE_COMPANIES]: t('speedometer_active_companies_record_value', { value }),
    [ValueKeys.SALES_SPEED]: t('speedometer_sales_speed_record_value', { value }),
    [ValueKeys.TRADES_VOLUME]: t('speedometer_trades_volume_record_value', { value })
  })

  const speedometerLabels = value => {
    const openTradesLabel = t('speedometer_open_trades_label')
    const activeCompaniesLabel = t('speedometer_active_companies_label')

    return {
      [ValueKeys.OPEN_TRADES]: getNumberDeclination(value, openTradesLabel, false),
      [ValueKeys.ACTIVE_COMPANIES]: getNumberDeclination(value, activeCompaniesLabel, false),
      [ValueKeys.SALES_SPEED]: CURRENCY_UZB,
      [ValueKeys.TRADES_VOLUME]: CURRENCY_UZB
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        const nextStep = prev + 1
        return nextStep === values.length ? 0 : nextStep
      })
    }, 7000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const statsData = stats.data
  const activeTrades = prop('activeBargains', statsData) || 0
  const activeCompanies = prop('activeCompanies', statsData) || 0
  const salesSpeed = prop('salesSpeed', statsData) || 0
  const tradingVolume = prop('tradingVolume', statsData) || 0

  const dayActiveTrades = prop('dayActiveBargains', statsData) || 0
  const dayActiveCompanies = prop('dayActiveCompanies', statsData) || 0
  const daySalesSpeed = prop('daySalesSpeed', statsData) || 0
  const dayTradingVolume = prop('dayTradingVolume', statsData) || 0

  const values: SpeedometerData[] = [
    {
      type: ValueKeys.OPEN_TRADES,
      value: activeTrades,
      recordValue: dayActiveTrades,
      duration: 'day'
    },
    {
      type: ValueKeys.ACTIVE_COMPANIES,
      value: activeCompanies,
      recordValue: dayActiveCompanies,
      duration: 'day'
    },
    {
      type: ValueKeys.SALES_SPEED,
      value: salesSpeed,
      recordValue: bigNumberFormat(daySalesSpeed),
      duration: 'day'
    },
    {
      type: ValueKeys.TRADES_VOLUME,
      value: tradingVolume,
      recordValue: bigNumberFormat(dayTradingVolume),
      duration: 'day'
    }
  ]

  const data = values[step]
  const title = titles[data.type]
  const recordLabel = recordLabels[data.duration]
  const recordValueLabel = recordValueLabels(data.recordValue)[data.type]
  const speedometerLabel = speedometerLabels(data.value)[data.type]

  return {
    data,
    title,
    recordLabel,
    recordValueLabel,
    speedometerLabel
  }
}

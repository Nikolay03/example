import { createContext, ReactElement, ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { TradesTabs } from './tradesTabs'

import * as API from '~/constants/api'
import { TAccountTrades } from '~/types/trades'
import { UseList, useList } from '~/hooks/crud'
import { TObject } from '~/types/constants'

type TTradesListContext = {
  data: UseList<TAccountTrades>
  fetchTrades: (params?: TObject) => void
}

const TradesListContext = createContext<TTradesListContext>({
  data: null,
  fetchTrades: null
})

interface Props {
  children: ReactNode
  tab: TradesTabs
}

export function TradesListProvider (props: Props): ReactElement {
  const { children, tab } = props

  const { query: { page, ordering } } = useRouter()

  const organizerList = useList<TAccountTrades>(API.USER_TRADE_LIST, null, false)
  const participantList = useList<TAccountTrades>(API.USER_TRADE_PARTICIPATE_LIST, null, false)
  const invitedList = useList<TAccountTrades>(API.USER_TRADE_PARTICIPATE_LIST, null, false)
  const draftList = useList<TAccountTrades>(API.USER_TRADE_LIST, null, false)
  const favouriteList = useList<TAccountTrades>(API.USER_TRADE_LIST, null, false)

  function fetchTrades (params?: TObject) {
    switch (tab) {
      case TradesTabs.TAB_ORGANIZER: return organizerList.getList({
        draft: false,
        ...params
      })
      case TradesTabs.TAB_PARTICIPANT: return participantList.getList({
        type: 'participating',
        ...params
      })
      case TradesTabs.TAB_INVITED: return invitedList.getList({
        type: 'invited',
        ...params
      })
      case TradesTabs.TAB_DRAFT: return draftList.getList({
        draft: true,
        ...params
      })
      case TradesTabs.TAB_FAVOURITE: return favouriteList.getList({
        onlyMyFavourites: true,
        ...params
      })
      default: return null
    }
  }

  useEffect(() => {
    fetchTrades({ page, ordering })
  }, [tab, page, ordering])

  const tabsData: {[key in TradesTabs]} = {
    [TradesTabs.TAB_ORGANIZER]: organizerList,
    [TradesTabs.TAB_PARTICIPANT]: participantList,
    [TradesTabs.TAB_INVITED]: invitedList,
    [TradesTabs.TAB_DRAFT]: draftList,
    [TradesTabs.TAB_FAVOURITE]: favouriteList
  }

  const currentTabData = tabsData[tab]

  return (
    <TradesListContext.Provider value={{ data: currentTabData, fetchTrades }}>
      {children}
    </TradesListContext.Provider>
  )
}

export function useTradesList (): TTradesListContext {
  return useContext(TradesListContext)
}

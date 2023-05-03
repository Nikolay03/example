import { createContext, ReactNode, ReactElement, useContext } from 'react'

import * as API from '~/constants/api'
import { TConfig, TCurrency, TStaticPage } from '~/types/projectConfig'
import { TUseDetailRequest, TUseRequest } from '~/types/hooks'
import { useRequest, useDetailRequest } from '~/hooks/api'

type TDataContext = {
  configData: TUseDetailRequest<TConfig>
  currencyData: TUseDetailRequest<TCurrency[]>
  footerData: {
    platformPages: TUseRequest<TStaticPage>
    helpPages: TUseRequest<TStaticPage>
  }
}

const DataContext = createContext<TDataContext>({
  configData: null,
  currencyData: null,
  footerData: {
    helpPages: null,
    platformPages: null
  }
})

interface Props {
  children: ReactNode
}

export function DataProvider (props: Props): ReactElement {
  const { children } = props

  const configData = useDetailRequest<TConfig>(API.PROJECT_CONFIG_LIST, {
    transformResponse: false
  })
  const currencyData = useDetailRequest<TCurrency[]>(API.EXCHANGE_RATE_LIST, {
    fallbackData: []
  })

  const platformPages = useRequest<TStaticPage>(API.STATIC_PAGE_LIST, {
    disableUrlParams: true,
    params: { kind: 'footer_platform' }
  })
  const helpPages = useRequest<TStaticPage>(API.STATIC_PAGE_LIST, {
    disableUrlParams: true,
    params: { kind: 'footer_help' }
  })
  const footerData = {
    platformPages,
    helpPages
  }

  const providerProps = {
    configData,
    currencyData,
    footerData
  }

  return (
    <DataContext.Provider value={providerProps}>
      {children}
    </DataContext.Provider>
  )
}

export function useETPData (): TDataContext {
  return useContext(DataContext)
}

import { createContext, Dispatch, ReactElement, ReactNode, useContext, useReducer } from 'react'

import { TObject } from '~/types/constants'

type TWizardContext = {
  state: TObject
  dispatch: Dispatch<TObject>
  isUpdate?: boolean
}

const WizardContext = createContext<TWizardContext>(null)

export function useWizard (): TWizardContext {
  return useContext(WizardContext)
}

function reducer (prevState, newValues) {
  return newValues
}

interface Props {
  children: ReactNode
  initialState?: TObject
  isUpdate?: boolean
}

export function WizardFormProvider (props: Props): ReactElement {
  const { children, initialState, isUpdate } = props

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <WizardContext.Provider value={{ state, dispatch, isUpdate }}>
      {children}
    </WizardContext.Provider>
  )
}

WizardFormProvider.defaultProps = {
  initialState: {}
}

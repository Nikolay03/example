import { createContext, useContext, useRef, ReactNode, ReactElement, RefObject } from 'react'

type TDomContext = {
  headerRef: RefObject<HTMLDivElement>
}

const DOMContext = createContext<TDomContext>({
  headerRef: null
})

interface Props {
  children: ReactNode
}

export function DOMProvider (props: Props): ReactElement {
  const { children } = props

  const headerRef = useRef<HTMLDivElement>()

  return (
    <DOMContext.Provider value={{ headerRef }}>
      {children}
    </DOMContext.Provider>
  )
}

export function useDOM (): TDomContext {
  return useContext(DOMContext)
}

import { createContext, ReactElement, ReactNode, useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import { TopUpBalanceModal } from './Modals'

import { PermissionWrapper } from '~/components/Utils'

type TAccountContext = {
  onOpenBalance: () => void
}

const AccountContext = createContext<TAccountContext>({
  onOpenBalance: () => null
})

interface Props {
  children: ReactNode
  hasPermission?: boolean
}

export function useAccount (): TAccountContext {
  return useContext(AccountContext)
}

export default function AccountWrapper (props: Props): ReactElement {
  const { children, hasPermission } = props

  const {
    isOpen: isOpenBalance,
    onOpen: onOpenBalance,
    onClose: onCloseBalance
  } = useDisclosure()

  const providerProps = {
    onOpenBalance
  }

  return (
    <PermissionWrapper hasPermission={hasPermission}>
      <AccountContext.Provider value={providerProps}>
        {children}

        <TopUpBalanceModal
          isOpen={isOpenBalance}
          onClose={onCloseBalance}
        />
      </AccountContext.Provider>
    </PermissionWrapper>
  )
}

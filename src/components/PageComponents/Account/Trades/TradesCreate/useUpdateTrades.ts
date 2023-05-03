import { useCallback, useState } from 'react'
import { is } from 'ramda'

interface UseUpdateTrades {
  updatingTrade: number | null
  isOpenUpdate: boolean
  onOpenUpdate: (id: number) => void
  onCloseUpdate: () => void
}

export default function useUpdateTrades (): UseUpdateTrades {
  const [updatingTrade, setUpdatingTrade] = useState(null)

  const isOpenUpdate = is(Number, updatingTrade)

  const onOpenUpdate = useCallback((id: number) => {
    setUpdatingTrade(id)
  }, [])

  const onCloseUpdate = useCallback(() => {
    setUpdatingTrade(null)
  }, [])

  return {
    updatingTrade,
    isOpenUpdate,
    onOpenUpdate,
    onCloseUpdate
  }
}

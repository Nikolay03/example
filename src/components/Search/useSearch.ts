import { KeyboardEvent, KeyboardEventHandler, Ref, useRef } from 'react'

type TOnSearch = (search: string) => void

interface UseSearch {
  ref: Ref<HTMLInputElement>
  onKeyPress: KeyboardEventHandler<HTMLInputElement>
  onClear: () => void
}

export default function useSearch (onSearch: TOnSearch): UseSearch {
  const ref = useRef<HTMLInputElement>()

  function onKeyPress (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && typeof onSearch === 'function') {
      const target = event.target as HTMLInputElement
      onSearch(target.value)
    }
  }

  function onClear () {
    ref.current.value = ''
    if (typeof onSearch === 'function') {
      onSearch('')
    }
  }

  return {
    ref,
    onKeyPress,
    onClear
  }
}

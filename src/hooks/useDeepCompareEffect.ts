import { useEffect, useRef } from 'react'
import equal from 'fast-deep-equal'

function useDeepCompareMemoize<T> (value: T[]) {
  const ref = useRef<T[]>()

  if (!equal(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export default function useDeepCompareEffect<T> (callback: () => void, dependencies: T[]): void {
  useEffect(callback, useDeepCompareMemoize<T>(dependencies))
}

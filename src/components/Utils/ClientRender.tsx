import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

export default function ClientRender (props: Props): ReactElement {
  const { children } = props
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <Fragment>{children}</Fragment>
    )
  }

  return null
}

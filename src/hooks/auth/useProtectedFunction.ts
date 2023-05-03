import { useRouter } from 'next/router'

import { LOGIN_URL } from '~/constants/routes'
import { useRouterQuery } from '~/hooks/url'
import { useAuth } from '~/components/AuthProvider'

type UseProtectedFunc = (...args) => void

export default function useProtectedFunction (action: UseProtectedFunc): UseProtectedFunc {
  const router = useRouter()

  const { urlQuery } = useRouterQuery()

  const { isAuth } = useAuth()

  return function (...args) {
    if (isAuth) return action(...args)

    return router.push({
      pathname: LOGIN_URL,
      query: { ...urlQuery, redirectUrl: router.asPath }
    })
  }
}

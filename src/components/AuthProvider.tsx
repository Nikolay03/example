import {
  createContext,
  Fragment,
  ReactNode,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import * as API from '~/constants/api'
import { ACCOUNT_PERSONAL_URL, LOGIN_URL, ROOT_URL } from '~/constants/routes'
import { TUser } from '~/types/user'
import { getLocale, getToken, removeToken, setToken } from '~/utils/cookies'
import transformResponse from '~/utils/transformResponse'
import { useTranslate } from '~/utils/translate'
import useFirebaseNotify from '~/hooks/useFirebaseNotify'
import { useCreate } from '~/hooks/crud'
import useToast from '~/hooks/useToast'

const api = axios.create({
  baseURL: API.getApiBaseURL(),
  transformResponse: [transformResponse]
})

function setApiHeaders (token) {
  api.defaults.headers.Authorization = `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${token}`
  api.defaults.headers['Accept-Language'] = getLocale()
}

type TAuthContext = {
  isAuth: boolean
  user: TUser
  isUserLoading: boolean
  isLoading: boolean
  logoutLoading: boolean
  onLogin: (values) => Promise<void>
  onLogout: () => Promise<void>
  onUpdateUser: (data?: Partial<TUser>) => void
  fetchUserInfo: () => Promise<void>
}

const defaultState = {
  isAuth: false,
  user: null,
  isUserLoading: false,
  isLoading: false,
  logoutLoading: false,
  onLogin: null,
  onLogout: null,
  onUpdateUser: null,
  fetchUserInfo: null
}

const AuthContext = createContext<TAuthContext>(defaultState)

interface Props {
  children: ReactNode
}

function AuthProvider (props: Props): ReactElement {
  const { children } = props

  const { t } = useTranslate()

  const { query, ...router } = useRouter()

  const toast = useToast()

  const [user, setUser] = useState<TUser>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const loginCreate = useCreate(API.LOGIN)
  const loginOneIdCreate = useCreate(API.LOGIN_WITH_ONE_ID)
  const notificationFirebase = useCreate(API.NOTIFICATION_FIREBASE)

  const { getNotifyToken } = useFirebaseNotify()

  const { redirectUrl, code } = query

  const token = getToken()

  function fetchUserInfo () {
    return api.get(API.ME)
      .then(resp => {
        const data: TUser = resp.data
        setUser(data)
      })
  }

  function subscribeNotification () {
    getNotifyToken()
      .then(firebaseToken => {
        if (firebaseToken) {
          notificationFirebase.create({
            key: firebaseToken
          })
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }

  // fetch user info on browser tab is visible
  useEffect(() => {
    const onFocus = (event) => {
      if (event.target.visibilityState === 'visible') {
        if (user) fetchUserInfo()
      }
    }

    document.addEventListener('visibilitychange', onFocus)

    return () => {
      document.removeEventListener('visibilitychange', onFocus)
    }
  }, [user?.id])

  // authorize with one id
  useEffect(() => {
    if (code) {
      setIsUserLoading(true)
      loginOneIdCreate.create({ code })
        .then(({ token }) => {
          setToken(token)
          setApiHeaders(token)
          fetchUserInfo()
            .then(() => {
              subscribeNotification()
              setIsUserLoading(false)

              router.replace(ACCOUNT_PERSONAL_URL)
            })
            .catch(({ detail }) => {
              toast({
                title: t('error_default_label'),
                description: detail,
                status: 'error'
              })
              router.replace(LOGIN_URL)
            })
        })
    }
  }, [code])

  // check if user has token & fetch info if so
  useEffect(() => {
    function loadUserFromCookies () {
      if (token) {
        setApiHeaders(token)
        fetchUserInfo()
          .then(() => {
            subscribeNotification()
            setIsUserLoading(false)
          })
          .catch(() => {
            setIsUserLoading(false)
            return onLogout()
          })
      }
      else {
        setIsUserLoading(false)
      }
    }

    loadUserFromCookies()
  }, [token])

  const onLogin = useCallback((formValues) => {
    return loginCreate.create(formValues)
      .then(({ token }: { token: string }) => {
        setApiHeaders(token)
        setToken(token)

        if (typeof redirectUrl === 'string') {
          router.replace(redirectUrl)
          return
        }
        router.replace(ACCOUNT_PERSONAL_URL)
      })
  }, [redirectUrl])

  const onLogout = useCallback(() => {
    setLogoutLoading(true)
    return api.get(API.LOGOUT)
      .then(() => {
        setLogoutLoading(false)
        removeToken()
        window.location.replace(ROOT_URL)
      })
      .catch(() => {
        setLogoutLoading(false)
      })
  }, [logoutLoading])

  const onUpdateUser = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }))
  }, [])

  const authProps = {
    isAuth: !!user,
    user,
    isUserLoading,
    isLoading: loginCreate.isLoading,
    logoutLoading,
    onLogin,
    onLogout,
    onUpdateUser,
    fetchUserInfo
  }

  return (
    <AuthContext.Provider value={authProps}>
      {code
        ? <div>Redirecting...</div>
        : (
          <Fragment>
            {children}
          </Fragment>
        )}
    </AuthContext.Provider>
  )
}

export function useAuth (): TAuthContext {
  return useContext(AuthContext)
}

export { AuthProvider }

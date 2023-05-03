import { ReactElement } from 'react'
import { Button, Flex, Tag, TagProps } from '@chakra-ui/react'
import { equals, prop, propEq } from 'ramda'
import { useRouter } from 'next/router'

import { useAccount } from './AccountWrapper'

import * as ROUTES from '~/constants/routes'
import * as ENUMS from '~/types/enums'
import { getUserReputation } from '~/utils/get'
import { useTranslate } from '~/utils/translate'
import AccountUser from '~/icons/account/AccountUser'
import AccountWallet from '~/icons/account/AccountWallet'
import AccountMailing from '~/icons/account/AccountMailing'
import AccountBriefcase from '~/icons/account/AccountBriefcase'
import AccountBell from '~/icons/account/AccountBell'
import AccountFile from '~/icons/account/AccountFile'
import AccountLock from '~/icons/account/AccountLock'
import AccountNotes from '~/icons/account/AccountNotes'
import { useAuth } from '~/components/AuthProvider'

export enum NAV_KEYS {
  ACCOUNT_PERSONAL = 'account_personal',
  ACCOUNT_BALANCE = 'account_balance',
  ACCOUNT_MAILING = 'account_mailing',
  ACCOUNT_NOTIFICATIONS = 'account_notifications',
  ACCOUNT_REPORTS = 'account_reports',
  ACCOUNT_SECURITY = 'account_security',
  ACCOUNT_TRADES = 'account_trades',
  ACCOUNT_FEEDBACKS = 'account_feedbacks',
  ACCOUNT_SERVICES = 'account_services'
}

type TAccNav = {
  key: NAV_KEYS
  href: string
  title: string | ReactElement
  icon: ReactElement
  hasPermission?: boolean
}

interface UseAccountNavigation {
  navigation: TAccNav[]
}

const CustomTag = (props: TagProps) => (
  <Tag colorScheme={'primary'} ml={3} size={'sm'} {...props} />
)

const Badge = (props: TagProps) => (
  <CustomTag borderRadius={'full'} justifyContent={'center'} px={1} {...props} />
)

export function useAccountNavigation (): UseAccountNavigation {
  const { t } = useTranslate()

  const { user } = useAuth()

  const { onOpenBalance } = useAccount()

  const iconColor = 'primary.500'

  const userType = prop('registerAs', user)
  const isRegistered = prop('isRegistered', user)
  const rating = getUserReputation(user)
  const notificationCount = prop('notificationCount', user)
  const feedbackCount = prop('feedbackCount', user)

  const userIsIndividual = equals<ENUMS.UserTypes>(ENUMS.UserTypes.INDIVIDUAL, userType)
  const userIsProvider = equals<ENUMS.UserTypes>(ENUMS.UserTypes.PROVIDER, userType)

  function onOpenFillBalance (event) {
    event.preventDefault()
    onOpenBalance()
  }

  const navigation: TAccNav[] = [
    {
      key: NAV_KEYS.ACCOUNT_PERSONAL,
      href: ROUTES.ACCOUNT_PERSONAL_URL,
      title: (
        <Flex align={'center'}>
          {t('account_nav_main')}
          <CustomTag>{rating}</CustomTag>
        </Flex>
      ),
      icon: <AccountUser color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_BALANCE,
      href: ROUTES.ACCOUNT_BALANCE_URL,
      title: userIsIndividual
        ? (
          <Flex align={'center'} justify={'space-between'} w={'full'}>
            {t('account_nav_balance')}
            <Button fontWeight={'medium'} variant={'link'} onClick={onOpenFillBalance}>
              {t('account_balance_top_up_short')}
            </Button>
          </Flex>
        )
        : t('account_nav_balance'),
      icon: <AccountWallet color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_MAILING,
      href: ROUTES.ACCOUNT_MAILING_URL,
      title: t('account_nav_mailing'),
      icon: <AccountMailing color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_NOTIFICATIONS,
      href: ROUTES.ACCOUNT_NOTIFICATIONS_URL,
      title: (
        <Flex align={'center'}>
          {t('account_nav_notifications')}
          {!!notificationCount && (
            <Badge>{notificationCount}</Badge>
          )}
        </Flex>
      ),
      icon: <AccountBell color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_REPORTS,
      href: ROUTES.ACCOUNT_REPORTS_URL,
      title: t('account_nav_reports'),
      icon: <AccountFile color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_SECURITY,
      href: ROUTES.ACCOUNT_SECURITY_URL,
      title: t('account_nav_security'),
      icon: <AccountLock color={iconColor} />,
      hasPermission: isRegistered
    },
    {
      key: NAV_KEYS.ACCOUNT_TRADES,
      href: ROUTES.ACCOUNT_TRADES_URL,
      title: t('account_nav_trades'),
      icon: <AccountNotes color={iconColor} />,
      hasPermission: true
    },
    {
      key: NAV_KEYS.ACCOUNT_FEEDBACKS,
      href: ROUTES.ACCOUNT_FEEDBACKS_URL,
      title: (
        <Flex align={'center'}>
          {t('account_nav_feedbacks')}
          {!!feedbackCount && (
            <Badge>{feedbackCount}</Badge>
          )}
        </Flex>
      ),
      icon: <AccountNotes color={iconColor} />,
      hasPermission: userIsProvider
    },
    {
      key: NAV_KEYS.ACCOUNT_SERVICES,
      href: ROUTES.ACCOUNT_SERVICES_URL,
      title: t('account_nav_services'),
      icon: <AccountBriefcase color={iconColor} />,
      hasPermission: userIsProvider
    }
  ]

  return {
    navigation
  }
}

export function useCurrentNav (): TAccNav {
  const { pathname } = useRouter()

  const { navigation } = useAccountNavigation()

  const foundNav = navigation.find(propEq('href', pathname))

  return foundNav || {} as TAccNav
}

import { Fragment, ReactNode, ReactElement } from 'react'
import { Center } from '@chakra-ui/react'

import { useAuth } from '~/components/AuthProvider'
import PageWrapper from '~/components/PageWrapper'
import { SimpleLayout } from '~/components/Layouts'
import { PageTitle } from '~/components/Titles'

interface Props {
  children: ReactNode
}

export function ProtectRoute (props: Props): ReactElement {
  const { children } = props

  const { isAuth, isUserLoading } = useAuth()

  if (!isAuth && !isUserLoading) {
    return (
      <PageWrapper title={'Access denied'}>
        <SimpleLayout>
          <PageTitle>Access denied</PageTitle>
        </SimpleLayout>
      </PageWrapper>
    )
  }

  if (isAuth) {
    return (
      <Fragment>{children}</Fragment>
    )
  }

  return (
    <PageWrapper title={'Loading'}>
      <Center>Loading...</Center>
    </PageWrapper>
  )
}

import { GetServerSidePropsContext } from 'next'

import { ROOT_URL } from '~/constants/routes'
import { redirectAuthorizedUser, TRedirectAuthUserReturn } from '~/utils/serverSide'

export { default } from './Login'

export async function getServerSideProps ({ req }: GetServerSidePropsContext): Promise<TRedirectAuthUserReturn> {
  return redirectAuthorizedUser({ req, destination: ROOT_URL })
}

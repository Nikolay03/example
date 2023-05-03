import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { TObject } from '~/types/constants'

interface RedirectAuthUserCtx {
  req: GetServerSidePropsContext['req']
  destination: string
}

export type TRedirectAuthUserReturn = GetServerSidePropsResult<TObject>

export async function redirectAuthorizedUser (ctx: RedirectAuthUserCtx): Promise<TRedirectAuthUserReturn> {
  const { req, destination } = ctx
  const token = req.cookies.token

  if (token) {
    return {
      redirect: {
        destination,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

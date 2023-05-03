import { ReactElement } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import cookie from 'cookie'

import { VERIFY_EMAIL } from '~/constants/api'
import { ROOT_URL, ACCOUNT_PERSONAL_URL } from '~/constants/routes'
import { TObject } from '~/types/constants'
import request from '~/utils/request'

export default function ActivatePage (): ReactElement {
  return <></>
}

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TObject>> {
  const { query, req, res } = ctx
  const { code } = query

  try {
    const { data: { token } } = await request({ req }).post(VERIFY_EMAIL, { code })

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    }))
  }

  catch (e) {
    return {
      redirect: {
        destination: ROOT_URL,
        permanent: true
      }
    }
  }

  return {
    redirect: {
      destination: ACCOUNT_PERSONAL_URL,
      permanent: true
    }
  }
}

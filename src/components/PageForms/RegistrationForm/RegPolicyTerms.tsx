import { Fragment, ReactElement } from 'react'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'

import { STATIC_PAGE_DETAIL_URL } from '~/constants/routes'
import { PrimaryLink } from '~/components/Link'
import { Locales } from '~/types/enums'

export default function RegPolicyTerms (): ReactElement {
  const { locale } = useRouter()

  const linkProps = {
    fontWeight: 'medium',
    isExternal: true
  }

  const privacyPolicyHref = sprintf(STATIC_PAGE_DETAIL_URL, 'policy')
  const termsOfUseHref = sprintf(STATIC_PAGE_DETAIL_URL, 'terms')

  switch (locale) {
    case Locales.EN: return (
      <Fragment>
        I agree to the platform&apos;s
        <PrimaryLink {...linkProps} href={privacyPolicyHref}> privacy policy</PrimaryLink> and
        <PrimaryLink {...linkProps} href={termsOfUseHref}> terms of use</PrimaryLink>
      </Fragment>
    )
    case Locales.UZ: return (
      <Fragment>
        Men platformaning
        <PrimaryLink {...linkProps} href={privacyPolicyHref}> maxfiylik siyosati</PrimaryLink> va
        <PrimaryLink {...linkProps} href={termsOfUseHref}> foydalanish shartlariga</PrimaryLink> roziman
      </Fragment>
    )
    default: return (
      <Fragment>
        Я соглашаюсь с
        <PrimaryLink {...linkProps} href={privacyPolicyHref}> политикой конфиденциальности</PrimaryLink> и
        <PrimaryLink {...linkProps} href={termsOfUseHref}> правилами использования</PrimaryLink> платформой
      </Fragment>
    )
  }
}

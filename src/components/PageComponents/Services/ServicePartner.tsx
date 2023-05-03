import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { sprintf } from 'sprintf-js'

import { USER_DETAIL_URL } from '~/constants/routes'
import { TServicePartner } from '~/types/services'
import { Image } from '~/components/Images'
import Link from '~/components/Link'

interface Props {
  data: TServicePartner
}

export default function ServicePartner (props: Props): ReactElement {
  const { data } = props

  const id = prop('id', data)
  const companyName = prop('companyName', data)
  const imageUrl = path<string>(['image', 'file'], data)

  const detailUrl = sprintf(USER_DETAIL_URL, id)

  return (
    <Link href={detailUrl}>
      <Image
        alt={companyName}
        src={imageUrl}

        borderColor={'gray.200'}
        borderWidth={1}
        borderRadius={'xl'}
        h={'100px'}
        p={6}
      />
    </Link>
  )
}

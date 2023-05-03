import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Heading, Stack, Text } from '@chakra-ui/react'

import ServicePartners from './ServicePartners'

import { SERVICES_URL } from '~/constants/routes'
import { TService } from '~/types/services'
import { useTranslate } from '~/utils/translate'
import Link from '~/components/Link'
import { Image } from '~/components/Images'

interface Props {
  data: TService
}

export default function ServiceCard (props: Props): ReactElement {
  const { data } = props

  const { translateData } = useTranslate()

  const id = prop('id', data)
  const image = path<string>(['image', 'file'], data)
  const partners = prop('partners', data)
  const title = translateData(data, 'name')
  const description = translateData(data, 'description')

  const detailUrl = `${SERVICES_URL}/${id}`

  return (
    <Stack>
      <Stack spacing={4}>
        <Image
          alt={title}
          src={image}
          h={'175px'}
          borderRadius={'2xl'}
        />

        <Heading
          as={Link}
          href={detailUrl}
          fontSize={'xl'}
          title={title}
          transition={'all 200ms'}
          noOfLines={2}
          _hover={{ color: 'primary.500' }}>
          {title}
        </Heading>
      </Stack>

      <Stack spacing={4}>
        <Text
          color={'gray.500'}
          fontWeight={'medium'}
          noOfLines={4}>
          {description}
        </Text>

        <ServicePartners partners={partners} />
      </Stack>
    </Stack>
  )
}

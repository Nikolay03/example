import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Box, Heading, Stack } from '@chakra-ui/react'

import ServiceCategory from './ServiceCategory'
import ServicePartners from './ServicePartners'

import { SERVICES_URL } from '~/constants/routes'
import { TService } from '~/types/services'
import { useTranslate } from '~/utils/translate'
import Link from '~/components/Link'
import { Image } from '~/components/Images'

interface Props {
  data: TService
}

export default function ServiceCardSimple (props: Props): ReactElement {
  const { data } = props

  const { translateData } = useTranslate()

  const id = prop('id', data)
  const image = path<string>(['image', 'file'], data)
  const category = prop('category', data)
  const partners = prop('partners', data)
  const title = translateData(data, 'name')
  const categoryName = translateData(category, 'name')
  const detailUrl = `${SERVICES_URL}/${id}`

  return (
    <Box>
      <Image
        alt={title}
        src={image}
        h={'175px'}
        mb={4}
        borderRadius={'2xl'}
      />

      <Stack align={'baseline'} spacing={3}>
        <ServiceCategory>
          {categoryName}
        </ServiceCategory>

        <Stack spacing={4}>
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

          <ServicePartners partners={partners} />
        </Stack>
      </Stack>
    </Box>
  )
}

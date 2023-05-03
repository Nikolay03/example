import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Heading, Stack, Text } from '@chakra-ui/react'

import ServiceCategory from './ServiceCategory'

import { SERVICES_URL } from '~/constants/routes'
import { TService } from '~/types/services'
import { useTranslate } from '~/utils/translate'
import { Image } from '~/components/Images'
import { MoreButton } from '~/components/Buttons'

interface Props {
  data: TService
}

export default function ServiceCardInline (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const id = prop('id', data)
  const category = prop('category', data)
  const image = path<string>(['image', 'file'], data)

  const title = translateData(data, 'name')
  const description = translateData(data, 'description')
  const categoryName = translateData(category, 'name')
  const detailUrl = `${SERVICES_URL}/${id}`

  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing={6}>
      <Image
        alt={title}
        src={image}
        borderRadius={{ base: 'lg', sm: '2xl' }}
        h={{ base: '165px', sm: '110px' }}
        minW={'175px'}
      />

      <Stack align={'baseline'} spacing={3}>
        <Stack align={'baseline'}>
          <ServiceCategory>
            {categoryName}
          </ServiceCategory>

          <Heading
            fontSize={'xl'}
            title={title}
            transition={'all 200ms'}
            noOfLines={2}>
            {title}
          </Heading>

          <Text color={'gray.500'} lineHeight={'base'} noOfLines={3}>
            {description}
          </Text>
        </Stack>

        <MoreButton href={detailUrl}>
          {t('button_more_details')}
        </MoreButton>
      </Stack>
    </Stack>
  )
}

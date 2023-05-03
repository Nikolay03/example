import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { ArrowUpRight } from 'react-feather'
import { Box, Text, Heading, Link as ChakraLink } from '@chakra-ui/react'

import { NEWS_URL } from '~/constants/routes'
import { TNews } from '~/types/news'
import { useDateFormat, DATE_FORMATS } from '~/utils/date'
import Link from '~/components/Link'
import { Image } from '~/components/Images'

function extractDomainFromURL (url: string): string {
  if (!url) return ''

  const { hostname } = new URL(url)
  return hostname
}

interface Props {
  data: TNews
}

export default function NewsCard (props: Props): ReactElement {
  const { data } = props

  const { dateFormat } = useDateFormat()

  const id = prop('id', data)
  const image = path<string>(['image', 'file'], data)
  const createdDate = prop('createdDate', data)
  const title = prop('title', data)
  const shortDescription = prop('shortDescription', data)
  const sourceUrl = prop('sourceUrl', data)
  const detailUrl = `${NEWS_URL}/${id}`

  return (
    <Box>
      <Image
        alt={title}
        src={image}
        h={'235px'}
        borderRadius={'2xl'}
        mb={4}
      />

      <Text color={'gray.500'} mb={3}>
        {dateFormat(createdDate, DATE_FORMATS.DATE_FORMAT_DEFAULT)}
      </Text>

      <Heading
        as={Link}
        href={detailUrl}
        fontSize={'2xl'}
        mb={3}
        title={title}
        transition={'all 200ms'}
        noOfLines={2}
        _hover={{ color: 'primary.500' }}>
        {title}
      </Heading>

      <Text color={'gray.500'} noOfLines={4}>
        {shortDescription}
      </Text>

      {sourceUrl && (
        <ChakraLink
          href={sourceUrl}
          color={'primary.500'}
          display={'inline-flex'}
          alignItems={'center'}
          isExternal={true}
          mt={3}>
          <Box as={'span'} mr={1}>
            {extractDomainFromURL(sourceUrl)}
          </Box>
          <ArrowUpRight size={16} />
        </ChakraLink>
      )}
    </Box>
  )
}

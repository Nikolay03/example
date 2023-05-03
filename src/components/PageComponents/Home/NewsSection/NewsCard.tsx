/* eslint-disable max-len */
import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Box, Text, Stack, Flex, Square, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { ArrowRight } from 'react-feather'

import { Image } from '~/components/Images'
import BlurBox from '~/components/PageComponents/Home/ProductsCarouselSection/BlurBox'
import { NEWS_URL } from '~/constants/routes'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { TNews } from '~/types/news'

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
  const detailUrl = `${NEWS_URL}/${id}`

  return (
    <Box bg={'gray.100'}>
      <Image
        alt={title}
        src={image}
        h={{ base: '270px', md: '400px' }}
        sx={{
          '& > div': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        <Flex position={'absolute'} bottom={'32px'} left={'32px'} right={'32px'} direction={'row'}>
          <BlurBox maxW={'100%'} h={'min-content'} alignSelf={'end'}>
            <Box p={{ base: '15px', md: '30px' }} pos={'relative'} zIndex={2}>
              <Stack spacing={6}>
                <Box>
                  <Heading
                    fontSize={'lg'}
                    mb={3}
                    color={'palette.text.default'}
                    fontWeight={'bold'}
                    title={title}
                    transition={'all 200ms'}
                    noOfLines={2}
                  >
                    {title}
                  </Heading>
                  <Text color={'palette.text.default'} noOfLines={4} fontSize={'sm'}>
                    {shortDescription}
                  </Text>
                  <Text mt={3} align={'right'} fontSize={'md'}>
                    {dateFormat(createdDate, DATE_FORMATS.DATE_FORMAT_DEFAULT)}
                  </Text>
                </Box>
              </Stack>
            </Box>
          </BlurBox>
          <Square
            alignSelf={'end'}
            size={{ base: 12, md: '68px' }}
            bg={'primary.500'}
            color={'white'}
            as={ChakraLink}
            href={detailUrl}
            display={'inline-flex'}
            alignItems={'center'}
            isExternal={true}
          >
            <ArrowRight size={26} />
          </Square>
        </Flex>
      </Image>
    </Box>
  )
}

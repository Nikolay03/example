import { ReactElement, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import {
  Box,
  Circle,
  Icon,
  IconButton,
  IconButtonProps,
  useToken,
  Flex,
  Stack,
  Text,
  Center,
  Button,
  Link
} from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import { NEWS_URL } from '~/constants/routes'
import { getListData } from '~/utils/fetch'
import { emToPixel } from '~/utils/breakpoints'
import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/Home'
import Container from '~/components/Container'
import { PageTitle } from '~/components/Titles'
import Carousel from '~/components/Carousel'
import NewsCard from '~/components/PageComponents/Home/NewsSection/NewsCard'

const BUTTON_SIZE = '64px'
const BUTTON_SIZE_SM = '40px'
const CarouselArrow = (props: IconButtonProps) => {
  return (
    <IconButton
      borderRadius={'100%'}
      bg={'palette.common.white'}
      boxShadow={'md'}
      color={'orange.300'}
      d={{ base: 'flex' }}
      h={{ base: BUTTON_SIZE_SM, md: BUTTON_SIZE }}
      w={{ base: BUTTON_SIZE_SM, md: BUTTON_SIZE }}
      pos={'absolute'}
      minW={'unset'}
      top={'50%'}
      transform={'translateY(-50%)'}
      _hover={{ bgColor: 'primary.50', color: 'orange.300' }}
      _active={{ bgColor: 'primary.50', color: 'orange.300' }}
      variant={'white'}
      zIndex={1}
      {...props}
    />
  )
}

const CustomDot = ({ onClick, ...rest }: DotProps) => {
  const {
    active
  } = rest
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li>
      <Box
        transition={'background 0.5s'}
        padding={'10px'}
        borderRadius={'100%'}
        border={'1.5px solid'}
        borderColor={active ? 'palette.common.white' : 'transparent'}
      >
        <Circle
          as={'button'}
          transition={'background 0.5s'}
          size={'14px'}
          bg={active ? 'palette.common.white' : 'gray.350'}
          onClick={onClick}
        />
      </Box>
    </li>
  )
}

export default function NewsSection (): ReactElement {
  const { t } = useTranslate()

  const { newsData } = useHomeData()

  const [sm, md, lg, xl] = useToken('breakpoints', ['sm', 'md', 'lg', 'xl'])

  const carouselRef = useRef<ButtonGroupProps>()
  const { results } = getListData(newsData)
  const carouselResponsive = {
    bigDesktop: {
      breakpoint: { max: 3000, min: emToPixel(xl) },
      items: 2,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: emToPixel(xl), min: emToPixel(lg) },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: emToPixel(md), min: emToPixel(sm) },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: emToPixel(sm), min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  }

  return (
    <>
      <Box pt={{ base: 8, md: 20 }} pb={{ base: 8, md: 20 }} bg={'#C4EBE8'}>
        <Container variant={'azure'} px={{ base: 4, sm: 2, md: 4, xl: '30px' }}>
          <Box width={'100%'}>
            <Flex
              justify={'space-between'}
            >
              <Box
                width={'35%'}
                d={{ base: 'none', md: 'block' }}
                mr={10}
                align={'center'}>
                <Box>
                  <PageTitle mb={{ base: 10 }}>
                    {t('home_section_news_title')}
                  </PageTitle>
                  <Text>{t('news_description')}</Text>
                  <Center>
                    <Button
                      mt={10}
                      borderRadius={'none'}
                      borderColor={'primary.500'} color={'palette.common.white'} as={Link}
                      href={NEWS_URL}
                    >
                      {t('button_more_details')}
                    </Button>
                  </Center>
                </Box>
              </Box>
              <Box
                width={{ base: '100%', md: '60%' }}
                pos={'relative'}
              >
                <Box
                  mx={'-12px'}
                  px={{ base: 0, md: 'unset' }}
                  sx={{
                    '& .react-multi-carousel-item[aria-hidden="true"]': {
                      filter: 'blur(2px)',
                      transition: 'all 200ms'
                    }
                  }}>
                  <Carousel
                    innerRef={carouselRef}
                    responsive={carouselResponsive}
                    arrows={true}
                    autoPlay={false}
                    autoPlaySpeed={8000}
                    pauseOnHover={true}
                    customDot={<CustomDot />}
                    customLeftArrow={<CarouselArrow
                      aria-label={'Prev'}
                      icon={<Icon as={ChevronLeft} boxSize={5} />}
                      onClick={() => {
                        if (carouselRef && carouselRef.current) {
                          carouselRef.current.previous()
                        }
                      }}
                    />}
                    customRightArrow={<CarouselArrow
                      aria-label={'Next'}
                      right={0}
                      icon={<Icon as={ChevronRight} boxSize={5} />}
                      onClick={() => {
                        if (carouselRef && carouselRef.current) {
                          carouselRef.current.next()
                        }
                      }}
                    />}
                    showDots={false}
                  >
                    {results.map(item => (
                      <Box key={item.id} px={3}>
                        <NewsCard data={item} />
                      </Box>
                    ))}
                  </Carousel>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  )
}

import { ReactElement, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import {
  Box,
  Circle,
  Icon,
  IconButton,
  IconButtonProps,
  useToken
} from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import { getListData } from '~/utils/fetch'
import { emToPixel } from '~/utils/breakpoints'
import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/Home'
import Container from '~/components/Container'
import { PageTitle } from '~/components/Titles'
import Carousel from '~/components/Carousel'
import ReputationCard from '~/components/PageComponents/Home/ReputationSection/ReputationCard'

const BUTTON_SIZE = '64px'
const CarouselArrow = (props: IconButtonProps) => {
  return (
    <IconButton
      borderRadius={'100%'}
      boxShadow={'md'}
      bg={'palette.common.white'}
      color={'orange.300'}
      d={{ base: 'none', xl: 'flex' }}
      h={BUTTON_SIZE}
      w={BUTTON_SIZE}
      pos={'absolute'}
      minW={'unset'}
      top={'50%'}
      transform={'translateY(-50%)'}
      _hover={{ bgColor: 'palette.common.white', color: 'orange.300', boxShadow: 'md' }}
      _active={{ bgColor: 'palette.common.white', color: 'orange.300', boxShadow: 'md' }}
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
        padding={{ base: '5px', md: '10px' }}
        borderRadius={'100%'}
        border={'1.5px solid'}
        borderColor={active ? 'primary.500' : 'transparent'}
        mx={active ? '10px' : '0'}
      >
        <Circle
          as={'button'}
          transition={'background 0.5s'}
          size={{ base: '7px', md: '14px' }}
          bg={active ? 'primary.500' : 'gray.350'}
          onClick={onClick}
        />
      </Box>
    </li>
  )
}

export default function ReputationSection (): ReactElement {
  const { t } = useTranslate()

  const { reputationData } = useHomeData()

  const [sm, md, lg, xl] = useToken('breakpoints', ['sm', 'md', 'lg', 'xl'])

  const mdBreakpoint = useToken('breakpoints', 'md')

  const carouselRef = useRef<ButtonGroupProps>()
  const { results } = getListData(reputationData)
  const carouselResponsive = {
    bigDesktop: {
      breakpoint: { max: 3000, min: emToPixel(xl) },
      items: 3,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: emToPixel(xl), min: emToPixel(lg) },
      items: 2,
      slidesToSlide: 2
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
      <HomeSection mb={{ base: 8, md: 0 }}>
        <Container variant={'azure'}>
          <PageTitle mb={{ base: 10 }}>
            {t('rating_page_title')}
          </PageTitle>
          <Box
            position={'relative'}
            mx={'-12px'}
            px={{ base: 6, md: 'unset' }}
            sx={{
              '& .react-multi-carousel-item[aria-hidden="true"]': {
                filter: 'blur(2px)',
                transition: 'all 200ms'
              },
              '& .dot-list': {
                bottom: '-30px'
              },
              [`@media (min-width: ${md})`]: {
                '& .dot-list': {
                  bottom: '-65px'
                }
              }
            }}>
            <Carousel
              innerRef={carouselRef}
              responsive={carouselResponsive}
              arrows={true}
              renderDotsOutside={true}
              autoPlay={false}
              autoPlaySpeed={8000}
              dotListClass={'dot-list'}
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
              showDots={true}
            >
              {results.map((item, index) => (
                <Box key={item.id} px={5}>
                  <ReputationCard data={item} index={index} />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Container>
      </HomeSection>
    </>
  )
}

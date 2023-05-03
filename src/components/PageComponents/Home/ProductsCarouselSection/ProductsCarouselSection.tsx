import { ReactElement, Ref, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import { Box, Icon, IconButton, Circle, IconButtonProps, useToken } from '@chakra-ui/react'

import { getListData } from '~/utils/fetch'
import { emToPixel } from '~/utils/breakpoints'
import { Image } from '~/components/Images'
import { useHomeData } from '~/components/PageComponents/Home'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'
import ProductsCarouselCard from '~/components/PageComponents/Home/ProductsCarouselSection/ProductsCarouselCard'
import useMediaBreakpoint from '~/hooks/useMediaBreakpoint'

const BUTTON_SIZE = '64px'
const CarouselArrow = (props: IconButtonProps) => {
  return (
    <IconButton
      borderRadius={'100%'}
      bg={'rgba(255, 255, 255, 0.3)'}
      color={'white'}
      d={{ base: 'none', xl: 'flex' }}
      h={BUTTON_SIZE}
      w={BUTTON_SIZE}
      pos={'absolute'}
      minW={'unset'}
      top={'0px'}
      _hover={{ bgColor: 'palette.common.white', color: 'primary.500' }}
      variant={'white'}
      zIndex={1}
      {...props}
    />
  )
}

type DotProp = {
  innerRef: Ref<any>
} & DotProps
const CustomDot = ({ onClick, ...rest }: DotProp) => {
  const {
    active,
    index,
    innerRef
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
          onClick={() => {
            // @ts-ignore
            innerRef.current.goToSlide(index)
            onClick()
          }}
        />
      </Box>
    </li>
  )
}

export default function ProductsCarouselSection (): ReactElement {
  const { bannerList } = useHomeData()
  const [sm, md, lg, xl] = useToken('breakpoints', ['sm', 'md', 'lg', 'xl'])

  const carouselRef = useRef<ButtonGroupProps>()
  const carouselBgRef = useRef<ButtonGroupProps>()
  const { results } = getListData(bannerList)

  const carouselResponsive = {
    bigDesktop: {
      breakpoint: { max: 3000, min: emToPixel(xl) },
      items: 1,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: emToPixel(xl), min: emToPixel(lg) },
      items: 1,
      slidesToSlide: 1
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
  const carouselResponsiveBg = {
    bigDesktop: {
      breakpoint: { max: 3000, min: emToPixel(xl) },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 100
    },
    desktop: {
      breakpoint: { max: emToPixel(xl), min: emToPixel(lg) },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 100
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
  const isLargerThanLG = useMediaBreakpoint({ breakpoint: 'lg' })
  if (isLargerThanLG) {
    return (
      <>
        <Box
          pt={20}
          bg={'linear-gradient(to right, #C4EBE8 0% 64%, #14AFA6 64% 100%)'}
          pos={'relative'} zIndex={'1'}>
          <Box
            position={'absolute'}
            zIndex={'2'} left={{ base: '0px', lg: '300px' }} bottom={0} right={'0px'}
            height={'calc(100% - 80px - 100px)'}
            sx={{
              '& li': {
                height: '100%'
              },
              '& div': {
                height: '100%'
              },
              '& ul': {
                height: '100%'
              }
            }}
          >
            <Carousel
              innerRef={carouselBgRef}
              responsive={carouselResponsiveBg}
              arrows={false}
              autoPlay={false}
              draggable={false}
              infinite={true}
              pauseOnHover={true}
              showDots={false}
              partialVisible={true}
            >
              {results.map(item => (
                <Box key={item.id} pr={{ base: 'auto', lg: '40px' }}>
                  <Image
                    src={item?.commodityGroupClassifier?.parent?.bannerImage?.file || null}
                    className={'reputation-bg'}
                    width={'100%'}
                    height={'100%'}
                    // @ts-ignore
                    imageProps={{
                      loading: 'eager',
                      unoptimized: true
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Container pos={'relative'} zIndex={'3'} variant={'azure'}>
            <CarouselArrow
              aria-label={'Prev'}
              icon={<Icon as={ChevronLeft} boxSize={5} />}
              right={`calc(${BUTTON_SIZE} + 32px + 12px)`}
              onClick={() => {
                if (carouselRef && carouselRef.current) {
                  carouselRef.current.previous()
                  carouselBgRef.current.previous()
                }
              }}
            />
            <CarouselArrow
              aria-label={'Next'}
              right={'32px'}
              icon={<Icon as={ChevronRight} boxSize={5} />}
              onClick={() => {
                if (carouselRef && carouselRef.current) {
                  carouselRef.current.next()
                  carouselBgRef.current.next()
                }
              }}
            />

            <Box
              mx={'-12px'}
              px={{ base: 6, md: 'unset' }}
              pb={16}
              sx={{
                '& .dot-list': {
                  top: '14px',
                  left: 'auto',
                  right: `calc(${BUTTON_SIZE} * 2 + 18%)`
                }
              }}
            >
              <Carousel
                innerRef={carouselRef}
                responsive={carouselResponsive}
                arrows={false}
                dotListClass={'dot-list'}
                autoPlay={false}
                autoPlaySpeed={8000}
                customDot={<CustomDot innerRef={carouselBgRef} />}
                infinite={true}
                pauseOnHover={true}
                showDots={true}
              >
                {results.map(item => {
                  return (
                    <Box key={item.id}>
                      <ProductsCarouselCard data={item} />
                    </Box>
                  )
                }
                )}
              </Carousel>
            </Box>
          </Container>
        </Box>
      </>
    )
  }
  return null
}

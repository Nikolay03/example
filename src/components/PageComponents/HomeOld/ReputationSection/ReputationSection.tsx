import { ReactElement, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ButtonGroupProps } from 'react-multi-carousel'
import { Box, Icon, IconButton, IconButtonProps, useToken } from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import { RATING_URL } from '~/constants/routes'
import { getListData } from '~/utils/fetch'
import { emToPixel } from '~/utils/breakpoints'
import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import { ReputationCard } from '~/components/PageComponents/Reputation'
import Container from '~/components/Container'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'
import { MoreButton } from '~/components/Buttons'
import { Image } from '~/components/Images'
import Carousel from '~/components/Carousel'

const CarouselArrow = (props: IconButtonProps) => {
  return (
    <IconButton
      bg={'transparent'}
      border={'1px solid'}
      borderColor={'white'}
      color={'white'}
      d={{ base: 'none', xl: 'flex' }}
      h={'42px'}
      w={'42px'}
      pos={'absolute'}
      minW={'unset'}
      top={'50%'}
      transform={'translateY(-50%)'}
      variant={'white'}
      zIndex={1}
      {...props}
    />
  )
}

export default function ReputationSection (): ReactElement {
  const { t } = useTranslate()

  const { reputationData } = useHomeData()

  const [sm, md, lg, xl] = useToken('breakpoints', ['sm', 'md', 'lg', 'xl'])

  const carouselRef = useRef<ButtonGroupProps>()

  const { results } = getListData(reputationData)

  const carouselResponsive = {
    bigDesktop: {
      breakpoint: { max: 3000, min: emToPixel(xl) },
      items: 3,
      slidesToSlide: 3
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
      <Image
        src={'/assets/reputation_section_bg_new.jpg'}
        className={'reputation-bg'}
        sx={{
          '& .reputation-bg': { filter: 'blur(5px)' }
        }}>
        <HomeSection>
          <Container px={6}>
            <SectionTitleWrap
              direction={{ base: 'column', md: 'row' }}
              gridRowGap={6}>
              <SectionTitle color={'white'}>
                {t('home_section_companies_rating_title')}
              </SectionTitle>
              <MoreButton color={'white'} href={RATING_URL} />
            </SectionTitleWrap>
          </Container>

          <Container pos={'relative'}>
            <CarouselArrow
              aria-label={'Prev'}
              icon={<Icon as={ChevronLeft} boxSize={5} />}
              right={'100%'}
              onClick={() => {
                if (carouselRef && carouselRef.current) {
                  carouselRef.current.previous()
                }
              }}
            />
            <CarouselArrow
              aria-label={'Next'}
              icon={<Icon as={ChevronRight} boxSize={5} />}
              left={'100%'}
              onClick={() => {
                if (carouselRef && carouselRef.current) {
                  carouselRef.current.next()
                }
              }}
            />

            <Box
              mx={'-12px'}
              px={{ base: 6, md: 'unset' }}
              sx={{
                '& .react-multi-carousel-item[aria-hidden="true"]': {
                  filter: 'blur(2px)',
                  transition: 'all 200ms'
                }
              }}>
              <Carousel
                innerRef={carouselRef}
                responsive={carouselResponsive}
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={8000}
                infinite={true}
                pauseOnHover={true}
                partialVisible={false}
                showDots={false}
              >
                {results.map(item => (
                  <Box key={item.id} px={3}>
                    <ReputationCard data={item} />
                  </Box>
                ))}
              </Carousel>
            </Box>
          </Container>
        </HomeSection>
      </Image>
    </>
  )
}

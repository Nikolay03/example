import { ReactElement } from 'react'
import { SimpleGrid, Stack, Box } from '@chakra-ui/react'
/* eslint-disable max-len */

import HomeSection from '../HomeSection'

import { useTranslate } from '~/utils/translate'
import Container from '~/components/Container'
import { PageTitle } from '~/components/Titles'
import { Image } from '~/components/Images'
import useMediaBreakpoint from '~/hooks/useMediaBreakpoint'

export default function AboutSection (): ReactElement {
  const { t } = useTranslate()
  const isLargerThanMd = useMediaBreakpoint({ breakpoint: 'md' })
  if (isLargerThanMd) {
    return (
      <HomeSection>
        <Container variant={'azure'}>
          <PageTitle mb={{ base: 10 }}>
            {t('home_section_about_title')}
          </PageTitle>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Stack align={'flex-start'}>
              <Image
                bgGradient={'none'}
                alt={''}
                src={'/assets/about_section_bg_2.png'}
                borderRadius={'2xl'}
                h={96} // 384px
                w={'full'}
              />
            </Stack>
            <Box>
              <p style={{ lineHeight: '38px', fontSize: '20px' }}>{t('about_page_description_content_1')}</p>
              <br />
              <p style={{ lineHeight: '38px', fontSize: '20px' }}>{t('about_page_description_content_2')}</p>
            </Box>
          </SimpleGrid>
        </Container>
      </HomeSection>
    )
  } return null
}

import { ReactElement } from 'react'
import { SimpleGrid, Stack } from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import AboutPerks from './AboutPerks'

import { ABOUT_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import Container from '~/components/Container'
import { SectionTitle, SectionTitleWrap } from '~/components/Titles'
import { MoreButton } from '~/components/Buttons'
import { Image } from '~/components/Images'
import { HtmlContent } from '~/components/Utils'

export default function AboutSection (): ReactElement {
  const { t, translateData } = useTranslate()

  const { aboutData } = useHomeData()

  const content = translateData(aboutData, 'body')

  return (
    <HomeSection>
      <Container>
        <SectionTitleWrap>
          <SectionTitle>
            {t('home_section_about_title')}
          </SectionTitle>
        </SectionTitleWrap>

        <Stack spacing={12}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <HtmlContent html={content} />

            <Stack align={'flex-end'}>
              <Image
                alt={''}
                src={'/assets/about_section_bg.jpg'}
                borderRadius={'2xl'}
                h={96} // 384px
                w={'full'}
              />

              <MoreButton href={ABOUT_URL}>
                {t('button_more_details')}
              </MoreButton>
            </Stack>
          </SimpleGrid>

          <AboutPerks />
        </Stack>
      </Container>
    </HomeSection>
  )
}

import { ReactElement } from 'react'

import HomeSection from '../HomeSection'

import Container from '~/components/Container'
import { SearchForm } from '~/components/PageForms'
import { Image } from '~/components/Images'

export default function FilterSection (): ReactElement {
  return (
    <Image
      src={'/assets/filter_section_bg_new.jpg'}
      sx={{
        '& .next-image': { filter: 'blur(5px)' }
      }}>
      <HomeSection>
        <Container>
          <SearchForm />
        </Container>
      </HomeSection>
    </Image>
  )
}

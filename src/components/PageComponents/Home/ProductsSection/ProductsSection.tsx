import { ReactElement } from 'react'
import { isEmpty, not } from 'ramda'
import { Button, Link, Center } from '@chakra-ui/react'

import HomeSection from '../HomeSection'

import { useTranslate } from '~/utils/translate'
import { useHomeData } from '~/components/PageComponents/Home'
import Container from '~/components/Container'
import { PageTitle } from '~/components/Titles'
import { getListData } from '~/utils/fetch'
import { ProductsCard, ProductsGrid } from '~/components/PageComponents/Home/ProductsSection'
import { TRADES_URL } from '~/constants/routes'
import useMediaBreakpoint from '~/hooks/useMediaBreakpoint'

export default function ProductsSection (): ReactElement {
  const { t } = useTranslate()

  const { productsList } = useHomeData()
  const { results, count } = getListData(productsList)
  const hasMoreNews = not(isEmpty(results)) && count > 8

  return (
    <>
      <HomeSection pt={{ base: 8, md: 16 }} pb={{ base: 12, md: 20 }}>
        <Container variant={'azure'}>
          <PageTitle mb={{ base: 10 }}>
            {t('popular_products_title')}
          </PageTitle>

          <ProductsGrid>
            {results.map(news => (
              <ProductsCard key={news.id} data={news} />
            ))}
          </ProductsGrid>

          {hasMoreNews && (
            <Center>
              <Button
                mt={10}
                borderRadius={'none'}
                borderColor={'primary.500'} color={'primary.500'} variant={'outline'} as={Link}
                href={TRADES_URL}
              >
                {t('button_more_details')}
              </Button>
            </Center>
          )}
        </Container>
      </HomeSection>
    </>
  )
}

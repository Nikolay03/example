import { ReactElement } from 'react'
import { Center, Box, Heading, Text, Button } from '@chakra-ui/react'

import { ROOT_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { SimpleLayout } from '~/components/Layouts'
import Link from '~/components/Link'

export default function Error404 (): ReactElement {
  const { t } = useTranslate()

  return (
    <PageWrapper title={t('not_found_page_title')}>
      <SimpleLayout>
        <Center>
          <Box textAlign={'center'}>
            <Heading color={'primary.500'} fontSize={'9xl'}>404</Heading>
            <Text fontSize={'xl'} fontWeight={'semibold'} mb={4}>
              {t('not_found_page_heading')}
            </Text>
            <Button as={Link} variant={'outline'} href={ROOT_URL} replace={true}>
              {t('not_found_back_button')}
            </Button>
          </Box>
        </Center>
      </SimpleLayout>
    </PageWrapper>
  )
}

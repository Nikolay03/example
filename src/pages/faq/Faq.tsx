import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Stack } from '@chakra-ui/react'

import { FAQ_CATEGORY_LIST } from '~/constants/api'
import { FeedbackTypes } from '~/types/enums'
import { TStateListData } from '~/types/state'
import { TFaqGrouped } from '~/types/faq'
import { ROOT_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent
} from '~/components/Breadcumb'
import { PageTitle } from '~/components/Titles'
import { PageGrid } from '~/components/Grids'
import { FaqForm } from '~/components/PageForms'
import { FaqCategories, FaqList } from '~/components/PageComponents/Faq'

export interface FaqProps {
  faqData: TStateListData<TFaqGrouped>
}

export default function Faq (props: FaqProps): ReactElement {
  const { faqData } = props

  const { t } = useTranslate()

  const { data, results, count, isLoading: isLoadingList } = useRequest<TFaqGrouped>(FAQ_CATEGORY_LIST, {
    disableLocale: false,
    initialData: faqData
  })

  const allCount = prop('allCount', data)

  return (
    <PageWrapper title={t('faq_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('faq_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <PageTitle description={t('faq_page_title_description')}>
          {t('faq_page_title')}
        </PageTitle>

        <PageGrid isReversed={true}>
          <Stack spacing={6}>
            <FaqCategories allCount={allCount} />
            <Box display={{ base: 'block', lg: 'none' }}>
              <FaqList
                list={results}
                count={count}
                isLoading={isLoadingList}
              />
            </Box>
            <FaqForm
              title={t('faq_form_questions_title')}
              type={FeedbackTypes.FAQ}
            />
          </Stack>

          <Box display={{ base: 'none', lg: 'block' }}>
            <FaqList
              list={results}
              count={count}
              isLoading={isLoadingList}
            />
          </Box>
        </PageGrid>
      </PageLayout>
    </PageWrapper>
  )
}

import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import { Container, Stack } from '@chakra-ui/react'

import { ROOT_URL, USER_DETAIL_URL } from '~/constants/routes'
import { TStateListData } from '~/types/state'
import { TUserReview } from '~/types/showcase'
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
import { SubTitle } from '~/components/Titles'
import { ReviewsUserInfo, ReviewsGrid, ReviewCard } from '~/components/PageComponents/Reviews'
import Pagination from '~/components/Pagination'
import { TUser } from '~/types/user'

export type UserReviewsData = TStateListData<TUserReview, { user: TUser }>

export interface UserReviewsProps {
  api: string
  data: UserReviewsData
}

export default function UserReviews (props: UserReviewsProps): ReactElement {
  const { api, data } = props

  const { t } = useTranslate()

  const { query: { slug } } = useRouter()

  const { results, isLoading, count } = useRequest<TUserReview>(api, {
    initialData: data,
    params: { toUser: slug }
  })

  const user = prop('user', data)

  return (
    <PageWrapper title={t('reviews_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={sprintf(USER_DETAIL_URL, slug)}>
              {t('showcase_user_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('reviews_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <Container maxW={'container.md'}>
          <SubTitle>
            {t('reviews_page_title')}
          </SubTitle>

          <Stack spacing={8}>
            <ReviewsUserInfo user={user} />
            <ReviewsGrid isLoading={isLoading}>
              {results.map(review => (
                <ReviewCard key={review.id} data={review} />
              ))}
            </ReviewsGrid>
          </Stack>

          <Pagination totalRecords={count} />
        </Container>
      </PageLayout>
    </PageWrapper>
  )
}

import { ReactElement } from 'react'
import { equals, not, path, prop } from 'ramda'
import { Box, Container, Stack, Text } from '@chakra-ui/react'

import { ROOT_URL } from '~/constants/routes'
import { TUserShowcase } from '~/types/showcase'
import * as ENUMS from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import ShowcaseUnavailable from '~/icons/modals/ShowcaseUnavailable'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent
} from '~/components/Breadcumb'
import {
  ShowcasePartner,
  ShowcaseUserInfo,
  ShowcaseUserTrades
} from '~/components/PageComponents/Showcase'
import { SubTitle } from '~/components/Titles'

export interface UserShowcaseProps {
  data: TUserShowcase
}

export default function UserShowcase (props: UserShowcaseProps): ReactElement {
  const { data } = props

  const { t } = useTranslate()

  const accreditation = prop('accreditation', data)
  const accreditationStatus = prop('status', accreditation)
  const rating = path<ENUMS.RatingDesignations>(['rating', 'designation'], data)
  const isBankrupt = rating === ENUMS.RatingDesignations.DEL
  const isAccreditationApproved = equals(ENUMS.AccreditationStatuses.APPROVED, accreditationStatus)

  const registerAs = prop('registerAs', data)

  const title = {
    [ENUMS.UserTypes.PROVIDER]: t('showcase_partner_page_title'),
    [ENUMS.UserTypes.ENTITY]: t('showcase_entity_page_title'),
    [ENUMS.UserTypes.INDIVIDUAL]: t('showcase_individual_page_title')
  }[registerAs]

  const isProvider = equals(ENUMS.UserTypes.PROVIDER, registerAs)
  const isEntity = equals(ENUMS.UserTypes.ENTITY, registerAs)
  const isIndividual = equals(ENUMS.UserTypes.INDIVIDUAL, registerAs)

  if (not(isAccreditationApproved)) {
    return (
      <PageWrapper title={t('showcase_no_accreditation_page_title')}>
        <PageLayout>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href={ROOT_URL}>
                {t('home_page_title')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbCurrent>
                {t('showcase_no_accreditation_page_title')}
              </BreadcrumbCurrent>
            </BreadcrumbItem>
          </Breadcrumb>

          <Container maxW={'lg'} pt={8}>
            <Stack align={'center'} textAlign={'center'} spacing={4}>
              <ShowcaseUnavailable />

              <Box>
                <SubTitle>
                  {t('showcase_no_accreditation_title')}
                </SubTitle>
                <Text>
                  {isBankrupt
                    ? t('showcase_bankrupt_description')
                    : t('showcase_no_accreditation_description')}
                </Text>
              </Box>
            </Stack>
          </Container>
        </PageLayout>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title={title}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {title}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        {isProvider && (
          <ShowcasePartner data={data} />
        )}

        {(isEntity || isIndividual) && (
          <Stack spacing={12}>
            <ShowcaseUserInfo data={data} />
            <ShowcaseUserTrades />
          </Stack>
        )}
      </PageLayout>
    </PageWrapper>
  )
}

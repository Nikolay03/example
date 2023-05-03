import { ReactElement } from 'react'
import { equals, path, prop } from 'ramda'
import { Avatar, Box, Stack } from '@chakra-ui/react'

import { UserTypes } from '~/types/enums'
import { TUserShowcase } from '~/types/showcase'
import { getUserReputation } from '~/utils/get'
import { getPlainTextFromHtml } from '~/utils/string'
import { phoneNumberParse } from '~/utils/fieldParsers'
import { useTranslate } from '~/utils/translate'
import { SubTitle } from '~/components/Titles'
import RatingStar from '~/components/RatingStar'
import { DetailValue, VerticalDivider } from '~/components/Misc'
import { ReviewsCount } from '~/components/PageComponents/Reviews'
import { HtmlContent } from '~/components/Utils'

interface Props {
  data: TUserShowcase
  showAvatar?: boolean
}

const detailValueCommonProps = {
  labelColor: 'gray.500',
  spacing: 4
}

export default function ShowcaseUserInfo (props: Props): ReactElement {
  const { data, showAvatar } = props

  const { t } = useTranslate()

  const userId = prop('id', data)
  const userName = prop('name', data)
  const userPhoto = path<string>(['image', 'file'], data)
  const userRating = getUserReputation(data)
  const userReviewRating = prop('reviewRating', data)
  const userReviewCount = prop('reviewCount', data)
  const userDescription = prop('description', data)
  const informationForContractors = prop('informationForContractors', data)
  const contactNumber = prop('contactNumber', data)
  const site = prop('site', data)

  const registerAs = prop('registerAs', data)
  const isIndividual = equals(UserTypes.INDIVIDUAL, registerAs)

  const userRatingLabel = isIndividual
    ? t('rating_individual_label', { rating: userRating })
    : t('rating_company_label', { rating: userRating })

  return (
    <Stack spacing={{ base: 6, md: 9 }}>
      <Stack align={'center'} direction={'row'} spacing={{ base: 4, md: 6 }}>
        {showAvatar && (
          <Avatar
            bg={'gray.500'}
            size={'xl'}
            src={userPhoto}
            height={{ base: '74px', md: '90px' }}
            width={{ base: '74px', md: '90px' }}
          />
        )}

        <Stack spacing={{ base: 2, md: 4 }}>
          <SubTitle as={'h1'} mb={'unset'}>{userName}</SubTitle>
          <Stack
            align={{ base: 'unset', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 2, md: 3 }}>
            <Stack align={'center'} direction={'row'}>
              <RatingStar isReadOnly={true} value={userReviewRating} />
              <ReviewsCount userId={userId} count={userReviewCount} />
            </Stack>

            <VerticalDivider d={{ base: 'none', md: 'block' }} />

            <Box>
              {userRatingLabel}
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {contactNumber && (
        <DetailValue
          {...detailValueCommonProps}
          label={t('input_contact_number_label')}
          value={phoneNumberParse(contactNumber)}
          variant={'block'}
        />
      )}

      {site && (
        <DetailValue
          {...detailValueCommonProps}
          label={t('input_website_label')}
          value={site}
          variant={'block'}
        />
      )}

      {getPlainTextFromHtml(userDescription) && (
        <DetailValue
          {...detailValueCommonProps}
          label={t('showcase_user_description')}
          value={<HtmlContent html={userDescription} />}
          variant={'block'}
        />
      )}
      {getPlainTextFromHtml(informationForContractors) && (
        <DetailValue
          {...detailValueCommonProps}
          label={t('showcase_user_info_for_contractors')}
          value={<HtmlContent html={informationForContractors} />}
          variant={'block'}
        />
      )}
    </Stack>
  )
}

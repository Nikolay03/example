import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { ChevronRight } from 'react-feather'
import { Box, Button, Flex, Icon, Stack } from '@chakra-ui/react'

import { USER_DETAIL_URL } from '~/constants/routes'
import { TUserReputation } from '~/types/reputations'
import { UserTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { numberFormat, useBigNumberFormat } from '~/utils/number'
import { innNumberParse } from '~/utils/fieldParsers'
import { getUserReputation } from '~/utils/get'
import UserEntity from '~/icons/common/UserEntity'
import UserIndividual from '~/icons/common/UserIndividual'
import { Image } from '~/components/Images'
import { DetailValue } from '~/components/Misc'
import RatingStar from '~/components/RatingStar'
import Link from '~/components/Link'

interface Props {
  data: TUserReputation
}

function getFallbackIcon (userType: UserTypes) {
  if (userType === 'entity' || userType === 'provider') return UserEntity
  return UserIndividual
}

export default function ReputationCard (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const { bigNumberFormat } = useBigNumberFormat()

  const id = prop('id', data)
  const inn = innNumberParse(prop('inn', data))
  const registerAs = prop('registerAs', data)
  const name = prop('name', data)
  const photo = prop('image', data)
  const icon = getFallbackIcon(registerAs)
  const region = prop('region', data)
  const regionName = translateData(region, 'name')
  const volumePrice = Math.abs(prop('volumePrice', data))
  const volumeQuantity = prop('volumeQuantity', data)
  const volumePriceFormatted = bigNumberFormat(volumePrice)
  const volumeQuantityFormatted = numberFormat(volumeQuantity)
  const volume = `${volumePriceFormatted} / ${volumeQuantityFormatted}`
  const rating = getUserReputation(data)
  const reviewRating = prop('reviewRating', data)

  const userDetailUrl = sprintf(USER_DETAIL_URL, id)

  return (
    <Box bgColor={'white'} borderRadius={'2xl'} p={{ base: 6, md: 8 }}>
      <Stack spacing={5} mb={6}>
        <Flex align={'center'}>
          <Image
            alt={name}
            src={photo?.file}
            alignItems={'center'}
            bgColor={'gray.100'}
            borderRadius={'lg'}
            display={'flex'}
            flexShrink={0}
            justifyContent={'center'}
            h={'72px'}
            w={'72px'}>
            {!photo && (
              <Icon as={icon} boxSize={12} color={'gray.500'} />
            )}
          </Image>

          <Stack ml={4}>
            <Box fontSize={'xl'} fontWeight={'semibold'} noOfLines={2}>{name}</Box>
            <Box>{regionName}</Box>
          </Stack>
        </Flex>

        <Stack spacing={4}>
          <DetailValue
            label={t('rating_table_th_volume')}
            value={volume}
          />
          <DetailValue
            label={t('rating_table_th_tin')}
            value={inn}
          />
          <DetailValue
            label={t('rating_table_th_reputation')}
            value={rating}
          />
          <DetailValue
            label={t('rating_table_th_rating')}
            value={(
              <RatingStar
                isReadOnly={true}
                size={3}
                value={reviewRating}
              />
            )}
            alignItems={'center'}
          />
        </Stack>
      </Stack>

      <Button
        as={Link}
        color={'palette.text.default'}
        colorScheme={'gray'}
        fontWeight={'semibold'}
        href={userDetailUrl}
        rightIcon={<ChevronRight />}
        variant={'link'}>
        Посмотреть компанию
      </Button>
    </Box>
  )
}

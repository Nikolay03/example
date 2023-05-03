import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { ChevronRight } from 'react-feather'
import { Box, Button, Flex, Icon, Stack, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { USER_DETAIL_URL } from '~/constants/routes'
import { TUserReputation } from '~/types/reputations'
import { UserTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import UserEntity from '~/icons/common/UserEntity'
import UserIndividual from '~/icons/common/UserIndividual'
import { Image } from '~/components/Images'
import { DetailValue } from '~/components/Misc'
import RatingStar from '~/components/RatingStar'
import Link from '~/components/Link'

interface Props {
  data: TUserReputation
  index: number
}

function getFallbackIcon (userType: UserTypes) {
  if (userType === 'entity' || userType === 'provider') return UserEntity
  return UserIndividual
}

export default function ReputationCard (props: Props): ReactElement {
  const { data, index } = props

  const { t, translateData } = useTranslate()
  const { locale } = useRouter()
  const id = prop('id', data)
  const registerAs = prop('registerAs', data)
  const name = prop('name', data)
  const photo = prop('image', data)
  const icon = getFallbackIcon(registerAs)
  const region = prop('region', data)
  const regionName = translateData(region, 'name')
  const reviewRating = prop('reviewRating', data)

  const userDetailUrl = sprintf(`/${locale}${USER_DETAIL_URL}`, id)

  return (
    <Box
      bgColor={'white'}
      borderRadius={'4px 4px 0px 0px'}
      boxShadow={{ lg: (index % 2) === 0 ? 'none' : 'lg' }}
    >
      <Stack
        spacing={5}
        pb={5}
      >
        <Image
          alt={name}
          src={photo?.file}
          alignItems={'center'}
          bgColor={'gray.100'}
          display={'flex'}
          flexShrink={0}
          justifyContent={'center'}
          h={{ base: '270px', md: '330px' }}
        >
          {!photo && (
            <Icon as={icon} boxSize={12} color={'gray.500'} />
          )}
        </Image>
        <Box px={{ base: 5, md: 5 }}>
          <Flex align={'center'}>
            <Stack>
              <Box fontSize={'xl'} fontWeight={'semibold'} noOfLines={2}>{name}</Box>
              <Box color={'gray.400'} fontSize={'sm'}>{regionName}</Box>
            </Stack>
          </Flex>

          <SimpleGrid spacing={2} columns={{ base: 1, lg: 1 }} fontSize={'sm'}>
            <DetailValue
              labelColor={'palette.text.default'}
              label={t('rating_table_th_rating')}
              value={(
                <RatingStar
                  isReadOnly={true}
                  size={5}
                  value={reviewRating}
                />
              )}
              alignItems={'center'}
            />
            <Button
              as={Link}
              justifyContent={{ base: 'left' }}
              color={'palette.text.default'}
              colorScheme={'gray'}
              fontWeight={'semibold'}
              fontSize={'sm'}
              href={userDetailUrl}
              rightIcon={<ChevronRight />}
              variant={'link'}>
              Посмотреть компанию
            </Button>
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  )
}

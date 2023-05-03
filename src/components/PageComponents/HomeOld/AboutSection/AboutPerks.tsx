import { ElementType, ReactElement } from 'react'
import { Box, Icon, IconProps, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import AboutSecure from '~/icons/AboutSecure'
import AboutOnline from '~/icons/AboutOnline'
import AboutPayment from '~/icons/AboutPayment'

interface PerkProps {
  icon: ElementType<IconProps>
  title: string
  description: string
}

function Perk (props: PerkProps): ReactElement {
  const { icon, title, description } = props

  return (
    <Stack spacing={6}>
      <Icon
        as={icon}
        alignSelf={{ base: 'center', md: 'unset' }}
        boxSize={12}
        color={'primary.500'}
      />

      <Stack textAlign={{ base: 'center', md: 'unset' }} spacing={3}>
        <Box fontSize={'xl'} fontWeight={'semibold'}>
          {title}
        </Box>

        <Text
          color={'gray.500'}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Stack>
    </Stack>
  )
}

export default function AboutPerks (): ReactElement {
  const { t } = useTranslate()

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Perk
        icon={AboutSecure}
        title={t('about_perk_secure_title')}
        description={t('about_perk_secure_description')}
      />
      <Perk
        icon={AboutOnline}
        title={t('about_perk_online_title')}
        description={t('about_perk_online_description')}
      />
      <Perk
        icon={AboutPayment}
        title={t('about_perk_payment_title')}
        description={t('about_perk_payment_description')}
      />
    </SimpleGrid>
  )
}

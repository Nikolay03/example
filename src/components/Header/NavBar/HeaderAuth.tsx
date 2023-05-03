import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import { EtpInfoPhone } from '~/components/EtpInfo'
import { AuthButton } from '~/components/Buttons'
import { ClientRender } from '~/components/Utils'

interface Props {
  themeType?: 'azure'
}
export default function HeaderAuth ({ themeType }: Props): ReactElement {
  return (
    <Stack
      align={'center'}
      display={{ base: 'none', lg: 'flex' }}
      direction={'row-reverse'}
      spacing={8}>
      <ClientRender>
        <AuthButton themeType={themeType} />
        <EtpInfoPhone display={{ base: 'none', xl: 'block' }} themeType={themeType} />
      </ClientRender>
    </Stack>
  )
}

import { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { Image } from '~/components/Images'

interface Props {
  children: ReactNode
  showBgImage?: boolean
}

function AuthFormContainer (props: Props): ReactElement {
  const { children, showBgImage } = props

  return (
    <Flex
      bgColor={'white'}
      borderRadius={'xl'}
      overflow={'hidden'}>
      <Box
        flexGrow={1}
        pos={'relative'}
        px={{ base: 6, sm: 10 }}
        py={{ base: 6, sm: 9 }}>
        {children}

        <Box
          bgColor={'white'}
          filter={'blur(10px)'}
          pos={'absolute'}
          top={'-60px'}
          left={'calc(100% - 15px)'}
          bottom={'-60px'}
          w={'40px'}
          zIndex={1}
        />
      </Box>

      {showBgImage && (
        <Image
          alt={'ETP Authorization'}
          src={'/assets/auth_bg.jpg'}
          objectFit={'contain'}
          objectPosition={'top right'}
          bgGradient={'linear(to-tr, #e6e8ea, #e4e5e7)'}
          display={{ base: 'none', md: 'block' }}
          minH={'600px'}
          minW={{ md: '340px', lg: '390px' }}
        />
      )}
    </Flex>
  )
}

AuthFormContainer.defaultProps = {
  showBgImage: true
}

export default AuthFormContainer

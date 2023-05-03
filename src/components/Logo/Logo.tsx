import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, HStack } from '@chakra-ui/react'

const logoLabels: {[key in string]: ReactElement} = {
  ru: (
    <>
      <Text lineHeight={'inherit'}>Электронный</Text>
      <Text lineHeight={'inherit'}>агропромышленный портал</Text>
    </>
  ),
  en: (
    <>
      <Text lineHeight={'inherit'}>Electronic agro-industrial</Text>
      <Text lineHeight={'inherit'}>market</Text>
    </>
  ),
  uz: (
    <>
      <Text lineHeight={'inherit'}>Elektron agrosanoat</Text>
      <Text lineHeight={'inherit'}>bozori</Text>
    </>
  )
}

interface Props {
  themeType?: 'azure'
}
export default function Logo ({ themeType }: Props): ReactElement {
  const isAzure = themeType === 'azure'
  const emblemSize = { base: 10, xl: 12 }

  // const logoLabel = logoLabels[locale]

  return (
    <HStack spacing={2} whiteSpace={'nowrap'}>
      <Box
        bgImage={isAzure ? 'url(/assets/logoDark.svg)' : 'url(/assets/logo.svg)'}
        bgSize={'contain'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        h={emblemSize}
        minW={emblemSize}
        w={emblemSize}
      />
      <Box
        color={isAzure ? 'palette.common.darkGray' : '#39A449'}
        fontSize={{ base: 'sm', xl: 'md' }}
        lineHeight={{ base: 'normal', xl: '20px' }}
      >
        <Text
          letterSpacing={'1px'}
          fontSize={'21px'}
          fontWeight={'700'}
        >
              E-AGROSAVDO
        </Text>
        <Text
          sx={{
            fontSize: '8px',
            marginTop: '-8px',
            fontWeight: '600'
          }}>ELEKTRON AGROSANOAT BOZORI PORTALI</Text>
      </Box>
    </HStack>
  )
}

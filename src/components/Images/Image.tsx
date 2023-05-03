import { ReactElement, ReactNode } from 'react'
import NextImage from 'next/image'
import { Box, BoxProps } from '@chakra-ui/react'
import { ImageProps } from 'next/dist/client/image'

interface Props extends BoxProps {
  src: string
  alt?: string
  imageProps?: ImageProps
  className?: string
  children?: ReactNode
  objectFit?: NonNullable<JSX.IntrinsicElements['img']['style']['objectFit']>
  objectPosition?: NonNullable<JSX.IntrinsicElements['img']['style']['objectPosition']>
}

function Image (props: Props): ReactElement {
  const { alt, src, children, imageProps, className = '', objectFit, objectPosition, ...restProps } = props

  return (
    <Box
      bgGradient={'linear(to-tr, gray.50, gray.200)'}
      pos={'relative'}
      title={alt}
      overflow={'hidden'}
      {...restProps}>
      {children && (
        <Box pos={'relative'} zIndex={1}>{children}</Box>
      )}
      {src && (
        <NextImage
          alt={alt}
          src={src}
          className={['next-image', className].join(' ')}
          role={alt ? undefined : 'presentations'}
          // @ts-ignore
          layout={'fill'}
          objectFit={objectFit}
          objectPosition={objectPosition}
          {...imageProps}
        />
      )}
    </Box>
  )
}

Image.defaultProps = {
  objectFit: 'cover',
  objectPosition: 'center'
}

export default Image

import { ReactElement } from 'react'

import Image from './Image'

interface Props {
  alt: string
  src: string
  height?: string | number
}

function DetailImage (props: Props): ReactElement {
  const { src, alt, height } = props

  return (
    <Image
      alt={alt}
      src={src}

      bgColor={'gray.200'}
      h={height}
      mb={9}
      pos={'relative'}
      overflow={'hidden'}
      borderRadius={'2xl'}
    />
  )
}

DetailImage.defaultProps = {
  height: '230px'
}

export default DetailImage

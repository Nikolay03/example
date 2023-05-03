import { ReactElement } from 'react'
import { Button, Flex, Link } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { TFile } from '~/types/files'

interface Props {
  file: TFile | null
  onClear: (fileId: number) => void
}

export default function FileItem (props: Props): ReactElement {
  const { file, onClear } = props

  const { t } = useTranslate()

  return (
    <Flex align={'center'} mt={3}>
      <Link
        isExternal={true}
        href={file.file}
        noOfLines={1}
        title={file.name}>
        {file.name}
      </Link>
      <Button
        colorScheme={'red'}
        minW={'auto'}
        ml={4}
        variant={'link'}
        onClick={onClear.bind(null, file.id)}>
        {t('button_remove_file')}
      </Button>
    </Flex>
  )
}

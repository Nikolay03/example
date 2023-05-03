import { ReactElement, FC } from 'react'
import { equals, includes, prop } from 'ramda'
import { Box, Flex, Icon, Link, Stack, IconProps } from '@chakra-ui/react'

import { TFile } from '~/types/files'
import { humanizeFileSize } from '~/utils/file'
import { useTranslate } from '~/utils/translate'
import DocSimpleWord from '~/icons/DocSimpleWord'
import DocSimpleExcel from '~/icons/DocSimpleExcel'
import DocSimplePdf from '~/icons/DocSimplePdf'

function getFileIcon (format: string): FC<IconProps> {
  if (includes(format, ['doc', 'docx'])) {
    return DocSimpleWord
  }
  if (includes(format, ['xls', 'xlsx'])) {
    return DocSimpleExcel
  }
  if (equals('pdf', format)) {
    return DocSimplePdf
  }

  return DocSimpleWord
}

interface Props {
  file: TFile
  name?: string
}

export default function TradeDocument (props: Props): ReactElement {
  const { file, name } = props

  const { t } = useTranslate()

  const fileSrc = prop('file', file)
  const fileName = name || prop('name', file)
  const fileFormat = prop('format', file)
  const fileSize = humanizeFileSize(prop('size', file))
  const fileIcon = getFileIcon(fileFormat)

  return (
    <Box
      as={Link}
      border={'1px solid'}
      borderColor={'gray.200'}
      borderRadius={'xl'}
      isExternal={true}
      href={fileSrc}
      px={6}
      py={4}
      _hover={{ textDecor: 'none' }}>
      <Flex align={'center'}>
        <Icon as={fileIcon} boxSize={9} />
        <Stack lineHeight={'none'} ml={3} spacing={1}>
          <Box fontWeight={'semibold'} noOfLines={1}>{fileName}</Box>
          <Box color={'gray.500'} fontSize={'sm'}>
            {t('common_file_size')}: {fileSize}
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}

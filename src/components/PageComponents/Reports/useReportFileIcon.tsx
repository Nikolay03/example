import { ReactElement } from 'react'
import { equals, includes } from 'ramda'

import DocWord from '~/icons/DocWord'
import DocExcel from '~/icons/DocExcel'
import DocPdf from '~/icons/DocPdf'
import DocDefault from '~/icons/DocDefault'

export default function useReportFileIcon (format: string): ReactElement {
  function getReportFileIcon () {
    if (includes(format, ['doc', 'docx'])) {
      return <DocWord />
    }
    if (includes(format, ['xls', 'xlsx'])) {
      return <DocExcel />
    }
    if (equals('pdf', format)) {
      return <DocPdf />
    }

    return <DocDefault />
  }

  return getReportFileIcon()
}

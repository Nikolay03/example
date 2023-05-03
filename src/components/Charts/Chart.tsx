import { ReactElement } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

interface Props<T> extends HighchartsReact.Props {
  data?: any
}
function Chart<T> ({ ...props }: Props<T>): ReactElement {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }
  return (
    <HighchartsReact
      highcharts={Highcharts}
      {...props}
    />
  )
}

export default Chart

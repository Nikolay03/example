import { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'

import { USER_SERVICE_LIST } from '~/constants/api'
import { TAccountService } from '~/types/services'
import { useRequest } from '~/hooks/api'
import { ServicesInlineGrid, ServiceCardInline } from '~/components/PageComponents/Services'
import Pagination from '~/components/Pagination'

export default function ServicesList (): ReactElement {
  const { results, isLoading, count } = useRequest<TAccountService>(USER_SERVICE_LIST)

  return (
    <Fragment>
      <ServicesInlineGrid isLoading={isLoading}>
        {results.map(item => (
          <ServiceCardInline
            key={prop('id', item)}
            data={prop('service', item)}
          />
        ))}
      </ServicesInlineGrid>

      <Pagination totalRecords={count} />
    </Fragment>
  )
}

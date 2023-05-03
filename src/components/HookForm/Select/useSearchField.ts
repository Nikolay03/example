import { find, path, prop, propEq } from 'ramda'

import { useTranslate } from '~/utils/translate'
import { getDataFromSuccess, getDataFromError } from '~/hooks/api/utils'
import { useToast } from '~/hooks/index'
import { useAxiosRequest } from '~/hooks/api'
import { TObject, TSelectListItem } from '~/types/constants'

export type GetOptions = (search: string) => Promise<any[]>
export type GetOption = (id: number) => Promise<void>

interface UseSearchFieldOptions {
  api: string
  detailApi?: string
  params?: TObject
  pageSize?: number
  onSuccess?: (list) => void
}

interface UseSearchField {
  getOptions: GetOptions
  getOption: GetOption
}

export function useSearchField (options: UseSearchFieldOptions): UseSearchField {
  const { api, detailApi, params, pageSize, onSuccess } = options

  const { t } = useTranslate()

  const toast = useToast()

  const request = useAxiosRequest()

  function getOptions (search) {
    const formedParams = { pageSize, search, ...params }
    return request.get(api, formedParams)
      .then(resp => {
        const data = prop('data', resp)
        const results = prop('results', data)
        const list = results || data || []

        if (onSuccess) {
          onSuccess(list)
        }

        return list
      })
      .catch(error => {
        const errorStatus = path(['response', 'status'], error)

        toast({
          title: t('error_default_label'),
          description: errorStatus,
          status: 'error'
        })

        return []
      })
  }

  function getOption (id: number) {
    const url = `${detailApi || api}${id}/`
    return request.get(url)
      .then(getDataFromSuccess)
      .catch(getDataFromError)
  }

  return {
    getOptions,
    getOption
  }
}

type StaticOption = {
  label: string
  value: string
}
export type GetStaticOptions = () => Promise<TSelectListItem[]>
export type GetStaticOption = (id: string | number) => Promise<TSelectListItem>
export type FilterOption = (option: StaticOption, input: string) => boolean

interface UseStaticSearchField {
  getStaticOptions: GetStaticOptions
  getStaticOption: GetStaticOption
  filterOption: FilterOption
}

export function useStaticSearchField (list: TSelectListItem[]): UseStaticSearchField {
  function getStaticOptions () {
    return Promise.resolve(list)
  }

  function getStaticOption (id) {
    const foundListItem = find<TSelectListItem>(propEq('id', id))(list)
    return Promise.resolve(foundListItem)
  }

  function filterOption (option: StaticOption, input: string) {
    const words = input.split(' ')

    function reducer (acc, cur) {
      const label = prop('label', option)
      return (acc && label) && label.toLowerCase().includes(cur.toLowerCase())
    }

    return words.reduce(reducer, true)
  }

  return {
    getStaticOptions,
    getStaticOption,
    filterOption
  }
}

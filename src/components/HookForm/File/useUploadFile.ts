import { ChangeEvent, ChangeEventHandler, RefObject } from 'react'
import { path } from 'ramda'
import { ControllerRenderProps } from 'react-hook-form'

import useUploadReducer, { UploadActionTypes, UploadState } from './useUploadReducer'

import * as API from '~/constants/api'
import { useAxiosRequest } from '~/hooks/api'
import { TFile } from '~/types/files'

function getErrorMessage (error): string {
  const status = path<number>(['response', 'status'], error)
  const errorData = path<string>(['response', 'data'], error)

  switch (status) {
    case 500:
      return 'Ошибка сервера'
    case 413:
      return 'Размер файла слишком большой'
    default:
      return errorData
  }
}

interface UseUploadFileParams {
  field: ControllerRenderProps
  inputRef: RefObject<HTMLInputElement>
  isMulti?: boolean
}

interface UseUploadFile {
  state: UploadState
  onInputChange: ChangeEventHandler<HTMLInputElement>
  onClear: (id: number) => void
}

export default function useUploadFile (params: UseUploadFileParams): UseUploadFile {
  const { field, inputRef, isMulti } = params

  const request = useAxiosRequest()

  const [state, dispatch] = useUploadReducer()

  const inputElement = inputRef.current

  function onInputChange (event: ChangeEvent<HTMLInputElement>) {
    function onUploadProgress (progressEvent) {
      const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      dispatch({
        type: UploadActionTypes.UPLOADING,
        payload: percentCompleted
      })
    }

    const eventTarget = event.target as HTMLInputElement
    const file = eventTarget.files?.[0]
    const formData = new FormData()

    if (!event.target.value.length) {
      return event.preventDefault()
    }

    if (file) {
      if (!isMulti) {
        field.onChange(null)
      }

      formData.append('file', file)
      dispatch({ type: UploadActionTypes.PENDING })

      request.upload(API.FILE_CREATE, formData, onUploadProgress)
        .then(response => {
          const uploadedFile: TFile = response.data

          dispatch({ type: UploadActionTypes.SUCCESS })

          if (isMulti) {
            const prevValue: TFile[] = field.value || []
            field.onChange([...prevValue, uploadedFile])
          }
          else {
            field.onChange(uploadedFile)
          }

          return response
        })
        .catch(serverError => {
          const errorMessage = getErrorMessage(serverError)
          inputElement.value = ''

          dispatch({
            type: UploadActionTypes.FAIL,
            payload: errorMessage
          })
        })
    }
  }

  function onClear (id: number) {
    inputElement.value = ''

    if (isMulti) {
      field.onChange(field.value?.filter((file: TFile) => {
        return file.id !== id
      }))
    }
    else {
      field.onChange(null)
    }
  }

  return { state, onInputChange, onClear }
}

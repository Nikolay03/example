import { ReactElement, useRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Paperclip } from 'react-feather'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack, ButtonProps
} from '@chakra-ui/react'
import { isEmpty, join, not, prop, propOr } from 'ramda'

import useUploadFile from '../useUploadFile'

import FileItem from './FileItem'

import { UploadFileTypes } from '~/types/enums'
import { FormFieldProps } from '~/types/components'
import { TFile } from '~/types/files'
import { useTranslate } from '~/utils/translate'
import { useFieldError } from '~/components/HookForm'

const acceptFileTypes = [
  UploadFileTypes.WORD,
  UploadFileTypes.EXCEL,
  UploadFileTypes.POWER_POINT,
  UploadFileTypes.PDF,
  UploadFileTypes.TEXT,
  UploadFileTypes.IMAGES
]

interface Props extends FormFieldProps<ButtonProps> {
  accept?: string | string[]
  isMulti?: boolean
  maxFiles?: number
}

function FileUpload (props: Props): ReactElement {
  const {
    name,
    label,
    accept,
    isMulti,
    isRequired,
    maxFiles,
    ...restProps
  } = props

  const { t } = useTranslate()

  const inputRef = useRef<HTMLInputElement>()

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: isMulti ? [] : ''
  })

  const errorMessage = useFieldError(fieldState.error)

  const { state, onInputChange, onClear } = useUploadFile({
    field,
    inputRef,
    isMulti
  })

  function handleClick () {
    inputRef.current.click()
  }

  const fieldValue: TFile = prop('value', field) || null
  const fieldValueMulti: TFile[] = propOr([], 'value', field)

  const formedAcceptFile = Array.isArray(accept) ? join(',', accept) : accept
  const loadingText = t('button_upload_file_loading', { progress: state.progress }) + '%'
  const isDisabled = isMulti && fieldValueMulti.length === maxFiles

  return (
    <Box>
      <FormControl
        id={name}
        isRequired={isRequired}
        isInvalid={fieldState.invalid}>
        {label && (
          <FormLabel
            as={'label'}
            display={'block'}
            fontWeight={'medium'}
            mb={2}>
            {label}
          </FormLabel>
        )}
        <Input
          ref={inputRef}
          accept={formedAcceptFile}
          display={'none'}
          name={name}
          type={'file'}
          pos={'absolute'}
          onChange={onInputChange}
          isRequired={false}
        />
        <Button
          colorScheme={'gray'}
          isDisabled={isDisabled}
          isLoading={state.isLoading}
          loadingText={loadingText}
          leftIcon={<Paperclip />}
          size={'xl'}
          {...restProps}
          onClick={isDisabled ? null : handleClick}>
          {t('button_upload_file')}
        </Button>
        {isMulti
          ? not(isEmpty(fieldValueMulti)) && (
            <Stack spacing={4}>
              {fieldValueMulti.map(file => (
                <FileItem key={file.id} file={file} onClear={onClear} />
              ))}
            </Stack>
          )
          : fieldValue && (
            <FileItem file={fieldValue} onClear={onClear} />
          )}

        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

FileUpload.defaultProps = {
  accept: acceptFileTypes,
  isMulti: false
}

export default FileUpload

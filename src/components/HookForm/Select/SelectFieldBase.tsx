// @ts-nocheck todo
import { ReactElement, useEffect, useReducer } from 'react'
import { eqBy, isNil, not, prop, unionWith } from 'ramda'
import { useController, useFormContext } from 'react-hook-form'
import { Props as RSProps } from 'react-select'

import FormControl from '../FormControl'

import { getIdFromValue, getSelectedOption, onFetchData } from './utils'
import { GetOption, GetOptions, GetStaticOption, GetStaticOptions } from './useSearchField'

import { useTranslate } from '~/utils/translate'
import { useDebounce, usePrevious } from '~/hooks/index'
import Select from '~/components/Select'
import { FormFieldProps } from '~/types/components'
import DisabledWrapper from '~/components/HookForm/DisabledWrapper'

function reducer (state, action) {
  return { ...state, ...action }
}

const initialState = {
  options: [],
  isDirty: false,
  isLoading: false,
  query: null
}

interface Props extends FormFieldProps, Omit<RSProps, 'name'> {
  getOptions: GetOptions | GetStaticOptions
  getOption: GetOption | GetStaticOption
}

export default function SearchFieldBase (props: Props): ReactElement {
  const {
    name,
    parent,
    label,
    rules,
    getOption,
    getValue,
    getText,
    isRequired,
    isDisabled,
    isStatic,
    isMulti,
    ...restProps
  } = props

  const { t } = useTranslate()
  const [state, dispatch] = useReducer(reducer, initialState)

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })

  const { ref, value, ...restField } = field
  const { error, invalid } = fieldState

  const selectedOption = getSelectedOption(state.options, value, isStatic)
  const inputValueId = getIdFromValue(value)
  const debouncedQuery = useDebounce(state.query, 500)
  const prevParent = usePrevious(parent)

  const onMenuOpen = () => {
    if (!state.isDirty) {
      onFetchData(state, dispatch, props)
    }
  }

  useEffect(() => {
    if (parent !== prevParent && prevParent) {
      restField.onChange(null)
    }
    if (parent) {
      onFetchData(state, dispatch, props)
    }
  }, [parent, prevParent])

  useEffect(() => {
    if (not(isNil(debouncedQuery))) {
      onFetchData(state, dispatch, props)
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (inputValueId && !isMulti) {
      dispatch({ isLoading: true })
      getOption(inputValueId)
        .then(item => {
          if (item) {
            const option = {
              id: getValue(item),
              name: getText(item)
            }

            const options = unionWith(
              eqBy(prop('id')),
              state.options,
              [option]
            )
            dispatch({ options })
          }

          dispatch({ isLoading: false })
        })
    }
  }, [inputValueId])

  const onInputChange = (query, { action }) => {
    if (action === 'set-value' && not(isNil(state.query))) {
      dispatch({ query: '' })
    }
    if (action === 'input-change') {
      if (!state.isDirty) {
        dispatch({ isDirty: true })
      }
      dispatch({ query })
    }
  }

  function getOptionLabel (option) {
    const name = prop('name', option)

    if (isStatic) return t(name) || name
    return name
  }

  const selectDefaultProps = {
    ...restProps,
    options: state.options,
    isLoading: state.isLoading,
    getOptionLabel,
    getOptionValue: prop('id'),
    onMenuOpen,
    onInputChange
  }
  return (
    <DisabledWrapper isDisabled={isDisabled}>
      <FormControl
        id={name}
        error={error}
        isInvalid={invalid}
        isRequired={isRequired}
        label={label}>
        <Select
          isMulti={isMulti}
          innerRef={ref}
          inputId={name}
          isInvalid={invalid}
          value={isMulti ? value : selectedOption}
          {...selectDefaultProps}
          {...restField}
        />
      </FormControl>
    </DisabledWrapper>
  )
}

import { FormEvent, HTMLProps, ReactElement, useCallback, useMemo } from 'react'
import { ChevronDown } from 'react-feather'
import { getCountryCallingCode } from 'react-phone-number-input'
import { Flex, Icon as ChakraIcon } from '@chakra-ui/react'

const Select = (props) => (
  <select
    style={{
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      height: '100%',
      width: '100%',
      zIndex: 0
    }}
    {...props}
  />
)

function getCountryPhonePrefix (country) {
  if (!country) return ''
  const code = getCountryCallingCode(country)
  return `+${code}`
}

type SelectOption = {
  value: string
  label: string
  divider?: boolean
}

interface CountrySelectProps extends HTMLProps<HTMLSelectElement> {
  value?: string
  onChange: (event: FormEvent<HTMLSelectElement>) => void
  options: SelectOption[]
}

interface CountrySelectWithIconProps extends CountrySelectProps {
  iconComponent: ReactElement
}

export default function CountrySelect (props: CountrySelectProps): ReactElement {
  const { value, onChange, options, ...rest } = props

  const internationalValue = 'ZZ'
  const selectValue = value || internationalValue

  const onChangeSelect = useCallback((event) => {
    const value = event.target.value
    onChange(value === internationalValue ? undefined : value)
  }, [onChange])

  return (
    <Select
      {...rest}
      value={selectValue}
      onChange={onChangeSelect}>
      {options.map(option => {
        const { value, label, divider } = option
        const code = getCountryPhonePrefix(value)
        const fullLabel = code ? `${label} (${code})` : label

        return (
          <option
            key={divider ? '|' : value || internationalValue}
            value={divider ? '|' : value || internationalValue}
            disabled={!!divider}
            style={divider ? DIVIDER_STYLE : undefined}>
            {fullLabel}
          </option>
        )
      })}
    </Select>
  )
}

const DIVIDER_STYLE = {
  fontSize: '1px',
  backgroundColor: 'currentColor',
  color: 'inherit'
}

export function CountrySelectWithIcon (props: CountrySelectWithIconProps): ReactElement {
  const {
    value,
    options,
    onChange,
    iconComponent: Icon
  } = props

  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value)
  }, [options, value])

  return (
    <Flex
      align={'center'}
      alignSelf={'stretch'}
      mr={2}>
      <CountrySelect
        value={value}
        options={options}
        onChange={onChange}
      />
      {value && (
        // @ts-ignore
        <Icon
          country={value}
          label={selectedOption && selectedOption.label}
        />
      )}

      <ChakraIcon as={ChevronDown} boxSize={5} ml={1} />
    </Flex>
  )
}

function getSelectedOption (options: SelectOption[], value: string): SelectOption | undefined {
  for (const option of options) {
    if (!option.divider && option.value === value) {
      return option
    }
  }
}

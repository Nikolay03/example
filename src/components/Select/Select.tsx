// todo
/* eslint-disable react/prop-types */
import { ReactElement, useState } from 'react'
import ReactSelect from 'react-select'

import defaultComponents from '~/components/CustomSelect/components'
import useSelectMessages from '~/components/CustomSelect/useSelectMessages'
import useSelectStyles from '~/components/CustomSelect/useSelectStyles'
import useSelectTheme from '~/components/CustomSelect/useSelectTheme'

function getMenuPortalTarget () {
  if (typeof document !== 'undefined') return document.body
  return null
}

function Select (props): ReactElement {
  const {
    closeMenuOnSelect,
    components,
    innerRef,
    options,
    onMenuOpen,
    onMenuClose,
    onChange,
    ...restProps
  } = props

  const {
    isLoading,
    isInvalid,
    placeholder,
    size,
    variant,
    ...selectProps
  } = restProps

  const [openMenu, setOpenMenu] = useState(false)
  const { loadingMessage, noOptionsMessage } = useSelectMessages()
  const styles = useSelectStyles({ size, variant, isInvalid })
  const getTheme = useSelectTheme({ size, variant })

  function handleMenuOpen () {
    setOpenMenu(true)
    if (typeof onMenuOpen === 'function') {
      onMenuOpen()
    }
  }

  function handleMenuClose () {
    setOpenMenu(false)
    if (typeof onMenuClose === 'function') {
      onMenuClose()
    }
  }

  function onChangeSelect (option) {
    if (typeof onChange === 'function') {
      onChange(option)
    }
  }

  const menuIsOpen = isLoading ? false : openMenu
  const formedPlaceholder = placeholder || null

  const formedComponents = {
    ...components,
    ...defaultComponents
  }

  return (
    <ReactSelect
      components={formedComponents}
      ref={innerRef}
      type={'select'}
      options={options}
      styles={styles}
      theme={getTheme}
      blurInputOnSelect={closeMenuOnSelect}
      closeMenuOnSelect={closeMenuOnSelect}
      isLoading={isLoading}
      menuIsOpen={menuIsOpen}
      menuPortalTarget={getMenuPortalTarget()}
      placeholder={formedPlaceholder}
      openMenuOnFocus={true}
      noOptionsMessage={noOptionsMessage}
      loadingMessage={loadingMessage}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      onChange={onChangeSelect}
      {...selectProps}
    />
  )
}

Select.defaultProps = {
  closeMenuOnSelect: true,
  components: {},
  size: 'md',
  variant: 'filled'
}

export default Select

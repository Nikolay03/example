export const defaultProps = {
  colorScheme: 'primary',
  errorBorderColor: 'palette.common.red',
  focusBorderColor: 'primary.500',
  variant: 'filled'
}

export const sizes = {
  sm: {
    field: {
      borderRadius: 'lg',
      h: '32px'
    }
  },
  md: {
    field: {
      borderRadius: 'lg',
      fontWeight: 'inherit',
      h: '44px'
    },
    addon: {
      borderRadius: 'lg',
      h: '44px'
    }
  },
  lg: {
    field: {
      borderRadius: 'lg',
      fontSize: 'md',
      fontWeight: 'inherit',
      h: '48px'
    },
    addon: {
      borderRadius: 'lg',
      fontSize: 'md',
      h: '48px'
    }
  },
  xl: {
    field: {
      borderRadius: 'xl',
      fontSize: 'md',
      fontWeight: 'inherit',
      h: '48px',
      px: 6
    },
    addon: {
      borderRadius: 'xl',
      fontSize: 'md',
      h: '48px'
    }
  }
}

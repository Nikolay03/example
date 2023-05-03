export default {
  variants: {
    enclosed: {
      tablist: {
        borderBottom: null,
        mb: null
      },
      tab: {
        bg: 'whiteAlpha.600',
        border: null,
        borderTopStartRadius: 'xl',
        borderTopEndRadius: 'xl',
        color: 'palette.text.default',
        fontWeight: 'semibold',
        mb: null,
        py: 4,
        px: 8,
        outline: null,
        _focus: {
          boxShadow: null
        },
        _selected: {
          bg: 'gray.100',
          color: 'palette.text.default'
        }
      },
      tabpanel: {
        bg: 'gray.100',
        borderTopEndRadius: '2xl',
        borderBottomStartRadius: '2xl',
        borderBottomEndRadius: '2xl',
        px: 6,
        py: 8
      }
    }
  }
}

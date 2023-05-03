export default {
  baseStyle: {
    button: {
      bg: 'white',
      borderTopRadius: '2xl',
      fontSize: 'lg',
      fontWeight: 'semibold',
      px: { base: 4, md: 6 },
      py: { base: 4, md: 6 },
      textAlign: 'left',
      _hover: {
        bg: 'white'
      },
      _focus: {
        boxShadow: 'none'
      }
    },
    container: {
      bgColor: 'white',
      borderColor: 'gray.200',
      borderWidth: 1,
      borderRadius: { base: 'lg', md: '2xl' },
      px: 0,
      overflow: 'hidden'
    },
    panel: {
      borderTop: '1px solid',
      borderColor: 'gray.200',
      fontWeight: 'normal',
      lineHeight: 'base',
      px: { base: 4, md: 6 },
      py: { base: 4, md: 6 }
    }
  }
}

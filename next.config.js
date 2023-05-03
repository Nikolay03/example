const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  distDir: 'build',

  i18n: {
    locales: ['ru', 'uz'],
    defaultLocale: 'ru'
  },

  images: {
    domains: [
      'stagingapi.agroetp.uz',
      'alfaapi.agroetp.uz'
    ]
  }
})

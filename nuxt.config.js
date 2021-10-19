export default {
  loading: false,
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog_Bruce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/api-plugins',
    '~/plugins/toast',
    '~/plugins/filter',
    '~/plugins/v-md-preview',
    { src: "~plugins/persistedstate.js", ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {
        // 重写上方的/api地址 
        '^/api': '',
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    plugins: [
      'utc' // import 'dayjs/plugin/utc'
    ] // Your Day.js plugin
  }
}

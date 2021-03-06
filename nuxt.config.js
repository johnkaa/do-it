export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'do-it',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: '/images/logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Rubik:wght@400;500;700&display=swap' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~node_modules/swiper/css/swiper.css',
    '~assets/styles/style'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/swiper', mode: 'client' },
    { src: '~plugins/vuelidate', mode: 'client' },
    { src: '~plugins/v-calendar', mode: 'client' },
    { src: '~plugins/toast', mode: 'client' },
    { src: '~plugins/flags', mode: 'client' },
  ],

  loading: '~/components/Loader',
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://firebase.nuxtjs.org/
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAzrqOOibxUJ6jVh1zOELkKzuRwzbCAEOA",
          authDomain: "doit-8389f.firebaseapp.com",
          databaseURL: "https://doit-8389f-default-rtdb.firebaseio.com",
          projectId: "doit-8389f",
          storageBucket: "doit-8389f.appspot.com",
          messagingSenderId: "782696520349",
          appId: "1:782696520349:web:38e57f2ce839ebd7d19274"
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: true
          },
          database: true,
          storage: true
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Doit Beta',
      lang: 'en'
    },
    icon: {
      source: '/images/logo.png'
    },
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js'
      ],
      dev: process.env.NODE_ENV === 'development',
    }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

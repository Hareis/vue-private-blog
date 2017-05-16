import Vue from 'vue'
import VueMaterial from 'vue-material'
import router from './router'
import App from './App.vue'
import filter from './utils/filter'

// import material css
import 'vue-material/dist/vue-material.css'

// setup Vue filter
filter(Vue)

// use VueMaterial
Vue.use(VueMaterial)

// whether to allow vue-devtools inspection
// false in production builds
Vue.config.devtools = process.env.NODE_ENV !== 'production'

const app = new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})

export { app, router }

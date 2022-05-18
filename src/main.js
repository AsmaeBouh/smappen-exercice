import { createApp } from 'vue'
import SmappenMapSearch from './SmappenMapSearch.vue'
import { loadFonts } from './plugins/webfontloader'
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';

import { companiesURL,geoDataUrl,geoDataUrlFilters,apiKey,inseeUrlFilters } from './global'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'


import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

loadFonts()
const app = createApp(SmappenMapSearch)
//provides not working figure out why !??
  app.provide('companiesURL',companiesURL)
  app.provide('geoDataUrl',geoDataUrl)
  app.provide('geoDataUrlFilters',geoDataUrlFilters)
  app.provide('inseeUrlFilters',inseeUrlFilters)
  app.provide('apiKey',apiKey)
  app.use(VueHighcharts, { Highcharts });
  app.use(Quasar,quasarUserOptions)
  app.use(VueAxios,axios)
  app.use(store)
  app.mount('#app')

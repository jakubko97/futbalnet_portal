import Vue from 'vue'
import { cfg } from './config'
import axios from 'axios'

const xapi = axios.create({
    baseURL: cfg.api_url,
    headers: {
      Accept: 'application/json, text/plain, */*'
    }
})

const xapi2 = axios.create({
  baseURL: cfg.api_url2,
  headers: {
    Accept: 'application/json, text/plain, */*'
  }
})

export default {xapi , xapi2}

Vue.prototype.$apiV1 = xapi
Vue.prototype.$apiV2 = xapi2
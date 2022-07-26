// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import theme from './theme'

Vue.use(Vuetify)

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme
})

export default vuetify
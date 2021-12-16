require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import router from './router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import draggable from 'vuedraggable';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Paginate from 'vuejs-paginate';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
// import TW from 'vee-validate/dist/locale/zh_TW.json';

library.add( faBars, faTimes, faEdit, faCalendarAlt );

Vue.component('Loading', Loading);
Vue.component('draggable', draggable);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('paginate', Paginate);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

// 安裝所有 vee-validate 規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'],
  },
});

export default new Vue({
  el: '#app',
  router,
  store
});
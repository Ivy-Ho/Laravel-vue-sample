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

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add( faBars, faTimes, faEdit );

Vue.component('Loading', Loading);
Vue.component('draggable', draggable);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueAxios, axios);

export default new Vue({
    el: '#app',
    router,
    store
});
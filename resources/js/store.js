import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    Loaded: false,
    users: [],
    isLoading: false,
  },
  actions: {
    GetUsers({commit}) {
      axios.get('https://randomuser.me/api/?results=5')
        .then(function (res) {
          console.log(res);
          let data = res.data.results;
          commit('SetLoaded', true);
          commit('SetIsloading', false);
          commit('SetUserInfo', data);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
  },
  mutations: {
    SetLoaded(state, status) {
      state.Loaded = status;
    },
    SetIsloading(state, status) {
      state.isLoading = status;
    },
    SetUserInfo(state, payload) {
      state.users = payload;
    },
  },
  getters: {
    maleData(state) {
      return state.users.filter(item => item.gender == 'male');
    },
    femaleData(state) {
      return state.users.filter(item => item.gender == 'female');
    },

  },
})
export default store;
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
    GetUser({commit}) {
      axios.get('https://randomuser.me/api/?results=5')
        .then(function (res) {
          console.log(res);
          let data = res.data.results;
          commit('MyMutations');
          commit('SetUserInfo', data);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    updateLoading(context, status){
      context.commit('LOADING', status);
    },
  },
  mutations: {
    MyMutations(state) {
      console.log('MyMutations run!');
      state.Loaded = true;
    },
    SetFalse(state) {
      state.Loaded = false;
    },
    SetUserInfo(state, payload) {
      state.users = payload;
    },
    LOADING(state, status) {
			state.isLoading = status;
		},
  },
  getters: {
    maleData(state) {
      return state.users.filter(item => item.gender == 'male');
    }
  },
})
export default store;
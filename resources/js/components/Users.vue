<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div>
        <p>user api Loaded: {{ Loaded }}</p>
        <button @click="Reload()" class="mb-3">Reload</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div>
        <div class="card-deck">
          <div class="card" v-for="(item) in maleData" :key="item.login.uuid">
            <!-- <img :src="item.picture.large" class="card-img-top" alt="..."> -->
            <div class="card-body">
              <h5 class="card-title">{{ item.name.first}} {{ item.name.last }}</h5>
              <p class="card-text">age: {{ item.dob.age }}</p>
              <p class="card-text">email: {{ item.email }}</p>
              <p class="card-text">phone: {{ item.phone }}</p>
              <p class="card-text">country: {{ item.location.country }}</p>
              <p class="card-text">city: {{ item.location.city }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters} from "vuex";
export default {
  mounted() {
    this.GetUser();
  },
  computed: {
    ...mapState(["Loaded", "users", "isLoading"]),
    ...mapGetters(["maleData"]),
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    Reload() {
      this.$store.commit("SetFalse");
      this.$store.dispatch('updateLoading', true);
      this.GetUser();
      this.$store.dispatch('updateLoading', false);
    },
    ...mapActions(["GetUser"]),
  },
}
</script>
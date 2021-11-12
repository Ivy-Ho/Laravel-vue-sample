<template>
  <div class="container">
    <div class="d-flex justify-content-center text-center">
      <div>
        <p>user api Loaded: {{ Loaded }}</p>
        <button @click="Reload()" class="mb-3">Reload</button>
      </div>
    </div>
    <div v-if="Loaded" class="card-wrapper">
      <h2>Male :</h2>
      <div class="row justify-content-center mb-5">
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
    </div>

    <div v-if="Loaded" class="card-wrapper">
      <h2>Female :</h2>
      <div class="row justify-content-center">
        <div>
          <div class="card-deck">
            <div class="card" v-for="(item) in femaleData" :key="item.login.uuid">
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
    </div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters} from "vuex";
export default {
  mounted() {
    this.$store.commit("SetIsloading", true);
    this.GetUsers();
  },
  computed: {
    ...mapState(["Loaded", "users", "isLoading"]),
    ...mapGetters(["maleData", "femaleData"]),
  },
  methods: {
    Reload() {
      this.$store.commit("SetLoaded", false);
      this.$store.commit("SetIsloading", true);
      this.GetUsers();
    },
    ...mapActions(["GetUsers"]),
  },
}
</script>
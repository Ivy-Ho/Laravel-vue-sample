<template>
  <div class="container">
    <h3>Dragging{{ draggingInfo }}</h3>
    <form class="mb-5">
      <div class="mb-3">
        <label for="name" class="form-label">name</label>
        <input v-model="newData.name" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="text" class="form-label">text</label>
        <input v-model="newData.text" class="form-control" id="text">
      </div>
      <button type="button" class="btn btn-primary" @click="addItem">Add</button>
    </form>

    <draggable tag="ul" :list="list" class="list-group" handle=".handle" @change="isDragged">
      <li class="list-group-item d-flex align-items-center" v-for="(element, idx) in list" :key="element.name">
        <i class="fa fa-align-justify handle"></i>
        <span class="text">{{ element.name }}</span>
        <!-- <input type="text" class="form-control" v-model="element.text"> -->
        <span class="text">{{ element.text }}</span>
        <i class="fa fa-times close ml-auto" @click="removeItem(idx)"></i>
      </li>
    </draggable>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [
        { name: "Abby", text: "123"},
        { name: "Brandy", text: "456"},
        { name: "Cindy", text: "789"}
      ],
      newData: {
        name: '',
        text: '',
      },
      dragging: false,
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : false;
    },
    ...mapState(["isLoading"]),
  },
  methods: {
    removeItem(idx) {
      this.list.splice(idx, 1);
    },
    addItem() {
      this.list.push({
        name: this.newData.name,
        text: this.newData.text,
      });
      this.newData.name = '';
      this.newData.text = '';
    },
    isDragged() {
      this.$store.commit("SetIsloading", true);
      setTimeout(() => {this.$store.commit("SetIsloading", false);}, 500);
    }
  },
  mounted() {
    
  },
}
</script>

<style scoped>
.button {
  margin-top: 35px;
}
input {
  width: 50%;
}
.text {
  margin: 20px;
}
.list-group-item {
  cursor: move;
}
.close {
  cursor: pointer;
}
</style>
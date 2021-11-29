<template>
  <div class="container">
    <h3>Drag</h3>
    <form class="mb-2 row">
      <div class="mb-3 col-6">
        <label for="name" class="form-label">name</label>
        <input v-model="newData.name" class="form-control" type="text" id="name">
      </div>
      <div class="mb-3 col-6">
        <label for="text" class="form-label">text</label>
        <input v-model="newData.text" class="form-control" type="text" id="text">
      </div>
    </form>
    <div class="d-flex justify-content-end mb-5">
      <button type="button" class="btn btn-primary" @click="addItem">Add</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="col-2"></th>
          <th class="col-3">Name</th>
          <th class="col-3">Text</th>
          <th class="col-2"></th>
          <th class="col-2"></th>
        </tr>
      </thead>
      <draggable tag="tbody" :list="list" handle=".handle" @change="isDragged">
        <tr v-for="(item, idx) in list" :key="item.name" class="align-items-center" height="65px">
          <td class="col-2 align-middle">
            <font-awesome-icon :icon="['fas', 'bars']" class="handle"/>
          </td>
          <td class="col-3 align-middle">
            <span v-if="item.id !== cacheData.id" class="text">{{ item.name }}</span>
            <input v-if="item.id === cacheData.id" type="text" autoFocus class="form-control" v-model="editedData.name">
          </td>
          <td class="col-3 align-middle">
            <span v-if="item.id !== cacheData.id" class="text">{{ item.text }}</span>
            <input v-if="item.id === cacheData.id" type="text" class="form-control" v-model="editedData.text">
          </td>
          <td class="col-2 align-middle">
            <font-awesome-icon :icon="['far', 'edit']" class="edit" @click="editItem(item, idx)"/>
          </td>
          <td class="col-2 align-middle">
            <font-awesome-icon :icon="['fas', 'times']" class="close ml-auto" @click="removeItem(idx)"/>
          </td>
        </tr>
      </draggable>
    </table>

    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [
        { name: "Abbey", text: "123", id: 0},
        { name: "Brandy", text: "456", id: 1},
        { name: "Cindy", text: "789", id: 2},
        { name: "Debby", text: "1010", id: 3}
      ],
      newData: {},
      cacheData: {}, 
      editedData: {},
    }
  },
  computed: {
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
        id: this.list.length
      });
      this.newData = {};
    },
    editItem(item, idx) {
      if(item.id !== this.cacheData.id) {
        this.cacheData = item;
        this.editedData = item;
      }else if(item.id === this.cacheData.id) {
        this.list.splice(idx, this.editedData);
        console.log(this.list);
        this.editedData = {name: '', text: '', id: 0,};
        this.cacheData = {};
      }
    },
    isDragged() {
      this.$store.commit("SetIsloading", true);
      setTimeout(() => {this.$store.commit("SetIsloading", false);}, 500);
    }
  },
}
</script>

<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  cursor: move;
}
.close,
.edit {
  cursor: pointer;
}
</style>
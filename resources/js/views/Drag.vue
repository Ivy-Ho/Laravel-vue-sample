<template>
  <div class="container">
    <h3>Drag</h3>
    <form class="mb-2 row">
      <div class="mb-3 col-6">
        <label for="name" class="form-label">Name</label>
        <input v-model="newData.name" class="form-control" type="text" id="name">
      </div>
      <div class="mb-3 col-6">
        <label for="text" class="form-label">Text</label>
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
      <draggable tag="tbody" :list="display" handle=".handle" @change="isDragged">
        <tr v-for="(item, idx) in display" :key="item.id" class="align-items-center" height="65px">
          <td class="col-2 align-middle">
            <font-awesome-icon :icon="['fas', 'bars']" class="handle"/>
          </td>
          <td class="col-3 align-middle">
            <span v-if="item.id !== cacheData.id" class="text">{{ item.name }}</span>
            <input v-if="item.id === cacheData.id" type="text" autoFocus class="form-control" v-model="editedData.name" @keyup.enter="editItem(item, idx)">
          </td>
          <td class="col-3 align-middle">
            <span v-if="item.id !== cacheData.id" class="text">{{ item.text }}</span>
            <input v-if="item.id === cacheData.id" type="text" class="form-control" v-model="editedData.text" @keyup.enter="editItem(item, idx)">
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

    <pagination
      @updatePageNum="filterByPageNum"
      :pageNum="pageNum"
      :totalPageCount="totalPageCount">
    </pagination>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
import pagination from "../components/Pagination.vue"
let id = 3;
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [
        { name: "Abbey", text: "123", id: 0},
        { name: "Brandy", text: "456", id: 1},
        { name: "Cindy", text: "789", id: 2},
        { name: "Debby", text: "1010", id: 3}
      ],
      display: [],
      newData: {},
      cacheData: {}, 
      editedData: {},
      // 單一頁面資料列總數
      rowsPerPage: 3,
      // 現在指向的分頁頁數 
      pageNum: 1,
      totalPageCount: 0,
    }
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    countTotalPage() {
      this.totalPageCount = Math.ceil( this.list.length / this.rowsPerPage);
    },
    getDisplayData( num=1 ) {
      this.display = this.list.slice(this.rowsPerPage * (num - 1), this.rowsPerPage * num);
    },
    addItem() {
      id += 1;
      this.list.push({
        name: this.newData.name,
        text: this.newData.text,
        id: id
      });
      this.newData = {};
      this.countTotalPage();
      if (this.display.length === this.rowsPerPage) {
        this.filterByPageNum(this.totalPageCount);
      }else {
        this.getDisplayData(this.pageNum);
      }
      this.$swal({
        position: 'center',
        icon: 'success',
        title: 'Saved!',
        showConfirmButton: false,
        timer: 1000
      })
    },
    removeItem(idx) {
      this.$swal({
        title: 'Are you sure you want to delete this?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.list.splice(idx, 1);
          this.countTotalPage();
          this.getDisplayData(this.pageNum);
          if(this.display.length <= 0) {
            this.filterByPageNum(this.pageNum-1);
          }
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    },
    editItem(item, idx) {
      if(item.id !== this.cacheData.id) {
        this.cacheData = item;
        this.editedData = item;
      }else if(item.id === this.cacheData.id) {
        this.list.splice(idx, this.editedData);
        this.editedData = {name: '', text: '', id: 0,};
        this.cacheData = {};
        this.$swal({
          position: 'center',
          icon: 'success',
          title: 'Saved!',
          showConfirmButton: false,
          timer: 1000
        })
      }
      console.log(item.id == this.cacheData.id);
    },
    isDragged() {
      this.$store.commit("SetIsloading", true);
      setTimeout(() => {this.$store.commit("SetIsloading", false);}, 500);
    },
    filterByPageNum(num) {
      this.pageNum = num;
      this.getDisplayData(num);
    },
  },
  mounted() {
    this.countTotalPage();
    this.getDisplayData();
  }
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
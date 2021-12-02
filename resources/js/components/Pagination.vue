<template>
  <paginate
    v-model="currentPageNum"
    :page-count="totalPageCount"
    :click-handler="changePage"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link'"
    :prev-class="'page-item'"
    :next-class="'page-item'"
    :prev-link-class="'page-link'"
    :next-link-class="'page-link'"
    :active-class="'active'">
  </paginate>
</template>
<script>
  export default {
    name: 'pagination',
    props: {
      // 現在指向的分頁頁數
      pageNum: {
        type: Number,
        default: 1,
      },
      // 資料頁數的總數 (資料總數/單頁資料筆數)
      totalPageCount: {
        type: Number,
      }
    },
    computed: {
      currentPageNum: {
        get() {
          return this.pageNum;
        },
        set(newPageNum) {
          return newPageNum;
        }
      }
    },
    methods: {
      changePage (num) {
        this.currentPageNum = num;
        this.$emit('updatePageNum', num);
      }
    }
  }

</script>
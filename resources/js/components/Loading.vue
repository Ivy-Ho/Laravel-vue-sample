<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <h1>hello!</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,  // 預設為 false，loading 效果並未出現
                fullPage: true,
        };
    },
    mounted() {
        this.isLoading = true; //開啟頁面時先執行
        setTimeout(() => {
        this.isLoading = false;  //5 秒後關閉
        }, 3000);
    },
};
</script>
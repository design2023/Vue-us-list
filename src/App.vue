<template>
  <div id="app" >
    <div style ="display: flex; justify-content: center; margin: 15px;">
      
      <router-link to="/" class="router-link-item">صفحة البحث</router-link>
      <router-link to="/update-data" class="router-link-item">تحديث البيانات</router-link>
      <router-link to="/last-transactions" class="router-link-item">عمليات التحديث الأخيرة</router-link>
    </div>
    <v-divider></v-divider>
    <div class="currentPage">
       {{ currentPage }}
    </div>

    <router-view></router-view>
  </div>

</template>

<script>

export default {
  name: "App",
  computed: {
    currentPage() {
            return this.$route.name;
        }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-link-item {
    margin: 0 20px 0px 0px; 
    text-decoration: none;
    font-size: 20px;
  }

  .currentPage{
    font-size: 30px;
    margin: 20px 20px;
  }


</style>

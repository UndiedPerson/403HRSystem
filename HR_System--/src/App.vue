<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  //  Check if the current route is the root path ("/")
  if (router.currentRoute.value.path === '/') {
    //  If it is, redirect to the desired starting route
    router.push('/login'); //  Or any other route you want to start with
  }
});

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 50px;
}
</style>
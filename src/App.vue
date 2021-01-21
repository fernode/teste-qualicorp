<template>
  <div id="app">
    <SearchPlans />
  </div>
</template>

<script>
import SearchPlans from "./components/SearchPlans.vue";

export default {
  name: "App",
  components: {
    SearchPlans,
  },
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
</style>

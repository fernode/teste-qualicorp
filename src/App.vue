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
}

html {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  background: #060369;
  font-family: "Roboto", sans-serif;
}
</style>

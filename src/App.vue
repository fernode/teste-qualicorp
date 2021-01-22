<template>
  <div id="app">
    <Social />
    <SearchPlans />
  </div>
</template>

<script>
import SearchPlans from "./components/SearchPlans.vue";
import Social from "./components/Social.vue";

export default {
  name: "App",
  components: {
    SearchPlans,
    Social,
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
  overflow-x: hidden;
}

body {
  background: #060369;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}
</style>

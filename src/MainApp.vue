<template>
  <div id="app">
    <MainToolbar/>
    <router-view/>
  </div>
</template>

<script>
import MainToolbar from './components/MainToolbar';

export default {
  name: 'MainApp',
  components: {
    MainToolbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: rgb(250, 250, 250);
}
</style>

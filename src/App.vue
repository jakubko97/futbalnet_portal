<template>
  <div id="app">
    <WeatherNow msg=""/>
  </div>
</template>

<script>
import WeatherNow from './components/WeatherNow.vue'

export default {
  name: 'App',
  components: {
    WeatherNow
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>

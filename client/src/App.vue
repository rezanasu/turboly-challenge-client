<template>
  <div id="app">
    <Navbar v-if="login" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    login () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('setLogin', true)
    } else {
      this.$store.commit('setLogin', false)
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  margin: 0;
}
</style>

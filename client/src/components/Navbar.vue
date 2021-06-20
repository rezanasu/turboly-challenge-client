<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">TODO</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add">Add Task</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/deadlines">Deadlines</router-link>
            </li>
          </ul>
        </div>
        <button class="btn btn-danger" @click="logout">LOGOUT</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout () {
        localStorage.clear();
        this.$store.commit('setLogin', false)
        this.$router.push('/login')
    } 
  }
};
</script>

<style>
</style>
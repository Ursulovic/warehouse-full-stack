<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand href="/">Warehouse</b-navbar-brand>

      <b-nav-item-dropdown v-if="token" text="Staff corner" left>

        <b-dropdown-item href="/adminPanel">Users</b-dropdown-item>
        <b-dropdown-item  href="/categoryPanel">Categories</b-dropdown-item>
        <b-dropdown-item  href="/productPanel">Products</b-dropdown-item>
        



      </b-nav-item-dropdown>



      <b-navbar-nav class="ms-auto">
        <b-nav-item v-if="token" to="/checkout">Check out</b-nav-item>
        <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
        <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
        <b-nav-item v-else @click="logout()">Log Out</b-nav-item>

      </b-navbar-nav>



    </b-navbar>
    <router-view />
  </div>
</template>


<script>

import { mapState, mapMutations } from 'vuex';


export default {
  name: 'App',

  computed: {
    ...mapState([
      'token',
      'productsInCart'
    ])
  },

  mounted() {

    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapMutations([
      'removeToken',
      'setToken'
    ]),

    logout() { this.removeToken(); }

  },



}





</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

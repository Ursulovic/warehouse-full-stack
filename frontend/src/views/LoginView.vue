<template>
  <div id="app">

    <b-form>
      <b-form-group label="Email:" label-for="email">
        <b-form-input type="email" id="email" v-model="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="password" type="password" required></b-form-input>
      </b-form-group>

      <b-button  variant="primary" @click="submitLogin()">Submit</b-button>
    </b-form>
  
    <h1>{{this.email}}</h1>
    <h1>{{this.password}}</h1>

  </div>
</template>

<script>


import { mapActions } from 'vuex';


export default {
  name: 'AuthView',

  data() {
    return {
        email: '',
        password: ''
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),


    submitLogin() {
      this.login({email: this.email, password:this.password});
    }


  },

}



</script>

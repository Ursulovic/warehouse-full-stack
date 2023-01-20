<template>
  <div id="app">

    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      
      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'RegisterView',
    

    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.register(this.form);
      }
    }
  }
</script>

<style scoped>

</style>

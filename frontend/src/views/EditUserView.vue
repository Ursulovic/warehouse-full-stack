<template>
  <div>

    <h1>Edit user:</h1><br><br>

    <b-form @submit.prevent>

      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="email"  type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Type:" label-for="Type">
        <b-form-input id="Type" v-model="type" placeholder="Enter users type" type="text" required></b-form-input>
      </b-form-group><br><br>

      <b-button type="submit" variant="primary" @click="editUser()">Submit</b-button>
    </b-form>
  </div>
</template>
  
<script>


export default {
  name: 'EditUser',

  props: {
    user: {}
  },

  data() {
    return {
      email: this.user.email,
      name: this.user.name,
      type: this.user.type,
      id: this.user.id,
    }
  },

  methods : {
    editUser() {
      let obj = {email: this.email, name: this.name, type: this.type};
      console.log(obj);
      fetch(`http://localhost:8000/db/users/edit/${this.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify(obj)
        },).then (res => res.json())
            .then(res => {
              if (res.status === 1) {
                alert('User data changed!!');
                this.$router.push({name:'adminPanel' })
              }
              else {alert('Email already taken!');}
            })
    },
  }

}
</script>
  
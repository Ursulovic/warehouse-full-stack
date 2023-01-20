<template>
    <div>
  
      <h1>Edit Catrgory:</h1><br><br>
  
      <b-form @submit.prevent>
  
        <b-form-group label="Name :" label-for="email">
          <b-form-input id="email" v-model="name"  type="text" placeholder="Enter name" required></b-form-input>
        </b-form-group><br>
  
        <b-form-group label="Description:" label-for="description">
          <b-form-input id="description" v-model="description" placeholder="Enter description" required></b-form-input>
        </b-form-group><br>
  
        <b-form-group label="Average weight:" label-for="avg_weight">
          <b-form-input id="Type" v-model="avg_weight" placeholder="Enter avg_weight" type="text" required></b-form-input>
        </b-form-group><br>

        <b-form-group label="Average price:" label-for="avg_price">
          <b-form-input id="Type" v-model="avg_price" placeholder="Enter avg_price" type="text" required></b-form-input>
        </b-form-group><br>

        <b-form-group label="Tax:" label-for="tax">
          <b-form-input id="Type" v-model="tax" placeholder="Enter tax" type="text" required></b-form-input>
        </b-form-group><br>
  
        <b-button variant="primary" @click="editUser()">Submit</b-button>
      </b-form>
    </div>
  </template>
    
  <script>
  
  
  export default {
    name: 'EditCategory',
  
    props: {
      category: {}
    },
  
    data() {
      return {
        description: this.category.description,
        name: this.category.name,
        avg_weight: this.category.avg_weight,
        avg_price: this.category.avg_price,
        id: this.category.id,
        tax: this.category.tax
      }
    },
  
    methods : {
      editUser() {
        let obj = {description: this.description, name: this.name, avg_weight: this.avg_weight, avg_price: this.avg_price, };
        console.log(obj);
        fetch(`http://localhost:8000/db/categories/${this.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
          body: JSON.stringify(obj)
          },).then (res => res.json())
              .then(res => {
                console.log(res.status);
                if (res.status === 1) {
                  alert('Category data changed!!');
                  this.$router.push({name:'categoryPanel' })
                }
                else {alert('Name already taken!');}
              })
      },
    }
  
  }
  </script>
    
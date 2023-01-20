<template>
    <div class="home">
        <h1>New product</h1><br><br>


        <b-form @submit.prevent>
            <b-form-group label="Name:" label-for="name">
                <b-form-input type="text" id="name" v-model="name" placeholder="Enter name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Description:" label-for="description">
                <b-form-input id="description" v-model="description" type="description" placeholder="Enter description"
                    required></b-form-input>
            </b-form-group>

            <b-form-group label="Price:" label-for="Price">
                <b-form-input id="price" v-model="price" type="number" min="1" placeholder="Enter  price"
                    required></b-form-input>
            </b-form-group>



            <b-button variant="primary" @click="submitNew()">Submit</b-button>
        </b-form>


    </div>
</template>
  
<script>

import Router from '../../router'


export default {
    name: 'newProductview',

    data() {
        return {
            name: '',
            description: '',
            price: 0,
        }
    },

    methods: {
        submitNew() {
            let cat = {category_id: 1,name: this.name, description: this.description, price: this.price, expire_date: 1763121572082};
            fetch('http://localhost:8000/db/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(cat)
            }).then(res => res.json().then(data => ({status: res.status, data: data})))
                .then(res => {
                    if (res.status == 200) {
                        alert('New category successfully made!');
                        Router.push({name: 'productPanel'})
                     }
                     else {
                        alert('Name already taken or bad input');
                     }
                })
        },
    }
}
</script>
  
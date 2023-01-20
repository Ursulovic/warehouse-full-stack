<template>
    <div class="home">
        <h1>New category</h1><br><br>


        <b-form @submit.prevent>
            <b-form-group label="Name:" label-for="name">
                <b-form-input type="text" id="name" v-model="name" placeholder="Enter name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Description:" label-for="description">
                <b-form-input id="description" v-model="description" type="description" placeholder="Enter description"
                    required></b-form-input>
            </b-form-group>

            <b-form-group label="Average weight:" label-for="Average weight">
                <b-form-input id="Average weight" v-model="weight" type="number" min="1"
                    placeholder="Enter average weight" required></b-form-input>
            </b-form-group>

            <b-form-group label="Average price:" label-for="Average price">
                <b-form-input id="Average price" v-model="price" type="number" min="1" placeholder="Enter average price"
                    required></b-form-input>
            </b-form-group>

            <b-form-group label="Tax:" label-for="tax">
                <b-form-input id="tax" v-model="tax" type="number" min="1" max="99" placeholder="Enter tax" required>
                </b-form-input>
            </b-form-group>

            <b-button variant="primary" @click="submitNew()">Submit</b-button>
        </b-form>

        <h1>{{this.email}}</h1>
        <h1>{{this.password}}</h1>

    </div>
</template>
  
<script>

import Router from '../../router'


export default {
    name: 'HomeView',

    data() {
        return {
            name: '',
            description: '',
            weight: 0,
            price: 0,
            tax: 0,
        }
    },

    methods: {
        submitNew() {
            let cat = {name: this.name, description: this.description, price: this.price, tax: this.tax, avg_weight: this.weight, avg_price: this.price};
            fetch('http://localhost:8000/db/categories/', {
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
                        Router.push({name: 'categoryPanel'})
                     }
                     else {
                        alert('Name already taken or bad input');
                     }
                })
        },
    }
}
</script>
  
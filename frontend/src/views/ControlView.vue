<template>
    <div>
        <h1>Total overview</h1><br><br>

        <table>
            <tr>
                <th>Decrease</th>
                <th>State</th>
                <th>Increase</th>
            </tr>
            <tr>
                <h6>Drivers</h6>
                <td><button type="button" @click="editDrivers(1)">-</button></td>
                <td>{{getDrivers}}</td>
                <td><button type="button" @click="editDrivers(1)">+</button></td>
            </tr>

            <tr>
                <h6>Workers</h6>
                <td><button type="button" @click="editWorkers(-1)">-</button></td>
                <td>{{getWorkers}}</td>
                <td><button type="button" @click="editWorkers(1)">+</button></td>
            </tr>

            <tr>
                <h6>Products</h6>
                <td><button type="button" @click="editProducts(-1)">-</button></td>
                <td>{{getProducts}}</td>
                <td><button type="button" @click="editProducts(1)">+</button></td>
            </tr>

        </table>


    </div>

</template>
  
<script>

import { mapGetters } from 'vuex';

export default {
    name: 'ControlView',

    data() {
        return {


            fields: ['Decrease', 'State', 'Increase'],
        }
    },

    methods: {

        editDrivers(num) {
            this.$socket.emit('drivers', {count : num});
        },

        editWorkers(num) {
            this.$socket.emit('workers', {count : num});
        },
        
        editProducts(num) {
            this.$socket.emit('products', {count : num});
        },


    },

    computed: {
        getItems() {
            return [this.getDrivers, this.getWorkers, this.getProducts];
        },

        ...mapGetters([
            'getProducts',
            'getDrivers',
            'getWorkers',
        ]),
    }
}
</script>

<style>
    table, th, td {
      border:1px solid black;
    }
    </style>

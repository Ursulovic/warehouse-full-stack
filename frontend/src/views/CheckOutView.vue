<template>
  <div>
    <h1>Check out </h1><br><br>

    <b-table :items="productsInCart" :fields="fields" striped responsive="sm">


      <template #cell(Name)="row">
        {{ row.item.product.name }}
      </template>

      <template #cell(Quantity)="row">
        <b-form-input type="number" v-model="row.item.quantity" min="1" size="sm"></b-form-input>
      </template>

      <template #cell(Price)="row">
        {{ row.item.product.price }}
      </template>

      <template #cell(Subtotal)="row">
        {{row.item.product.price * row.item.quantity }}
      </template>

      <template #cell(Actions)="row">
        <b-button
        variant="danger"
        @click="removeProduct(row.item.product)">
        Remove
        </b-button>
      </template>

    </b-table><br><br>
    <h2>Total price: {{ getTotalPrice }} </h2>
    <b-button variant="success">
      Buy
    </b-button>
    



  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';



export default {


  name: 'CartView',


  data() {
    return {
      fields: ['Name', 'Quantity', 'Price', 'Subtotal', 'Actions'],
    }
  },


  methods: {

    removeProduct(product) {
      this.removeProductFromCart(product);
    },

    ...mapActions([
      'removeProductFromCart',
      'emptyCart'
    ]),

  },




  computed: {
    ...mapState([
      'productsInCart'
    ]),



    ...mapGetters([
      'getTotalPrice'
    ]),
  },





}
</script>

<template>
  <div>
    <br>
    <h1>Products</h1><br><br>

    <h6>Select category:</h6>




    <b-form-select v-model="selectedCategory">
      <option v-for="cat in this.allCategories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>


    </b-form-select><br><br>

    


    <b-pagination v-model="currentPage" :total-rows="this.productNumber" :per-page="10" aria-controls="my-table">
    </b-pagination>

    <b-table id="my-table" :items="this.currentProducts"
     :per-page="10"
     :current-page="currentPage"
     :fields="this.fields"
     v-if="this.currentProducts.length != 0">

     <template #cell(name)="row">
      {{row.item.name}}
     </template>

     <template #cell(description)="row">
      {{row.item.description}}
     </template>

     <template #cell(price)="row">
      {{row.item.price}}
     </template>

     <template #cell(expireDdate)="row">
      {{row.item.name}}
     </template>

     <template #cell(cart)="row">

      <b-button variant="success"
      @click="addProductToCart(row.item)"

      >
      Add
      </b-button>


     </template>

     
     </b-table>

      <h1 v-else-if ="this.selectedCategory ">No products for this category!</h1><br><br>


      <h1 style="color:red" v-if="this.token  === ''">You most be logged in in order to shop</h1>

  </div>
</template>

<script>

import { mapActions,  mapState } from 'vuex';

export default {
  name: 'ConsumerTable',


  data() {
    return {
      selectedCategory: 0,
      currentPage: 1,
      currentProducts: [],
      productNumber: 0,

      boughtProducts: [],

    }
  },

  methods: {
    ...mapActions([
      'getAllNames',
      'getNumberOfCategories',
      'checkCartforProduct',
      'addProductInCart',
    ]),

    addProductToCart(product) {
      this.addProductInCart(product); 
    }

  },

  watch: {
    currentPage() {
      fetch('http://localhost:8000/db/products/category/' + this.selectedCategory + '?' + new URLSearchParams({
        page: this.currentPage
      }), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json())
        .then(res => {
          this.productNumber = res.count;
          this.currentProducts = res.rows;
        })

    },

    selectedCategory() {
      this.currentPage = 1;
      fetch('http://localhost:8000/db/products/category/' + this.selectedCategory + '?' + new URLSearchParams({
        page: this.currentPage
      }), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json())
        .then(res => {
          this.productNumber = res.count;
          this.currentProducts = res.rows.map(r => {
            r.expire_date = (new Date(r.expire_date)).toUTCString();
            return r;
          });
        })

    }
  },

  mounted() {
    this.getAllNames();
    this.getNumberOfCategories();
    this.selectedCategory = this.allCategories[0];

  },

  computed: {

    ...mapState([
      'allCategories',
      'numberOfCategories',
      'token',
      'productsInCart'
    ]),

    fields() {
      if (this.token != '') {
        return ['name', 'description', 'price', 'expire_date', 'cart'];
      }
        
      return ['name', 'description', 'price', 'expire_date'];
    },



  }

}


</script>







<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>


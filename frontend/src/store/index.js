import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router'





Vue.use(Vuex)

export default new Vuex.Store({




  
  state: {
    token : '',
    role: '',

    //userCategories
    allCategories: [],
    productsInCart:[],


    numberOfDrivers: 0,
    numberOfWorkers: 0,
    numberOfProducts: 0,

  },

  getters: {

    getAllProductsInCart(state) {
      return state.productsInCart;
    },

    getTotalPrice(state) {
      return state.productsInCart.reduce(function (acc, item)  {
        return acc + (item.product.price)* item.quantity
      }, 0);
    },


    //socket

    getDrivers(state) {
      return state.numberOfDrivers;
    },

    getWorkers(state) {
      return state.numberOfWorkers;
    },

    getProducts(state) {
      return state.numberOfProducts;
    },


  },


  mutations: {
    //auth
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },


    //categories
    setCategories(state, categories) {
      state.allCategories = categories;
    },

    setNumberOfCategories(state, number) {
      state.numberOfCategories = number;
    },

    //products

    addProductInCart(state, products) {
      state.productsInCart = products;
    },

    removeProductInCart(state, pos) {
      state.productsInCart.splice(pos, 1);
    },

    emptyCart(state) {
      state.productsInCart = [];
    },


    //socket

    alterDrivers(state, num) {
      state.numberOfDrivers += num;
    },
    
    alterWorkers(state,num) {
      state.numberOfWorkers += num;
    },

    alterProducts(state,num) {
      state.numberOfProducts += num;
    }


  },


  actions: {
    register({commit}, obj) {

      
      fetch('http://localhost:8001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json().then(data => ({status: res.status, data: data})))
        .then(res => {
          if (res.status != 200) {alert('Username already taken')}
          else {
            commit('setToken', res.data.token);
            Router.push({path : '/'});
          }
        })},

    login({commit}, obj) {
      
      fetch('http://localhost:8001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(res => {
          if (res.msg) {alert('Invalid credentials')}
          else {
            commit('setToken', res.token);
            Router.push({path : '/'});
            console.log(localStorage.token)
          }
        })
  },

  getAllNames({commit}) {
    fetch('http://localhost:8000/db/categoriesNames', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}})
      .then(res => res.json())
        .then(res => {
          res.rows.unshift({name: 'Select a category', value: null});
          commit('setCategories', res.rows);
        })
  },

  getNumberOfCategories({commit}) {
    fetch('http://localhost:8000/db/categoriesPageNumber', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}})
      .then(res => res.json())
          .then(res => {
            commit('setNumberOfCategories', res.count);
          })
  },

  addProductInCart({getters ,commit}, p) {

    let products = getters.getAllProductsInCart;

    for (let i = 0; i < products.length; i++) {
      if (products[i].product.id === p.id) {
        products[i].quantity += 1;
        return;
      }
    }

    products.push({quantity:1, product: p});

    
    commit('addProductInCart', products);

  },

  removeProductFromCart({getters, commit}, product) {
    
    let products = getters.getAllProductsInCart;
    const pos = products.map(p => p.id).indexOf(product.id);

    commit('removeProductInCart', pos);
  },

  emptyCart({commit}) {
    commit('emptyCart');
  },

  socket_drivers({commit}, num) {
    commit('alterDrivers', num);
    console.log('Drivers: ', num);
  },

  socket_workers({commit}, num) {
    commit('alterWorkers', num);
    console.log('Workers: ', num);
  },


  socket_products({commit}, num) {
    commit('alterProducts', num);
    console.log('Products: ', num);
  }



  



  






    
  },
})
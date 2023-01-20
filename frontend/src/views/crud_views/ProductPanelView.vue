<template>
    <div>
        <h1>All products</h1><br><br>
        <b-button @click="goToNew" >New product</b-button><br><br>  
        <b-pagination v-model="currentPage" per-page="10" :total-rows="numberOfProducts">
        </b-pagination><br>

        <CrudTable :fields="fields" :items="this.formatRows"
            :actions="{Remove: {func: removeProduct, variant: 'danger'}, Edit: {func: goToEdit, variant: 'warning'}}" />








    </div>
</template>
  
<script>
import CrudTable from '@/components/CrudTable.vue';
import Router from '../../router'


export default {
    name: "HomeView",
    data() {
        return {
            currentPage: 1,
            currentProducts: [],
            numberOfProducts: 0,
            fields: [
                {
                    key: "name",
                    label: "name"
                },
                {
                    key: "description",
                    label: "Description"
                },

                {
                    key: "price",
                    label: "Price"
                },
                {
                    key: "expire_date",
                    label: "Expire date"
                },
                
            ]
        };
    },
    watch: {
        currentPage() {
        }
    },
    methods: {

        removeProduct(product) {
            fetch(`http://localhost:8000/db/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.status == 200) { alert('Product removed!') }
                    this.getPage();
                })
        },

        goToEdit(product) {
            Router.push({name: 'editCategory', params: {product}});
        },

        goToNew() {
            Router.push({name: 'newProduct'});
        },





        getPage() {
            fetch(`http://localhost:8000/db/products/${this.currentPage}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.currentProducts = res.rows;
                    this.numberOfProducts = res.rows.count;
                });
        }
    },

    computed: {

        formatRows() {
            return this.currentProducts.map(p => {
                p.expire_date = new Date(p.expire_date * 1000);
                return p;
            })
        }

    },

    mounted() {
        this.getPage();
    },
    components: { CrudTable }
}
</script>
  
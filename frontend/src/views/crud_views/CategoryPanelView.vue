<template>
    <div>
        <h1>All categories</h1><br><br>
        <b-button @click="goToNew" >New category</b-button><br><br>  
        <b-pagination v-model="currentPage" per-page="10" :total-rows="numberOfCategories">
        </b-pagination><br>

        <CrudTable :fields="fields" :items="this.currentCategories.rows"
            :actions="{Remove: {func: removeCategory, variant: 'danger'}, Edit: {func: goToEdit, variant: 'warning'}}" />








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
            currentCategories: [],
            numberOfCategories: 0,
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
                    key: "avg_weight",
                    label: "Average weight"
                },
                {
                    key: "avg_price",
                    label: "Average price"
                },
                {
                    key: "tax",
                    label: "Tax"
                }
            ]
        };
    },
    watch: {
        currentPage() {
        }
    },
    methods: {

        removeCategory(category) {
            fetch(`http://localhost:8000/db/categories/${category.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.status == 1) { alert('Category removed!') }
                    this.getPage();
                })
        },

        goToEdit(category) {
            Router.push({name: 'editCategory', params: {category}});
        },

        goToNew() {
            Router.push({name: 'newCategory'});
        },





        getPage() {
            fetch(`http://localhost:8000/db/categories/${this.currentPage}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.currentCategories = res.rows;
                    this.numberOfCategories = res.rows.count;
                });
        }
    },
    mounted() {
        this.getPage();
    },
    components: { CrudTable }
}
</script>
  
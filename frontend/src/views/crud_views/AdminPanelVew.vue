<template>
  <div>
    <h1>All users</h1><br><br>

    <b-pagination
    v-model="selectedPage"
    :per-page="10"
    :total-rows="userNumber"
    >


    </b-pagination>

    <CrudTable :fields="this.fields" :items="this.currentUsers"
      :actions="{Remove:{func:removeUser, variant: 'danger'}, Edit: {func:goToEdit, variant: 'warning'}}" />






  </div>
</template>
  
<script>
import CrudTable from '@/components/CrudTable.vue';
import Router from '../../router'


export default {
  name: 'AdminActionsView',

  components: {
    CrudTable,
  },

  data() {
    return {

      selectedPage: 1,
      userNumber: 0,
      currentUsers: [],


      fields: [
        {
          key: 'name',
          label: 'Name',

        },
        {
          key: 'email',
          label: 'email',

        },
        {
          key: 'type',
          label: 'Type',

        },
      ]

    }
  },

  watch: {
    selectedPage() {
      this.getPage();
    }
  },

  methods: {

    getPage() {
      fetch(`http://localhost:8000/db/users/${this.selectedPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
        .then(res => res.json())
        .then(res => {
          this.currentUsers = res.rows;
          this.userNumber = res.count;
        })
    },



    removeUser(user) {
      fetch(`http://localhost:8000/db/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.user == 1) {
            alert('User removed!');
            this.getPage();
          }
        })

    },





    goToEdit(user) {
      Router.push({ name: 'editUser', params: { user } })
    }




  },

  mounted() {
    this.getPage();
  }

}
</script>

<style>
  .pagination {
  display: flex;
  justify-content: center;
}
</style>
  
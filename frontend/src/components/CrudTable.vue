<template>
  <div>
    {{this.items}}
    <b-table :items="this.items" :per-page="10" :fields="this.getFields">



      <template #cell(actions)="row">
        <b-button v-for="o in Object.keys(actions)" :key="o" :variant="actions[o].variant"
          @click="actions[o].func(row.item)">
          {{o}}
        </b-button>
      </template>

    </b-table>

  </div>
</template>
  
<script>

export default {
  name: 'CrudTable',

  props: {
    fields: [],
    items: [],
    actions: null,

    // selectedRow: 0,
  },

  computed: {
    getFields() {
      return this.fields.concat('Actions')
    }
  }
}
</script>


  



<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Truck model</th>
        <th scope="col">Registration number</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="truck in trucks">
        <tr>
          <th scope="row"> {{ truck.id }}</th>
          <td>
            <router-link :to="'/trucks/' + truck.id"> {{ truck.model }}</router-link>
          </td>
          <td>{{ truck.reg_number }}</td>
          <td :class="{broken_truck : truck.status.toLowerCase() ==='broken'}">{{ truck.status.toLowerCase() }}</td>
        </tr>

      </template>

      </tbody>
    </table>
  </div>
</template>

<script>
import BaseButton from '@/components/base-components/BaseButton'

export default {
  name: "TruckTable",
  components: {BaseButton},
  methods: {},
  computed: {
    mainStore: {
      get() {
        return this.$store.state;
      }
    },
    trucks: {
      get() {
        return this.mainStore.trucksTab.truckTable.trucks;
      }
    },
  },
}
</script>

<style scoped>
.broken_truck {
  color: red;
}
</style>

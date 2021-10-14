<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Name</th>
        <th scope="col">Personal number</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="driver in drivers">
        <th scope="row"> {{ driver.id }}</th>
        <td>
          <router-link :to="'/drivers/' + driver.id"> {{ driver.name + " " + driver.last_name }}</router-link>
        </td>
        <td>{{ driver.personal_number }}</td>
        <td> {{ driver.status.charAt(0).toUpperCase() + driver.status.slice(1).toLowerCase().replace("_", " ") }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DriversTable",
  computed: {
    mainStore: {
      get() {
        return this.$store.state;
      }
    },
    drivers: {
      get() {
        return this.mainStore.driverTab.drivers;
      },
    },

  },
}
</script>

<style scoped>

</style>
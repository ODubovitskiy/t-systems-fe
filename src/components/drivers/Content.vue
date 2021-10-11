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
          <router-link :to="'/drivers/' + driver.id"> {{ driver.name + " " + driver.lastName }}</router-link>
        </td>
        <td>{{ driver.personalNumber }}</td>
        <td> {{ driver.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Content",
  data: function () {
    return {
      drivers: [
        {
          id: 1,
          name: "John",
          lastName: "Doe",
          personalNumber: "12345",
          status: "Working"
        }
      ]

    }
  }

}
</script>

<style scoped>

</style>
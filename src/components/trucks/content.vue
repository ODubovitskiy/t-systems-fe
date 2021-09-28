<template>
  <div>
    <table class="table mt-4 table-hover">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Truck model</th>
        <th scope="col">Registration number</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="truck in trucks">
        <th scope="row"> {{ truck.id }}</th>
        <td><router-link :to="'/trucks/' + truck.id"> {{ truck.model }}</router-link></td>
        <td>{{ truck.registration_number }}</td>
        <td :class="{broken_truck : truck.status==='Broken',}">{{ truck.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "truck-content",
  components: {},
  data() {
    //TODO Return real data gotten from axios-request in mounted method
    //TODO Correct href to "/api/trucks/{{ truck.id }}"
    return {
      trucks: [
        {id: 1, model: "Scania", registration_number: "AA 12345", status: "Broken"},
        {id: 2, model: "Kamaz", registration_number: "AB 12345", status: "Ready to go"},
        {id: 3, model: "Volvo", registration_number: "AC 12345", status: "Ready to go"}
      ]
    }
  }
}
</script>

<style scoped>
.broken_truck {
  color: red;
}
</style>
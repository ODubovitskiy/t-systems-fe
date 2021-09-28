<template>
  <div>
    <div class="row">
      <div class="col-md-2">
          <sidebar/>
      </div>
      <div class="col-md-10">
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
            <td><a class="text-decoration-none" href="/api/trucks/{{ truck.id }}"> {{ truck.model }}</a></td>
            <td>{{ truck.registration_number }}</td>
            <td :class="{broken_truck:truck.status==='Broken',}">{{ truck.status }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/layouts/sidebar-trucks";
export default {
  name: "truck-content",
  components: {
    sidebar
  },
  data() {
    //TODO Return real data gotten from axios-request in mounted method
    //TODO Correct href to "/api/trucks/{{ truck.id }}"
    return {
      trucks: [
        {id: 1, model: "Scania", registration_number: "AA 12345", status: "Broken"},
        {id: 2, model: "Kamaz", registration_number: "AB 12345", status: "Ready to go"},
        {id: 2, model: "Volvo", registration_number: "AC 12345", status: "Ready to go"}
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
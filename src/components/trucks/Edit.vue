<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group mb-3">
        <label class="form-label float-start" for="truck-model">Truck model</label>
        <input id="truck-model" :value="truck.model" aria-describedby="emailHelp" class="form-control"
               name="truck_model"
               placeholder="Type model"
               type="text">
      </div>
      <div class="form-group mb-3">
        <label class="form-label float-start" for="registration-number">Registration number</label>
        <input id="registration-number" :value="truck.registration_number" class="form-control"
               name="registrations_number"
               placeholder="Registration number"
               type="text">
      </div>
      <div class="form-group mb-3">
        <label class="form-label float-start" for="driver-shift">Driver shift</label>
        <input id="driver-shift" class="form-control" name="driver_shift" placeholder="Driver shift"
               type="text">
      </div>
      <div class="form-group mb-3">
        <label class="form-label float-start" for="truck-capacity">Capacity</label>
        <input id="truck-capacity" class="form-control" name="truck_capacity" placeholder="Load capacity"
               type="text">
      </div>
      <div class="form-group mb-3">
        <label class="form-label float-start" for="current-city">Current city</label>
        <select id="current-city" class="form-control" name="current_city">
          <option selected>{{ truck.current_city }}</option>
          <option v-for="city in cities" v-bind:value=city.id>{{ city.name }}</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label class="form-label float-start" for="truck-status">Status</label>
        <select id="truck-status" class="form-control" name="truck_status">
          <option disabled selected value="">Select truck status</option>
          <option v-for="status in statuses" v-bind:value=status.id>{{ status.status }}</option>
        </select>
      </div>
      <div class="modal-footer float-end m-2">
        <button class="btn btn-outline-info m-2" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data: function () {
    return {
      truck: {
        id: 1, model: "Scania", registration_number: "AA 12345", status: "Broken", current_city: "Moscow"
      },
      cities: [
        {id: 1, name: 'Saint-Petersburg'},
        {id: 2, name: 'Moscow'},
        {id: 3, name: 'Sochi'},
      ],
      statuses: {}
    }
  },
  methods: {
    onSubmit() {
      //TODO PATCH / PUT request to trucks/{id} & redirect to trucks/{id}
    }
  }
}
</script>

<style scoped>

</style>

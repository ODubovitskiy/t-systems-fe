<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group mb-3">
        <label for="truck-model" class="form-label float-start">Truck model</label>
        <input type="text" :value="truck.model" name="truck_model" class="form-control" id="truck-model"
               placeholder="Type model"
               aria-describedby="emailHelp">
      </div>
      <div class="form-group mb-3">
        <label for="registration-number" class="form-label float-start">Registration number</label>
        <input type="text" :value="truck.registration_number" name="registrations_number" class="form-control"
               id="registration-number"
               placeholder="Registration number">
      </div>
      <div class="form-group mb-3">
        <label for="driver-shift" class="form-label float-start">Driver shift</label>
        <input type="text" name="driver_shift" class="form-control" id="driver-shift"
               placeholder="Driver shift">
      </div>
      <div class="form-group mb-3">
        <label for="truck-capacity" class="form-label float-start">Capacity</label>
        <input type="text" name="truck_capacity" class="form-control" id="truck-capacity"
               placeholder="Load capacity">
      </div>
      <div class="form-group mb-3">
        <label for="current-city" class="form-label float-start">Current city</label>
        <select name="current_city" class="form-control" id="current-city">
          <option selected>{{truck.current_city}}</option>
          <option v-for="city in cities" v-bind:value=city.id>{{ city.name }}</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="truck-status" class="form-label float-start">Status</label>
        <select name="truck_status" class="form-control" id="truck-status">
          <option value="" disabled selected>Select truck status</option>
          <option v-for="status in statuses" v-bind:value=status.id>{{ status.status }}</option>
        </select>
      </div>
      <div class="modal-footer float-end m-2">
        <button type="submit" class="btn btn-outline-info m-2">Save</button>
      </div>
    </form>
  </div>
</template>


<script>

export default {
  name: "edit",
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
  methods:{
    onSubmit() {
      //TODO PATCH / PUT request to trucks/{id} & redirect to trucks/{id}
    }
  }

}
</script>

<style scoped>

</style>
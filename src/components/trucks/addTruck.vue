<template>
  <div>
    <button type="button"
            data-bs-toggle="modal" data-bs-target="#add-truck-modal"
            class="btn btn-primary my-2 w-100 text-left"><i class="bi bi-plus-square m-2"></i> Add truck
    </button>
    <div class="modal fade" id="add-truck-modal" tabindex="-1" aria-labelledby="add-truck-modal-label"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="add-truck-modal-label">Add truck</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group mb-3">
                <label for="truck-model" class="form-label float-start">Truck model</label>
                <input type="text" name="truck_model" class="form-control" id="truck-model" placeholder="Type model"
                       aria-describedby="emailHelp">
              </div>
              <div class="form-group mb-3">
                <label for="registration-number" class="form-label float-start">Registration number</label>
                <input type="text" name="registrations_number" class="form-control" id="registration-number"
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
                  <option value="" disabled selected>Select city</option>
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
                <button type="button" class="btn btn-outline-danger  m-2" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-outline-info m-2">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addTruck',
  props: {
    cities: {},
    onSubmit: {},
    statuses: {}
  }
}
</script>

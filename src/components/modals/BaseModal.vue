<template>
  <div id="add-truck-modal" aria-hidden="true" aria-labelledby="add-truck-modal-label" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="add-truck-modal-label" class="modal-title">Add truck</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendTrack()">
            <div class="form-group mb-3">
              <label class="form-label float-start" for="truck-model">Truck model</label>
              <input id="truck-model" aria-describedby="emailHelp" class="form-control" name="truck_model"
                     placeholder="Type model"
                     type="text">
            </div>
            <div class="form-group mb-3">
              <label class="form-label float-start" for="registration-number">Registration number</label>
              <input id="registration-number" class="form-control" name="registrations_number"
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
                <option disabled selected value="">Select city</option>
                <option v-for="city in mainStore.cities" :value=city.id>{{ city.name }}</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label class="form-label float-start" for="truck-status">Status</label>
              <select id="truck-status" class="form-control" name="truck_status">
                <option disabled selected value="">Select truck status</option>
                <option v-for="status in mainStore.statuses" :value=status.id>{{ status.status }}</option>
              </select>
            </div>
            <div class="modal-footer float-end m-2">
              <button class="btn btn-outline-danger  m-2" data-bs-dismiss="modal" type="button">Close</button>
              <button class="btn btn-outline-info m-2" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  methods: {
    sendTrack() {
      let self = this;
      let formData = new FormData();
      formData.append('truck_model', self.truck_model);
      console.log(formData);
    }
  },
  props: {},
  computed: {
    mainStore: {
      get() {
        return MainStore;
      }
    }
  },
  data() {
    return {
      truck_model: '',
    }
  }

}
</script>

<style scoped>

</style>
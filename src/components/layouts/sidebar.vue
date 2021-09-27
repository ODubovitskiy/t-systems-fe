<template>
  <div>
    <div class="sidebar py-4">
      <div class="py-2">
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
                <form action="/api/trucks" method="post">
                  <div class="form-group mb-3">
                    <label for="truck-model" class="form-label float-start">Truck model</label>
                    <input type="text" class="form-control" id="truck-model" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group mb-3">
                    <label for="registration-number" class="form-label float-start">Registration number</label>
                    <input type="text" class="form-control" id="registration-number">
                  </div>
                  <div class="form-group mb-3">
                    <label for="driver-shift" class="form-label float-start">Driver shift</label>
                    <input type="text" class="form-control" id="driver-shift">
                  </div>
                  <div class="form-group mb-3">
                    <label for="truck-capacity" class="form-label float-start">Capacity</label>
                    <input type="text" class="form-control" id="truck-capacity">
                  </div>
                  <div class="form-group mb-3">
                    <label for="current-city" class="form-label float-start">Current city</label>
                    <input type="text" class="form-control" id="current-city">
                  </div>
                  <div class="form-group mb-3">
                    <label for="truck-status" class="form-label float-start">Status</label>
                    <select class="form-control" id="truck-status" name="truck-status">
                      <option value="" disabled selected>Select truck status</option>
                      <option value="1">Ready to go!</option>
                      <option value="2">Broken</option>
                    </select>
                  </div>
                  <div class="modal-footer float-end m-2">
                    <button type="button" class="btn btn-outline-info m-2" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-outline-danger m-2">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar"
}
</script>

<style scoped>

</style>
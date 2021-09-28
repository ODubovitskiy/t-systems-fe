<template>
  <div>
    <div class="card">
      <div class="card-header">
        Detailed information about <strong>{{ truck.model }} {{ truck.registration_number }}</strong>
      </div>

      <div class="card-body">
        <div class="card-text">
          <div class="modal-body">
            <div class="row mb-5">
              <div class="col-6">
                <div class="text-muted">Truck model</div>
                <div class="text-muted">Registration number</div>
                <div class="text-muted">Driver shift</div>
                <div class="text-muted">Capacity</div>
                <div class="text-muted">Current city</div>
                <div class="text-muted">Status</div>
              </div>
              <div class="col-6">
                <div class="text-muted">{{ truck.model }}</div>
                <div class="text-muted">{{ truck.registration_number }}</div>
                <div class="text-muted">GET DATA FROM BACKEND</div>
                <div class="text-muted">GET DATA FROM BACKEND</div>
                <div class="text-muted">GET DATA FROM BACKEND</div>
                <div class="text-muted">{{ truck.status }}</div>
              </div>
            </div>
            <div class="row">
              <div class="pt-5 modal-footer">
                <div class="col-8">
                  <button type="button" class="btn btn-outline-danger m-2" data-bs-toggle="modal"
                          data-bs-target="#deleteTruckModal">Delete
                  </button>
                </div>
                <div class="col-2">
                  <router-link class="btn btn-outline-secondary m-2" to="/trucks">Close</router-link>
                  <router-link class="btn btn-outline-info  m-2" :to="'/trucks/' + truckId + '/edit'">Edit</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="deleteTruckModal" tabindex="-1" aria-labelledby="deleteTruckModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteTruckModalLabel">Confirm</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Do you really want to delete <strong>{{ truck.model }} {{ truck.registration_number }}</strong>? <br> This action is irreversible.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            <router-link v-on:click.native="onDelete" class="btn btn-outline-danger  m-2" :to="'/trucks/' + truckId">
              Delete
            </router-link>

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: "trucks-show",
  data() {
    return {
      truckId: this.$route.params.id,
      //TODO Delete in prod
      truck: {
        id: 1, model: "Scania", registration_number: "AA 12345", status: "Broken"
      }
    }
  },
  mounted: function () {
    //TODO To make GET-request with this.truckId
  },
  methods: {
    onDelete() {
      //TODO create DELETE-request to /trucks/{truckId}
    }
  }
}
</script>

<style scoped>

</style>
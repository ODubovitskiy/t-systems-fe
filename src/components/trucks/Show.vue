<template>
  <div class="row">
    <div class="col-md-2">
      <div>
        <button class="btn btn-outline-danger m-2 flex-fill" data-bs-target="#deleteTruckModal" data-bs-toggle="modal"
                type="button">Delete
        </button>
      </div>
      <div>
        <router-link class="btn btn-outline-secondary m-2" to="/trucks">Back to truck list</router-link>
      </div>
      <div>
        <router-link :to="'/trucks/' + truckId + '/edit'" class="btn btn-outline-info  m-2">Edit</router-link>
      </div>
    </div>

    <div class="card col-md-10">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="deleteTruckModal" aria-hidden="true" aria-labelledby="deleteTruckModalLabel" class="modal fade"
         tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteTruckModalLabel" class="modal-title">Confirm</h5>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            Do you really want to delete <strong>{{ truck.model }} {{ truck.registration_number }}</strong>? <br> This
            action is irreversible.
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
            <router-link :to="'/trucks/' + truckId" class="btn btn-outline-danger  m-2" v-on:click.native="onDelete">
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
  name: "Show",
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

.btn{
  width: 100%;
}

</style>

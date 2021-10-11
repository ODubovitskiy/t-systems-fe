<template>
  <div>
    <div class="card">
      <div class="card-header">
        Detailed information about <strong>{{ driver.name }} {{ driver.lastName }}</strong>
      </div>
      <div class="card-body">
        <div class="card-text">
          <div class="modal-body">
            <div class="row mb-5">
              <div class="col-6">
                <div class="text-muted">Name</div>
                <div class="text-muted">Personal number</div>
                <div class="text-muted">Hours worked</div>
                <div class="text-muted">City</div>
                <div class="text-muted">Truck</div>
              </div>
              <div class="col-6">
                <div class="text-muted">{{ driver.name + " " + driver.lastName }}</div>
                <div class="text-muted">{{ driver.personalNumber }}</div>
                <div class="text-muted">{{ driver.hours_worked }}</div>
                <div class="text-muted">{{ driver.city }}</div>
                <div class="text-muted">{{ driver.truck }}</div>
              </div>
            </div>
            <div class="row">
              <div class="pt-5 modal-footer">
                <div class="col-8">
                  <button class="btn btn-outline-danger m-2" data-bs-target="#deleteDriverModal" data-bs-toggle="modal"
                          type="button">Delete
                  </button>
                </div>
                <div class="col-2">
                  <router-link class="btn btn-outline-secondary m-2" to="/drivers">Close</router-link>
                  <router-link :to="'/drivers/' + driver.id + '/edit'" class="btn btn-outline-info  m-2">Edit
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="deleteDriverModal" aria-hidden="true" aria-labelledby="deleteDriverModalLabel" class="modal fade"
         tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteDriverModalLabel" class="modal-title">Confirm</h5>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            Do you really want to delete <strong>{{ driver.name }} {{ driver.lastName }}</strong>? <br> This
            action is irreversible.
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
            <router-link :to="'/drivers/' + driver.id" class="btn btn-outline-danger m-2" @click.native="onDelete">
              Delete
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import driverForm from "@/components/drivers/DriverForm"

export default {
  name: "Show",
  components: {
    driverForm
  },
  mounted() {
  },
  data() {
    return {
      driver: {
        id: 1,
        name: "John",
        lastName: "Doe",
        personalNumber: "12345",
        hours_worked: 30,
        city: "Moscow",
        truck: "Volvo"
      }

    }
  },
  methods: {
    onDelete() {

    },
    action(){
    }
  }
}
</script>

<style scoped>

</style>
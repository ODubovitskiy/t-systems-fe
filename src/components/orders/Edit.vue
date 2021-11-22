<template>
  <div class="order-to-edit">
    <div class="row">
      <div class="sidebar col-md-2">
        <BaseButton
            :button="{
                name : 'Save',
                type : 'button',
                class : 'btn btn-outline-info'}"
            v-on:callback="update()"/>
      </div>

      <div class="col-md-10">
        <h3 class="text-muted">Manage order {{ order.number }}</h3>
        <form>
          <div class="order-container mt-3">
            <div class="row">
              <div class="driver-info col-5 m-3">
                <div class="h3 text-muted">Driver information</div>
                <div class="form-group mb-3">
                  <label for="status" class="form-label float-start">Status</label>
                  <select v-model="driverStatus" name="status" class="form-control" id="status">
                    <option value="" disabled selected>Select status</option>
                    <template v-for="status of this.driverStatuses">
                      <option :value=status>{{ status }}</option>
                    </template>
                  </select>
                </div>
                <div class="form-group mb-3">
                  <label for="hours_worked" class="float-start form-label">Hours worked</label>
                  <input v-model="hoursWorked" type="text" class="form-control" id="hours_worked">
                </div>
              </div>
              <div class="order-info col-5   m-3">
                <div class="h3 text-muted">Order information</div>
                <div class="form-group mb-3">
                  <div v-for="waypoint in this.order.way_points">
                    {{ addToShipments(waypoint.shipment) }}
                  </div>

                  <div v-for="shipment of this.shipments">
                    <EditShipment
                        :shipment="shipment"
                        @shipmentStatusChanged="updateShipments"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import EditShipment from "@/components/orders/EditShipment"
import BaseButton from "@/components/base-components/BaseButton";

const $axios = axios.create({
  headers: {'Authorization': localStorage.getItem("dataToken")}
});

$axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/auth';
        if (localStorage.removeItem("dataToken") && localStorage.removeItem("currentUser")) {
          localStorage.removeItem("dataToken");
          localStorage.removeItem("currentUser");
        }
      }
      return Promise.reject(error)
    },
);

export default {
  name: "Edit",
  props: ["order"],
  components: {
    EditShipment, BaseButton
  },
  data() {
    return {
      driverStatus: "",
      driverStatuses: {},
      hoursWorked: "",
      shipments: [],
      orderToUpdate: {
        driver: {},
        shipments: [],
      }
    }
  },
  mounted() {
    this.getDriverStatuses();
  },
  methods: {
    getDriverStatuses() {
      let self = this;
      $axios.get("http://localhost:5000/api/driver-statuses/")
          .then(function (response) {
            self.driverStatuses = response.data;
          });
    },
    addToShipments(shipment) {
      if (this.shipments.some(e => e.id === shipment.id)) {
      } else {
        this.shipments.push(shipment)
      }
    },
    update() {

    },
    updateShipments(shipment) {
      if (this.orderToUpdate.shipments.length === 0) {
        this.orderToUpdate.shipments.push(shipment);
      } else {
        if (this.orderToUpdate.shipments.some(e => e.id === shipment.id)) {
        } else {
          this.orderToUpdate.shipments.push(shipment);
        }
      }
      console.log(this.orderToUpdate.shipments);
    }
  },

}
</script>

<style scoped>

</style>
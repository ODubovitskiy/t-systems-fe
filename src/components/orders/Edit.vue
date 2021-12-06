<template>
  <div>
    <div class="order-to-edit">
    </div>
    <div class="row">
      <div class="sidebar col-md-2">
        <BaseRouterLink
            :link="{
        class : 'btn btn-outline-secondary m-2',
        path: '/drivers/personal-account/',
        name: 'Back to personal account'
       }"/>
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
                  <select v-model="driverStatus" name="status" class="form-control"
                          id="status">
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
                <BaseButton
                    :button="{
                name : 'Update order',
                type : 'button',
                class : 'btn btn-outline-info'}"
                    v-on:callback="updateOrder()"/>
              </div>
              <div class="order-info col-5   m-3">
                <div class="h3 text-muted">Order information</div>
                <div class="form-group mb-3">
                  <div v-for="waypoint in this.order.way_points">
                    <template>
                      {{ addToShipments(waypoint.shipment) }}
                    </template>
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
import BaseRouterLink from "@/components/base-components/BaseRouterLink"
import {useToast} from "vue-toastification";

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
    EditShipment, BaseButton, BaseRouterLink
  },
  computed: {},
  data() {
    return {
      driverStatus: "",
      driverStatuses: {},
      hoursWorked: "",
      shipments: [],
      orderToUpdate: {
        id: "",
        status: "",
        number: "",
        truck: {},
        drivers: [],
        shipments: [],
        way_points: [],
        travel_time: "",
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
    updateShipments(shipment) {
      if (this.orderToUpdate.shipments.length === 0) {
        this.orderToUpdate.shipments.push(shipment);
      } else {
        if (this.orderToUpdate.shipments.some(e => e.id === shipment.id)) {
        } else {
          this.orderToUpdate.shipments.push(shipment);
        }
      }

      this.orderToUpdate.way_points = this.order.way_points;
      let self = this;

      for (let wayPoint of this.orderToUpdate.way_points) {
        this.orderToUpdate.shipments.some(function (updatedShipment) {
          if (wayPoint.shipment.id === updatedShipment.id) {
            wayPoint.shipment = updatedShipment;
            let index = self.orderToUpdate.way_points.indexOf(wayPoint);
            self.orderToUpdate.way_points[index] = wayPoint;
          }
        });
      }
    },
    updateOrder() {
      this.orderToUpdate = this.order
      let self = this;
      let currentDriver = {};
      this.orderToUpdate.drivers.some(function (dr) {
        if (dr.personal_number === JSON.parse(localStorage.currentUser).personal_number) {
          dr.status = self.driverStatus;
          currentDriver = dr;
        }
      });
      for (const secondDriver of this.orderToUpdate.drivers) {
        if (secondDriver !== currentDriver) {
          secondDriver.status = currentDriver.status === "DRIVING" ? "ON SHIFT" : "DRIVING"
        }
      }
      currentDriver.hours_worked = this.hoursWorked;
      console.log(this.orderToUpdate.drivers);
      $axios.put("http://localhost:5000/api/orders/" + this.order.id, this.orderToUpdate
      ).then(function (response) {
        useToast().success("Order has been successfully updated", {})
      }).catch(function (error) {
        useToast().warning(error.response.data.error_description)
      });
    },
  },
}
</script>

<style scoped>

</style>
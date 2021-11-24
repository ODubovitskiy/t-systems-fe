<template>
  <div class="order-to-edit">
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
                  <select @change="updateDriverStatus" v-model="driverStatus" name="status" class="form-control"
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
                name : 'Update driver info',
                type : 'button',
                class : 'btn btn-outline-info'}"
                    v-on:callback="update()"/>
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
                <BaseButton
                    :button="{
                name : 'Update order info',
                type : 'button',
                class : 'btn btn-outline-info'}"
                    v-on:callback="update()"/>
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
  data() {
    return {
      driverStatus: "",
      driverStatuses: {},
      hoursWorked: "",
      shipments: [],
      orderToUpdate: {
        shipments: [],
        waypoints: []
      }
    }
  },
  mounted() {
    this.getDriverStatuses();
    this.checkRouteParams();
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

      let wayPoints = this.order.way_points;
      this.orderToUpdate.waypoints = wayPoints;
      let self = this;

      for (let wayPoint of wayPoints) {
        this.orderToUpdate.shipments.some(function (updatedShipment) {
          if (wayPoint.shipment.id === updatedShipment.id) {
            wayPoint.shipment = updatedShipment;
            let index = self.orderToUpdate.waypoints.indexOf(wayPoint);
            self.orderToUpdate.waypoints[index] = wayPoint;
          }
        });
      }
    },
    updateDriverStatus() {
      let self = this;
      this.orderToUpdate.drivers = this.order.drivers;
      this.orderToUpdate.drivers.some(function (dr) {
        if (dr.personal_number === JSON.parse(localStorage.currentUser).personal_number) {
          dr.status = self.driverStatus;
        }
      });
    },
    checkRouteParams() {
      // console.log(this.order)
      // let parameters = this.$route.params
      // $axios.get("http://localhost:5000/api/order-drivers-verification", {
      //   params: {
      //     orderId : parameters.id,
      //     driver_personal_number : parameters.personal_number,
      //   }
      // })
    }
  },
}
</script>

<style scoped>

</style>
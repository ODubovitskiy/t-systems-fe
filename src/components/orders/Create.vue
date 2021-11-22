<template>
  <div class="orders">
    <div class="row">
      <div class="col-md-2">
        <router-link class="btn btn-outline-secondary m-2 w-100" to="/orders/">To orders list</router-link>
        <hr>
        <BaseButton
            :button="{
                name: 'Create order',
                class: 'orders__btn  btn btn-primary'
                  }"
            v-on:callback="createOrder(this.transportOrder)"/>
      </div>
      <div class="col-md-10">
        <section class="section">
          <div class="orders-dashboard">
            <span class="orders-dashboard__title">Boxes to deliver</span>
            <div class="orders-dashboard__row orders-dashboard__row--header">
              <div class="orders-dashboard__column orders-dashboard__column--head">Shipments</div>
              <div class="orders-dashboard__column orders-dashboard__column--head">From</div>
              <div class="orders-dashboard__column orders-dashboard__column--head">To</div>
            </div>
            <div v-for="shipment of shipments">
              <ShipmentToDeliver
                  :shipment=shipment
                  :cities=cities
                  @selectedShipment="addToSelectedShipments">
              </ShipmentToDeliver>
            </div>
            <section class="section">
              <div class="selected-orders">
                <h3 class="selected-orders__title text-muted" v-if="this.chosenShipments.length > 0">You are
                  dispatching</h3>
                <h3 class="selected-orders__title text-muted" v-else>Nothing selected</h3>
                <template v-for="item in this.chosenShipments">
                  <div class="selected-orders-order">
                <span>
                <span class="fw-bold ">{{ item.shipment.name }}  </span> from
                <span class="fw-bold "> {{ item.city_from.city }}  </span> to
                <span class="fw-bold "> {{ item.city_to.city }} </span>
                  </span>
                  </div>
                </template>
              </div>
            </section>

            <section class="section">
              <div class="road-info">
                <div class="available-trucks">
                  <span class="available-trucks__title">Available trucks</span>
                  <div v-if="this.isTrucksAvailable">
                    <OrderTruck
                        :trucks=this.trucks
                        @selectedTruck="addToOrderTruck"/>
                  </div>
                </div>
                <div class="available-drivers">
                  <span class="available-drivers__title">Available drivers</span>
                  <div v-if="this.isDriversAvailable">
                    <div v-for="driver of this.drivers">
                      <OrderDriver
                          :driver=driver
                          @selectedDriver="addToOrderDrivers(driver)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr class="section__hr">
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ShipmentToDeliver from "@/components/orders/ShipmentToDeliver";
import BaseButton from "@/components/base-components/BaseButton";
import OrderDriver from "@/components/orders/OrderDriver";
import OrderTruck from "@/components/orders/OrderTruck";

import axios from "axios";
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
  name: "Create",
  components: {ShipmentToDeliver, BaseButton, OrderDriver, OrderTruck},
  mounted() {
    this.getShipments()
    this.getCities()
  },
  methods: {
    getShipments() {
      let self = this;
      $axios.get("http://localhost:5000/api/shipments-prepared/")
          .then(function (response) {
            self.shipments = response.data;
          });

    },
    getCities() {
      let self = this;
      return $axios({
        method: "get",
        url: "http://localhost:5000/api/cities",
      }).then(function (response) {
        self.cities = response.data;
      });
    },
    addToSelectedShipments(shipment) {
      if (!this.chosenShipments.includes(shipment)) {
        if (Object.keys(shipment.city_from).length !== 0 &&
            Object.keys(shipment.city_to).length !== 0) {
          this.chosenShipments.push(shipment)
        }
      } else {
        const index = this.chosenShipments.indexOf(shipment);
        if (index > -1) {
          this.chosenShipments.splice(index, 1);
        }
      }
      this.createPreOrder();
    },
    createPreOrder() {
      if (this.chosenShipments.length > 0) {
        let wayPoints = [];
        for (let item of this.chosenShipments) {
          let wayPointLoading = {};
          Object.assign(wayPointLoading, {
            shipment: {
              id: item.shipment.id,
              name: item.shipment.name,
              weight: item.shipment.weight,
              status: item.shipment.status
            },
            city: {
              "id": item.city_from.id
            },
            type: "LOADING"
          });
          wayPoints.push(wayPointLoading);

          let wayPointUnloading = {};
          Object.assign(wayPointUnloading, {
            shipment: {
              id: item.shipment.id,
              name: item.shipment.name,
              weight: item.shipment.weight,
              status: item.shipment.status
            },
            city: {
              "id": item.city_to.id
            },
            type: "UNLOADING"
          });
          wayPoints.push(wayPointUnloading);
        }
        let self = this;
        $axios.post("http://localhost:5000/api/orders/preorder", {way_points: wayPoints})
            .then(function (response) {
              self.trucks = response.data.trucks;
              self.transportOrder.way_points = wayPoints;
              self.isTrucksAvailable = true;
              self.isDriversAvailable = true;
            })
            .catch(function (error) {
              self.isTrucksAvailable = false;
              self.isDriversAvailable = false;
              useToast().warning(error.response.data.error_description)
            });
      } else {
        this.isTrucksAvailable = false;
        this.isDriversAvailable = false
      }
    },
    addToOrderDrivers(driver) {
      if (!this.isInclude(this.transportOrder.drivers, driver)) {
        this.transportOrder.drivers.push(driver)
      } else {
        const index = this.transportOrder.drivers.indexOf(driver);
        if (index > -1) {
          this.transportOrder.drivers.splice(index, 1);
        }
      }
    },
    addToOrderTruck(truck) {
      if (this.transportOrder.truck !== "") {
        this.transportOrder.truck = "";
      } else
        this.transportOrder.truck = truck;
      this.getDriversForOrderTruck(truck);
    },
    getDriversForOrderTruck(truck) {
      let self = this;
      self.drivers = [];
      $axios.get("http://localhost:5000/api/drivers/city", {
        params: {
          id: truck.city.id,
        }
      })
          .then(function (response) {
            self.drivers = [];
            self.drivers = response.data;
          })
          .catch(function (error) {
            useToast().warning(error.response.data.error_description)
          })
    },
    createOrder(transportOrder) {
      if (this.transportOrder.truck !== ""
          && this.transportOrder.way_points.length !== 0
          && this.transportOrder.drivers.length !== 0) {
        let self = this;
        $axios.post("http://localhost:5000/api/orders", {
          truck: transportOrder.truck,
          drivers: transportOrder.drivers,
          way_points: transportOrder.way_points,
        })
            .then(function (response) {
              self.$router.push("/orders");
              useToast().success("Order № " + response.data.number + " has been created.")
            })
            .catch(function (error) {
              if (error.response.data.error_description === "") {
                // let response = "Please input data"
                useToast().warning(response)
              } else
                useToast().warning(error.response.data.error_description)
            });
      } else {
        useToast().warning("Please input data")
      }
    },
    isInclude(arr, object2) {
      for (const object1 of arr) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
        return true;
      }
    }
  },
  data() {
    return {
      shipments: {},
      cities: {},
      chosenShipments: [],
      drivers: [],
      trucks: [],
      transportOrder: {
        drivers: [],
        truck: "",
        way_points: []
      },
      isTrucksAvailable: false,
      isDriversAvailable: false,
    }
  }

}
</script>

<style scoped lang="scss" src="../../styles/pages/orders.scss">

</style>
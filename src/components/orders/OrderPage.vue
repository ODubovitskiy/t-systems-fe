<template>
  <div class="orders">
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
              <div v-if="trucksAvailable">
                <div v-for="truck  of this.trucks">
                  <span>{{ truck.model }} {{ truck.reg_number }}</span>
                </div>
              </div>
              <div v-else>No trucks</div>
            </div>
            <div class="available-drivers">
                <span class="available-drivers__title">Available drivers</span>
              <div v-if="driversAvailable">
                <div v-for="driver of this.drivers">
                  <span>{{ driver.name }} {{ driver.last_name }}</span>
                </div>
              </div>
            </div>
          </div>
          <hr class="section__hr">
        </section>

        <!--        <BaseButton-->
        <!--            :button="{-->
        <!--        name: 'Create order',-->
        <!--        class: 'orders__btn w-25 btn btn-primary'-->
        <!--          }"-->
        <!--            v-on:callback="createOrder()"/>-->
      </div>
    </section>
  </div>
</template>

<script>
import ShipmentToDeliver from "@/components/orders/ShipmentToDeliver";
import BaseButton from "@/components/base-components/BaseButton";

import axios from "axios";
import {useToast} from "vue-toastification";

export default {
  name: "OrderPage",
  components: {ShipmentToDeliver, BaseButton},
  mounted() {
    this.getShipments()
    this.getCities()
  },
  methods: {
    getShipments() {
      let self = this;
      axios.get("http://localhost:5000/api/shipments-prepared/")
          .then(function (response) {
            self.shipments = response.data;
          });

    },
    getCities() {
      let self = this;
      return axios({
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
      console.log(this.chosenShipments);
      if (this.chosenShipments.length > 0) {
        let wayPoints = [];
        for (let item of this.chosenShipments) {
          let wayPointLoading = {};
          Object.assign(wayPointLoading, {
            shipment: {
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
        console.log(wayPoints);
        let self = this;
        axios.post("http://localhost:5000/api/orders/preorder", {way_points: wayPoints})
            .then(function (response) {
              self.drivers = response.data.drivers;
              self.trucks = response.data.trucks;
              self.trucksAvailable = true;
              self.driversAvailable = true;
            })
            .catch(function (error) {
              self.trucksAvailable = false;
              self.driversAvailable = false;
              useToast().warning(error.response.data.error_description)
            });
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
      trucksAvailable : false,
      driversAvailable : false
    }
  }

}
</script>

<style scoped lang="scss" src="../../styles/pages/orders.scss"></style>
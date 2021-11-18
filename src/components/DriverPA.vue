<template>
  <div>
    <div class="card text-dark bg-light mb-3">
      <h1 class="card-header">Driver {{ driver.name }} {{ driver.last_name }}</h1>
      <div class="card-body">
        <h5 class="card-title">Personal account </h5>
        <table class="table">
          <thead>
          <tr>
            <td>Personal Number</td>
            <td>Co-drivers</td>
            <td>Truck</td>
            <td>Transport order</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ this.driver.personal_number }}</td>
            <td>
              <template v-for="driver in this.transport_order.drivers">
                <span v-if="this.driver.personal_number !== driver.personal_number">
                  {{ driver.name }} {{ driver.last_name }} ({{ driver.personal_number }})<br>
                </span>
              </template>
            </td>
            <td v-if="driver.truck">{{ driver.truck.model }} {{ driver.truck.reg_number }}</td>
            <td>{{ transport_order.number }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <BaseRouterLink
            :link="{
                      class : 'btn btn-outline-info  m-2',
                      path: '/orders/'+ this.transport_order.id + '/edit',
                      name: 'Manage order'}"
        />
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {useToast} from "vue-toastification";
import BaseRouterLink from "@/components/base-components/BaseRouterLink";

const $axios = axios.create({
  headers: {'Authorization': localStorage.getItem("dataToken")}
});

$axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    window.location.href = '/auth';
    if (localStorage.removeItem("dataToken") && localStorage.removeItem("currentUser")) {
      localStorage.removeItem("dataToken");
      localStorage.removeItem("currentUser");
    }
    return Promise.reject('cancel');
  }
});


export default {
  name: "DriverPA",
  components: {BaseRouterLink},
  beforeMount() {
    let self = this;
    let personalNumber = localStorage.getItem("currentUser").personal_number;
    let url = "http://localhost:5000/api/drivers/personal-account/" + personalNumber;
    return $axios.get(url)
        .then(function (response) {
          if (response.data.driver)
            self.driver = response.data.driver;
          if (response.data.transport_order)
            self.transport_order = response.data.transport_order;
        }).catch(function (error) {
          useToast().warning(error.response.data.error_description)
        });
  },
  data() {
    return {
      driver: {
        personal_number: "",
        name: "",
        last_name: "",
        truck: {
          model: "",
          reg_number: "",
        }
      },
      transport_order: {
        number: "",
        drivers: {},
      },
    }
  },
}
</script>

<style scoped>
</style>
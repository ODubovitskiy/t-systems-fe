<template>
  <div class="row">
    <div class="col-md-2">
      <router-link class="btn btn-primary w-75" to="/orders/create">Add order</router-link>
    </div>
    <div class="col-md-10">
      <h1 class="text-muted">List of orders</h1>
      <div class="accordion" id="accordionOrders">
        <div v-for="order of this.orders">
          <div class="accordion-item">
            <h2 class="accordion-header" :id="'headingOne-' + order.id">
              <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      :data-bs-target="'#collapse-' + order.id"
                      aria-expanded="true" :aria-controls="'collapse-' + order.id">
                Transport order № {{ order.number }}
                <span class="text-end"> ({{ order.status }}) </span>
              </button>
            </h2>
            <div :id="'collapse-' + order.id" class="accordion-collapse collapse"
                 :aria-labelledby="'headingOne-' + order.id"
                 data-bs-parent="#accordionOrders">
              <div class="accordion-body">
                <table class="w-100">
                  <tr>
                    <td>
                      <h5 class="text-muted">Drivers</h5>
                    </td>
                    <td>
                      <h5 class="text-muted">Truck</h5>
                    </td>
                  </tr>
                  <tr>
                    <td class="align-top">
                      <div v-for="driver of order.drivers">
                        <div class="text-start">
                          <strong>
                            {{ driver.status === "DRIVING" ? 'Driver' : 'Co-driver' }} :
                          </strong>
                          <span>{{ driver.name }} {{ driver.last_name }} ( p/n: {{ driver.personal_number }})</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-start">
                       <span>
                          <strong>Truck:</strong> {{ order.truck.model }} ( reg.number: {{ order.truck.reg_number }})
                        </span>
                      </div>
                      <div class="text-start">
                        <span>
                          <strong>Load capacity:</strong>{{ order.truck.load_capacity }}
                        </span>
                      </div>
                      <div class="text-start">
                        <span>
                          <strong>Average speed: </strong>{{ order.truck.average_speed }}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
                <hr>
                <table class="w-100 table table-hover">
                  <thead>
                  <tr class="text-center">
                    <th>From (Loading)</th>
                    <th>To (Unloading)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="waypoint of order.way_points" class="way-points">
                    <td>
                      <span>{{ waypoint.shipment.name }}</span>
                    </td>
                    <td>
                      <span v-if="waypoint.type ==='LOADING'"> {{ waypoint.city.city }} </span>
                    </td>
                    <td>
                      <span v-if="waypoint.type ==='UNLOADING'"> {{ waypoint.city.city }}</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
)

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
    }
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      let self = this;
      $axios.get("http://localhost:5000/api/orders")
          .then(function (response) {
            self.orders = response.data;
          })
          .catch(function (error) {
            useToast().warning(error.response.data.error_description)
          })
    },
  }
}
</script>

<style scoped>

</style>
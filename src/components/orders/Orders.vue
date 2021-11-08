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
                <span style="float: right">{{ order.status }}</span>
              </button>
            </h2>
            <div :id="'collapse-' + order.id" class="accordion-collapse collapse"
                 :aria-labelledby="'headingOne-' + order.id"
                 data-bs-parent="#accordionOrders">
              <div class="accordion-body">
                <table>
                  <tr>
                    <td>
                      <div><strong>Truck</strong> :</div>
                    </td>
                    <td>
                      <div><strong>Drivers</strong> :</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div><strong>Status:</strong> {{ order.status }}</div>
                      <div><strong>Truck:</strong> {{ order.truck.model }} ( reg.number: {{ order.truck.reg_number }})
                      </div>
                      <div><strong>Load capacity:</strong>{{ order.truck.load_capacity }}</div>
                      <div><strong>Average speed: </strong>{{ order.truck.average_speed }}</div>
                    </td>
                    <td>
                      <div v-for="driver of order.drivers">
                        <strong>
                          {{ driver.status === "DRIVING" ? 'Driver' : 'Co-driver' }} :
                        </strong>
                        <span>{{ driver.name }} {{ driver.last_name }} ( p/n: {{ driver.personal_number }})</span>
                      </div>
                    </td>
                  </tr>
                </table>
                <hr>
                <div v-for="waypoint of order.way_points" class="way-points">
                  <div class="shipment">
                    <strong> {{ waypoint.shipment.name }} </strong>
                    <div v-if="waypoint.type ==='LOADING'">
                      <span> <strong> From: </strong>{{ waypoint.city.city }}</span>
                      Type: {{ waypoint.type }}
                    </div>
                    <div v-else>
                      <span>  <strong> To: </strong>{{ waypoint.city.city }}</span>
                      Type: {{ waypoint.type }}
                    </div>
                  </div>
                </div>
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
      axios.get("http://localhost:5000/api/orders")
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
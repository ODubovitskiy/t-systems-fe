<template>
  <div class="edit-shipment">
    <div class="row">
      <div class="form-group mb-3">
            <label for="shipment" class="form-label float-start">{{ shipment.name }}</label>
            <select @change="statusChanged" v-model="this.shipmentStatus" name="shipment" class="form-control"
                    id="shipment">
              <option value="" disabled selected>Select shipment status</option>
              <template v-for="status of this.shipmentStatuses">
                <option :value=status>{{ status }}</option>
              </template>
            </select>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

const $axios = axios.create({
  headers: {'Authorization': localStorage.getItem("dataToken")}
});

$axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if ((error.response.status === 401)) {
    window.location.href = '/auth';
    if (localStorage.removeItem("dataToken") && localStorage.removeItem("currentUser")) {
      localStorage.removeItem("dataToken");
      localStorage.removeItem("currentUser");
    }
    return Promise.reject('cancel');
  }
});

export default {
  name: "EditShipment",
  props: ["shipment"],
  data() {
    return {
      shipmentStatuses: {},
      shipmentStatus: "",
    }
  },
  mounted() {
    this.getShipmentStatuses();
  },
  methods: {
    getShipmentStatuses() {
      let self = this;
      $axios.get("http://localhost:5000/api/shipment-statuses/")
          .then(function (response) {
            self.shipmentStatuses = response.data;
          });
    },
    statusChanged() {
      this.shipment.status = this.shipmentStatus;
      this.$emit("shipmentStatusChanged", this.shipment)
    }
  }
}
</script>

<style scoped>

</style>
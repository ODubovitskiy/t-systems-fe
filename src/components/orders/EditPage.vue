<template>
  <div class="edit-order">
    <div class="container">
      <div class="row">
        <OrderToEdit
        :order="order"/>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import OrderToEdit from "@/components/orders/OrderToEdit";

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
  name: "EditPage",
  components: {OrderToEdit},
  data() {
    return {
      order: {}
    }
  },
  mounted() {
    this.getOrderById();
  },
  methods: {
    getOrderById() {
      let url = "http://localhost:5000/api/orders/" + this.$route.params.id;
      let self = this;
      return $axios({
        method: "get",
        url: url,
      }).then(function (response) {
        self.order = response.data;
      });
    }
  },
}
</script>

<style scoped>

</style>
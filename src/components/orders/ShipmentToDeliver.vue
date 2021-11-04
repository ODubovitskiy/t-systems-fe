<template>
  <div class="orders-dashboard__row">
    <div class=" orders-dashboard__column">
      <div class="form-check">
        <input @click="selectedShipment" class="form-check-input" type="checkbox" value=""
               id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          {{ shipment.name }}
        </label>
      </div>
    </div>
    <div class=" orders-dashboard__column">
      <select @change="" v-model="this.shipmentToDeliver.city_from" class="form-select"
              aria-label="Default select example">
        <option value="" selected>Choose city of destination</option>
        <option v-for="city of cities" :value="city">{{ city.city }}</option>
      </select>
    </div>
    <div class=" orders-dashboard__column">
      <select @change="" v-model="this.shipmentToDeliver.city_to" class="form-select"
              aria-label="Default select example">
        <option value="" selected>Choose city of departure</option>
        <option v-for="city of cities" :value="city">{{ city.city }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShipmentToDeliver",
  props: ["shipment", "cities"],
  methods: {
    selectedShipment() {
      this.$emit("selectedShipment",
          this.shipmentToDeliver
      )
    }
  },
  data() {
    return {
      shipmentToDeliver: {
        shipment: this.shipment,
        city_from: {},
        city_to: {},
        type: {},
      },
    }
  }
}
</script>

<style scoped lang="scss" src="../../styles/pages/orders.scss"></style>
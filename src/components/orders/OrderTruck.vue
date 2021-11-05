<template>
  <div class="orders-dashboard__row">
    <div class=" orders-dashboard__column">
      <div class="form-check">
        <div v-for="truck of this.trucks">
          <input @click="selectedTruck(truck)" class="form-check-input" type="radio" value=""
                 id="selectedTruck" name="orderTruck">
          <!--          <label class="form-check-label" for="selectedTruck">-->
          <!--          </label>-->
          <div class=" orders-dashboard__column">
            <router-link class="text-decoration-none"
                         :to="'/trucks/' + truck.id">{{ truck.model }} {{ truck.reg_number }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDriver",
  props: ["trucks"],
  methods: {
    selectedTruck(truck) {
      this.$emit("selectedTruck", truck)
    }
  }

}
</script>

<style scoped>

</style>
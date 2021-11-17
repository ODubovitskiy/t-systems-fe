<template>
  <div class="orders-dashboard__row">
    <div class=" orders-dashboard__column">
      <div class="form-check">
        <input @click="selectedDriver" class="form-check-input" type="checkbox" value=""
               id="selectedDriver">
        <label class="form-check-label" for="selectedDriver">
        </label>
      </div>
    </div>
    <div class=" orders-dashboard__column">
      <router-link class="text-decoration-none"
                   :to="'/drivers/' + driver.id">{{ driver.name }} {{ driver.last_name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDriver",
  props: ["driver"],
  methods: {
    selectedDriver() {
      this.$emit("selectedDriver", {
        driver: this.driver
      })
    }
  }
}
</script>

<style scoped>

</style>
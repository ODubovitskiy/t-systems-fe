<template>
  <div>
    <h1>This is an orders page</h1>
    <Shipment/>
  </div>
</template>

<script>

import Shipment from "@/components/orders/Shipment";

export default {
  name: "Content",
  components: {
    Shipment,
  }

}
</script>

<style scoped>

</style>
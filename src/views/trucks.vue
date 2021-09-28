<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <sidebar/>
      </div>
      <div class="col-md-10">
        <content-trucks/>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/trucks/sidebar";
import contentTrucks from "@/components/trucks/content"

export default {
  components: {
    sidebar,
    contentTrucks
  }
}
</script>
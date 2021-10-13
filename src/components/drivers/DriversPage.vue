<template>
  <div class="row">
    <div class="col-md-2">
      <BaseButton :button="{
          name: 'Add driver',
          toggle: 'modal',
          target:'#addDriver',
          class: 'btn btn-primary'}"/>
      <AddDriverModal/>
    </div>

    <div class="col-md-10">
      <DriversTable/>
    </div>

  </div>
</template>

<script>

import DriversTable from "@/components/drivers/DriversTable";
import BaseButton from "@/components/base-components/BaseButton";
import AddDriverModal from "@/components/drivers/modals/AddDriverModal";
import {actionTypes} from "@/stores/actionTypes";

export default {
  name: "DriversPage",
  components: {
    AddDriverModal,
    BaseButton, DriversTable
  },
  mounted() {
    this.$store.dispatch(actionTypes.GET_DRIVERS);
    this.$store.dispatch(actionTypes.GET_CITIES);
    this.$store.dispatch(actionTypes.GET_AVAILABLE_TRUCKS);
  }

}
</script>

<style scoped>

</style>
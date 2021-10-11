<template>
  <div class="row">
    <div class="col-md-2">
      <BaseButton :button="{
          name: 'Add truck',
          toggle: 'modal',
          target:'#addTruck',
          class: 'btn btn-primary'}"/>
      <AddTruckModal/>
    </div>

    <div class="col-md-10">
      <TruckTable/>
    </div>

  </div>
</template>

<script>
import TruckTable from "@/components/trucks/TruckTable"
import BaseButton from "@/components/base-components/BaseButton"
import AddTruckModal from "@/components/trucks/modals/AddTruckModal"
import {actionTypes} from "@/stores/actionTypes";

export default {
  name: "TrucksPage",
  components: {
    TruckTable, BaseButton, AddTruckModal
  },
  mounted() {
    this.$store.dispatch(actionTypes.GET_CITIES);
    this.$store.dispatch(actionTypes.GET_TRUCKS);
  }
}
</script>

<style scoped>

</style>
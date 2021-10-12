<template>

  <div class="row">
    <div class="sidebar col-md-2">

      <BaseButton
          :button="{
                name : 'Save',
                type : 'button',
                class : 'btn btn-outline-info'}"
          v-on:callback="update()"/>
    </div>
    <div class="col-md-10">
      <form>
        <div class="form-group mb-3">
          <label class="form-label float-start" for="truck-model">Truck model</label>
          <input id="truck-model" v-model="model" aria-describedby="emailHelp" class="form-control"
                 name="truck_model"
                 placeholder="Type model"
                 type="text">
        </div>
        <div class="form-group mb-3">
          <label class="form-label float-start" for="reg-number">Registration number</label>
          <input id="reg-number" v-model="reg_number" class="form-control"
                 name="reg_number"
                 placeholder="Registration number"
                 type="text">
        </div>
        <div class="form-group mb-3">
          <label class="form-label float-start" for="driver-shift">Driver shift</label>
          <input id="driver-shift" v-model="driver_shift" class="form-control" name="driver_shift"
                 placeholder="Driver shift"
                 type="text">
        </div>
        <div class="form-group mb-3">
          <label class="form-label float-start" for="load-capacity">Capacity</label>
          <input id="load-capacity" v-model="load_capacity" class="form-control" name="load_capacity"
                 placeholder="Load capacity"
                 type="text">
        </div>
        <div class="form-group mb-3">
          <label for="city" class="form-label float-start">City</label>
          <select v-model="city" name="city" class="form-control" id="city">
            <template v-for="city in cities">
              <option :value=city>{{ city.city }}</option>
            </template>
          </select>
        </div>
        <div class="form-group mb-3">
          <label class="form-label float-start" for="status">Status</label>
          <select v-model="status" id="status" class="form-control" name="status">
            <template v-for="status in statuses">
              <option v-bind:value="status">{{ status }}</option>
            </template>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {actionTypes} from "@/stores/actionTypes";
import BaseButton from "@/components/base-components/BaseButton";

export default {
  name: "Edit",
  components: {BaseButton},
  computed: {
    mainStore: {
      get() {
        return this.$store.state;
      }
    },
    truck: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck;
      },
      set(value) {
        this.$store.commit('updateTruckToEdit', value);
      }
    },

    model: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.model;
      },
      set(value) {
        this.$store.commit('editModel', value);
      }
    },
    reg_number: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.reg_number;
      },
      set(value) {
        this.$store.commit('editRegNumber', value);
      }
    },
    driver_shift: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.driver_shift;
      },
      set(value) {
        this.$store.commit('editDriverShift', value);
      }
    },
    load_capacity: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.load_capacity;
      },
      set(value) {
        this.$store.commit('editLoadCapacity', value);
      }
    },
    city: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.city;
      },
      set(value) {
        this.$store.commit('editCity', value);
      }
    },
    status: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truck.status;
      },
      set(value) {
        this.$store.commit('editStatus', value);
      }
    },


    id: {
      get() {
        return this.mainStore.trucksTab.truckEdit.truckId;
      },
      set(value) {
        this.$store.commit('updateTruckIdToEdit', this.pathId);
      }
    },
    cities: {
      get() {
        return this.mainStore.trucksTab.cities;
      }
    },
    statuses: {
      get() {
        return this.mainStore.trucksTab.statuses;
      }
    }
  }, beforeMount() {
    this.$store.commit('updateTruckIdToEdit', this.$route.params.id)
    this.$store.dispatch(actionTypes.GET_TRUCK_BY_ID);
    this.$store.dispatch(actionTypes.GET_TRUCK_STATUSES);
  }, methods: {
    update() {
      this.$store.dispatch(actionTypes.UPDATE_TRUCK);
      this.$router.push("/trucks");
    }
  }
}
</script>

<style scoped>

</style>

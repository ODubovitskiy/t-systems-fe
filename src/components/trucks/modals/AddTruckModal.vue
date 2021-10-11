<template>
  <div class="modal fade" id="addTruck" tabindex="-1" aria-labelledby="addTruckLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTruckLabel">Add truck</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group mb-3">
              <label for="model" class="form-label float-start">Truck model</label>
              <input v-model="model" type="text" name="model" class="form-control" id="model"
                     placeholder="Type model">
            </div>

            <div class="form-group mb-3">
              <label for="reg-number" class="form-label float-start">Registration number</label>
              <input v-model="reg_number" type="text" name="reg_number" class="form-control"
                     id="reg-number"
                     placeholder="Registration number">
            </div>

            <div class="form-group mb-3">
              <label for="driver-shift" class="form-label float-start">Driver shift</label>
              <input v-model="driver_shift" type="text" name="driver_shift" class="form-control" id="driver-shift"
                     placeholder="Driver shift">
            </div>

            <div class="form-group mb-3">
              <label for="load-capacity" class="form-label float-start">Load capacity</label>
              <input v-model="load_capacity" type="text" name="load_capacity" class="form-control" id="load-capacity"
                     placeholder="Load capacity">
            </div>

            <div class="form-group mb-3">
              <label for="city" class="form-label float-start">City</label>
              <select v-model="city" name="city" class="form-control" id="city">
                <option value="" disabled selected>Select city</option>
                <template v-for="city in cities">
                  <option :value=city.id>{{ city.city }}</option>
                </template>
              </select>
            </div>
            <!--      Button-->
            <div class="modal-footer float-end m-2">
              <BaseButton
                  v-on:callback="submitForm()"
                  :button="{
                name : 'Save truck',
                type : 'button',
                class : 'btn btn-outline-info'}"/>

              <BaseButton
                  :button="{
                name : 'Close',
                type : 'button',
                class : 'btn btn-outline-danger',
                dismiss: 'modal'
                }"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import BaseButton from "@/components/base-components/BaseButton";

export default {
  name: "AddTruckModal",
  components: {
    BaseButton
  }, methods: {
    submitForm() {
      this.$store.dispatch(actionTypes.SUBMIT_FORM_ADD_TRUCK);
      this.$router.go("/trucks");
    }
  },
  computed: {
    mainStore: {
      get() {
        return this.$store.state;
      }
    },
    cities: {
      get() {
        return this.mainStore.trucksTab.cities;
      }
    },
    add_truck_modal_form: {
      get() {
        return this.mainStore.trucksTab.modals.truck_add.form;
      }
    },
    model: {
      get() {
        return this.add_truck_modal_form.model;
      },
      set(value) {
        this.$store.commit('updateModel', value);
      }
    },
    reg_number: {
      get() {
        return this.add_truck_modal_form.reg_number;
      },
      set(value) {
        this.$store.commit('updateRegNumber', value);
      }
    },
    driver_shift: {
      get() {
        return this.add_truck_modal_form.driver_shift;
      },
      set(value) {
        this.$store.commit('updateDriverShift', value);
      }
    },
    load_capacity: {
      get() {
        return this.add_truck_modal_form.load_capacity;
      },
      set(value) {
        this.$store.commit('updateLoadCapacity', value);
      }
    },
    city: {
      get() {
        return this.add_truck_modal_form.city.id;
      },
      set(value) {
        this.$store.commit('updateCity', value);
      }
    },
    status: {
      get() {
        return this.add_truck_modal_form.status;
      },
      set(value) {
        this.$store.commit('updateStatus', value);
      }
    },
  },
  mounted() {
  }
}

</script>


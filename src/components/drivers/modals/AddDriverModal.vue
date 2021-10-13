<template>
  <div class="modal fade" id="addDriver" tabindex="-1" aria-labelledby="addDriver" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addDriverLabel">Add Driver</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <form class="col-md-12">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="name" type="text" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label">Last name</label>
              <input v-model="last_name" type="text" class="form-control" id="last_name">
            </div>

            <div class="form-group mb-3">
              <label for="truck" class="form-label float-start">Truck</label>
              <select v-model="truck" name="truck" class="form-control" id="truck">
                <option value="" disabled selected>Select truck</option>
                <template v-for="truck in truckAvailable">
                  <option :value=truck.id>{{ truck.model + " " + truck.reg_number }}</option>
                </template>
              </select>
            </div>

            <div class="form-group mb-3">
              <label for="city" class="form-label float-start">City</label>
              <select v-model="city" name="truck" class="form-control" id="city">
                <option value="" disabled selected>Select city</option>
                <template v-for="city in cities">
                  <option :value=city.id>{{ city.city }}</option>
                </template>
              </select>
            </div>

            <div class="modal-footer float-end m-2">
              <BaseButton
                  v-on:callback="submitForm()"
                  :button="{
                name : 'Save driver',
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
  name: "AddDriverModal",
  components: {
    BaseButton
  }, methods: {
    submitForm() {
      this.$store.dispatch(actionTypes.SUBMIT_FORM_ADD_DRIVER);
      this.$router.go("/drivers");
    }
  },
  computed: {
    mainStore: {
      get() {
        return this.$store.state.driverTab;
      }
    },
    truckAvailable: {
      get() {
        return this.mainStore.forms.truckAvailable;
      }
    }, cities: {
      get() {
        return this.mainStore.cities;
      }
    },
    name: {
      get() {
        return this.mainStore.forms.addDriver.name;
      },
      set(value) {
        this.$store.commit("updateAddDriverName", value);
      }
    },
    last_name: {
      get() {
        return this.mainStore.forms.addDriver.last_name;
      },
      set(value) {
        this.$store.commit("updateAddDriverLastName", value);
      }
    },
    truck: {
      get() {
        return this.mainStore.forms.addDriver.truck.id;
      },
      set(value) {
        this.$store.commit("updateAddDriverTruck", value);
      }
    },
    city: {
      get() {
        return this.mainStore.forms.addDriver.city.id;
      },
      set(value) {
        this.$store.commit("updateAddDriverCity", value);
      }
    }
    ,
    mounted() {
    }
  },
}

</script>


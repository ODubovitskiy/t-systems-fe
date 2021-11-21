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
        <div class="mb-3">
          <label for="name" class="float-start form-label">Name</label>
          <input v-model="name" type="text" class="form-control" id="name">
          <div v-if="v$.name.$invalid" class="text-danger">Name is required</div>
        </div>

        <div class="mb-3">
          <label for="last_name" class="float-start form-label">Last name</label>
          <input v-model="last_name" type="text" class="form-control" id="last_name">
          <div v-if="v$.last_name.$invalid" class="text-danger">Lastname is required</div>
        </div>

        <div class="mb-3">
          <label for="personal_number" class="float-start form-label">Personal number</label>
          <input v-model="personal_number" type="text" class="form-control" id="personal_number" disabled>
        </div>

        <div class="mb-3">
          <label for="hours_worked" class="float-start form-label">Hours worked</label>
          <input v-model="hours_worked" type="text" class="form-control" id="hours_worked">
          <div v-if="v$.hours_worked.$invalid" class="text-danger">Value is incorrect</div>
        </div>

        <div class="form-group mb-3">
          <label for="city" class="form-label float-start">City</label>
          <select v-model="city" name="city" class="form-control" id="city">
            <option value="" disabled >Select city</option>
            <template v-for="city in cities">
              <option :value=city.id>{{ city.city }}</option>
            </template>
          </select>
          <div v-if="v$.city.$invalid" class="text-danger">City is required</div>
        </div>

        <div class="form-group mb-3">
          <label for="truck" class="form-label float-start">Truck</label>
          <select v-model="truck" name="truck" class="form-control" id="truck">
            <option value="" disabled >Select truck</option>
            <template v-for="truck in available_trucks">
              <option :value=truck.id>{{ truck.model }}</option>
            </template>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="status" class="form-label float-start">Status</label>
          <select v-model="status" name="status" class="form-control" id="status">
            <option  disabled >Select status</option>
            <template v-for="(status) in statuses">
              <option :value=status.toUpperCase()>{{ status }}</option>
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
import useVuelidate from '@vuelidate/core'
import {alpha, between, minLength, required, numeric} from "@vuelidate/validators";

export default {
  name: "Edit",
  components: {BaseButton},
  setup() {
    return {v$: useVuelidate()}
  },
  validations() {
    return {
      name: {required,alpha,  minLength: minLength(2)},
      last_name: {required,alpha,  minLength: minLength(2)},
      city: {required},
      hours_worked: {
        required: required,
        numeric: numeric,
        between: between(0, 176),
      },
    }
  },
  computed: {
    formIsValid() {
      return !this.v$.name.$invalid && !this.v$.last_name.$invalid && !this.v$.city.$invalid && !this.v$.hours_worked.$invalid
    },
    mainStore: {
      get() {
        return this.$store.state.driverTab.forms.driverEdit;
      }
    },
    driver: {
      get() {
        return this.mainStore.driver;
      },
    },
    name: {
      get() {
        return this.mainStore.form.name;
      },
      set(value) {
        this.$store.commit("updateDriverNameToEdit", value);
      }
    },
    last_name: {
      get() {
        return this.mainStore.form.last_name;
      },
      set(value) {
        this.$store.commit("updateDriverLastNameToEdit", value);
      }
    },
    personal_number: {
      get() {
        return this.mainStore.form.personal_number;
      },
      set(value) {
        this.$store.commit("updateDriverPersonalNumberToEdit", value);
      }
    },
    status: {
      get() {
        return this.mainStore.form.status;
      },
      set(value) {
        this.$store.commit("updateDriverStatusToEdit", value.toUpperCase().replace(" ", "_"));
      }
    },
    hours_worked: {
      get() {
        return this.mainStore.form.hours_worked;
      },
      set(value) {
        this.$store.commit("updateDriverHoursWorkedToEdit", value);
      }
    },
    city: {
      get() {
        return this.mainStore.form.city.id;
      },
      set(value) {
        this.$store.commit("updateDriverCityToEdit", value);
      }
    },
    truck: {
      get() {
        return this.mainStore.form.truck.id;
      },
      set(value) {
        this.$store.commit("updateDriverTruckToEdit", value);
      }
    },
    available_trucks: {
      get() {
        return this.mainStore.available_trucks;
      },
    },
    cities: {
      get() {
        return this.mainStore.cities;
      },
    },
    statuses: {
      get() {
        return this.mainStore.statuses;
      },
    }


  }
  ,
  beforeMount() {
    this.$store.commit('updateDriverIdToEdit', this.$route.params.id)
    this.$store.dispatch(actionTypes.GET_DRIVER_BY_ID);
  }
  ,
  mounted() {
    this.$store.dispatch(actionTypes.GET_DRIVER_STATUSES);
    this.$store.dispatch(actionTypes.GET_AVAILABLE_TRUCKS);
    this.$store.dispatch(actionTypes.GET_CITIES);
  }
  ,
  methods: {
    update() {
      if (this.formIsValid) {
        this.$store.dispatch(actionTypes.UPDATE_DRIVER);
        this.$router.push("/drivers");
      }
    }
  }

}
</script>

<style scoped>

</style>
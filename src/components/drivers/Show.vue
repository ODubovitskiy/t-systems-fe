<template>
  <div class="row">
    <div class="sidebar col-md-2">
      <BaseButton
          :button="{
          name :'Delete',
          class :'btn btn-danger m-2',
          type :'button',
          toggle : 'modal',
          target : '#deleteDriverModal',
        }"/>

      <BaseRouterLink
          :link="{
        class : 'btn btn-outline-secondary m-2',
        path: '/drivers',
        name: 'Back to list'
       }"
      />

      <BaseRouterLink
          :link="{
        class : 'btn btn-outline-info  m-2',
        path: '/drivers/'+ id + '/edit',
        name: 'Edit'
       }"
      />
    </div>

    <div class="card col-md-10">
      <div class="m-2 card-header">
        <h4 class="m-1">
          Detailed information about <strong>{{ driver.name }} {{ driver.last_name }}</strong>
        </h4>
      </div>

      <div class="card-body">
        <div class="card-text">
          <div class="modal-body">
            <div class="row mb-5">
              <div class="col-6">
                <div class="text-start text-muted">Name</div>
                <div class="text-start text-muted">Personal number</div>
                <div class="text-start text-muted">Status</div>
                <div class="text-start text-muted">Hours worked</div>
                <div class="text-start text-muted">City</div>
                <div class="text-start text-muted">Truck</div>
              </div>
              <div class="col-6">
                <div class="text-start text-muted">{{ driver.name }} {{ driver.last_name }}</div>
                <div class="text-start text-muted">{{ driver.personal_number }}</div>
                <div class="text-start text-muted">{{ driver.status }}</div>
                <div class="text-start text-muted">{{ driver.hours_worked }}</div>
                <div class="text-start text-muted">{{ driver.city.city }}</div>
                <div class="text-start text-muted">{{ driver.truck === null ? "Truck is not stated": driver.truck.model }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="deleteDriverModal" aria-hidden="true" aria-labelledby="deleteDriverModalLabel" class="modal fade"
         tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteDriverModalLabel" class="modal-title">Confirm</h5>
          </div>
          <div class="modal-body">
            Do you really want to delete <strong>{{ driver.name }} {{ driver.last_name }}</strong>? <br> This
            action is irreversible.
          </div>
          <div class="modal-footer">
            <BaseButton
                :button="{
                  class : 'btn btn-outline-danger m-2',
                  path: '/drivers/' + id,
                  name: 'Delete'}"
                v-on:callback="deleteDriver()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/base-components/BaseButton";
import BaseRouterLink from "@/components/base-components/BaseRouterLink";
import {actionTypes} from "@/stores/actionTypes";

export default {
  name: "Show",
  components: {
    BaseButton, BaseRouterLink,
  }, computed: {
    mainStore: {
      get() {
        return this.$store.state.driverTab.driverShow;
      }
    },
    id: {
      get() {
        return this.mainStore.id;
      },
    },
    driver: {
      get() {
        return this.mainStore.driver;
      },
      set(value) {
        this.$store.commit('updateDriverToShow', value);
      }
    },
  },
  beforeMount() {
    this.$store.commit('updateDriverToShowId', this.$route.params.id)
    this.$store.dispatch(actionTypes.GET_DRIVER_BY_ID);

  },
  mounted() {
    this.$store.dispatch(actionTypes.GET_DRIVER_BY_ID);
    this.$store.commit("deleteDriver", this.$route.params.id);
  },
  methods: {
    deleteDriver() {
      let els = document.getElementsByClassName("modal-backdrop");
      for (let i = 0; i < els.length; i++) {
        els[i].style.display = "none"
      }
      document.getElementById("deleteDriverModal").style.display = "none"
      document.getElementById("deleteDriverModal").classList.remove("show")
      this.$store.dispatch(actionTypes.DELETE_DRIVER);
      this.$router.push("/drivers");
    },
  }
}
</script>

<style scoped>
.btn {
  width: 100%;
}
</style>
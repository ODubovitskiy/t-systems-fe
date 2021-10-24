<template>
  <div class="row">
    <div class="sidebar col-md-2">
      <BaseButton
          :button="{
          name :'Delete',
          class :'btn btn-danger m-2',
          type :'button',
          toggle : 'modal',
          target : '#deleteTruckModal',
        }"/>

      <BaseRouterLink
          :link="{
        class : 'btn btn-outline-secondary m-2',
        path: '/trucks',
        name: 'Back to list'
       }"
      />

      <BaseRouterLink
          :link="{
        class : 'btn btn-outline-info  m-2',
        path: '/trucks/'+ id + '/edit',
        name: 'Edit'
       }"
      />
    </div>
    <div class="card col-md-10">
      <div class="card-header">
        Detailed information about <strong>{{ truck.model }} {{ truck.registration_number }}</strong>

      </div>
      <div class="card-body">
        <div class="card-text">
          <div class="modal-body">
            <div class="row mb-5">
              <div class="col-6">
                <div class="text-muted">Truck model</div>
                <div class="text-muted">Registration number</div>
                <div class="text-muted">Driver shift</div>
                <div class="text-muted">City</div>
                <div class="text-muted">Capacity</div>
                <div class="text-muted">Status</div>
              </div>
              <div class="col-6">
                <div class="text-muted">{{ truck.model }}</div>
                <div class="text-muted">{{ truck.reg_number }}</div>
                <div class="text-muted">{{ truck.driver_shift }}</div>
                <div class="text-muted">{{ truck.load_capacity }}</div>
                <div class="text-muted">{{ truck.city.city }}</div>
                <div class="text-muted">{{ truck.status }}</div>
              </div>
            </div>
            <div class="row">
              <div class="pt-5 modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="deleteTruckModal" aria-hidden="true" aria-labelledby="deleteTruckModalLabel" class="modal fade"
         tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteTruckModalLabel" class="modal-title">Confirm</h5>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            Do you really want to delete <strong>{{ truck.model }} {{ truck.registration_number }}</strong>? <br> This
            action is irreversible.
          </div>
          <div class="modal-footer">
            <BaseButton

                :button="{
            class : 'btn btn-outline-danger m-2',
            path: '/trucks/' + id,
            name: 'Delete'}"
                v-on:callback="deleteTruck()"/>
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
    BaseButton, BaseRouterLink
  },
  computed: {
    mainStore: {
      get() {
        return this.$store.state;
      }
    },
    truck: {
      get() {
        return this.mainStore.trucksTab.truckShow.truck;
      },
      set(value) {
        this.$store.commit('updateTruckToShow', value);
      }
    },
    id: {
      get() {
        return this.mainStore.trucksTab.truckShow.truckId;
      },
      set(value) {
        this.$store.commit('updateTruckId', this.pathId);
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.GET_TRUCK_BY_ID);
    this.$store.commit("deleteTruck", this.$route.params.id);
  },
  beforeMount() {
    this.$store.commit('updateTruckId', this.$route.params.id)
  }, methods: {
    deleteTruck() {
      let els = document.getElementsByClassName("modal-backdrop");
      for (let i = 0; i < els.length; i++) {
        els[i].style.display = "none"
      }
      document.getElementById("deleteTruckModal").style.display = "none"
      document.getElementById("deleteTruckModal").classList.remove("show")
      this.$store.dispatch(actionTypes.DELETE_TRUCK);
      this.$router.push("/trucks");
    }
  }
}
</script>

<style scoped>

.btn {
  width: 100%;
}

</style>

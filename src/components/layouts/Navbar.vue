<template>


  <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4">
    <div class="container-fluid">
      <button aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-bs-target="#navbar" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>

      <router-link class="navbar-brand" to="/">Home</router-link>
      <div id="navbar" class="collapse navbar-collapse">
        <ul v-if="currentUser" class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="!currentUser.hours_worked" class="nav-item">
            <router-link class="nav-link " to="/trucks">Trucks</router-link>
          </li>
          <li v-if="!currentUser.hours_worked" class="nav-item">
            <router-link class="nav-link " to="/drivers">Drivers</router-link>
          </li>
          <li v-if="!currentUser.hours_worked" class="nav-item">
            <router-link class="nav-link " to="/orders">Orders</router-link>
          </li>
          <li v-if="currentUser.hours_worked" class="nav-item">
            <router-link class="nav-link " to="/drivers/personal-account/">Driver Personal Account</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <div class="d-flex" v-if="currentUser">
            <span class="w-100">{{ currentUser.name }} {{ currentUser.last_name }} </span>
            <BaseButton
                :button="{
                name : 'Logout',
                type : 'button',
                class : 'btn btn-outline-secondary m-2'}"
                v-on:callback="logout()"
            />
          </div>
          <div class="d-flex" v-else>
            <BaseRouterLink
                :link="{
                name : 'Login',
                path : '/auth',
                class : 'btn btn-outline-secondary m-2'}"
            />
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>

import BaseButton from "@/components/base-components/BaseButton";
import BaseRouterLink from "@/components/base-components/BaseRouterLink";
import {actionTypes} from "@/stores/actionTypes";

export default {
  name: "Navbar",
  components: {BaseButton, BaseRouterLink},
  computed: {
    currentUser: {
      get() {
        if (localStorage.getItem("dataToken"))
          return JSON.parse(localStorage.getItem("currentUser"));
      }
    },
    mainStore: {
      get() {
        return this.$store.state.auth;
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT);
    }
  },
}
</script>

<style scoped>
</style>

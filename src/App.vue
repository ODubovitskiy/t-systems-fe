<script>

import navComponent from '@/components/layouts/Navbar'

export default {
  components: {
    navComponent
  },
  name: "App",
  props: ['nav'],

  computed: {
    appRoutes() {
      return window.appRoutes;
    }
  },
  methods: {},
  mounted() {

  },

  data() {
    return {
    }
  }
}
</script>

<template>
  <div>
    <div class="col-md-12 m-0 p-0">
      <navComponent/>
    </div>
    <div class="row">
      <div class="col-md-10 m-0 p-0 mt-4">
        <router-view/>
      </div>
    </div>

    <div class="container-modals">


    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div>
    <div class="row col-md-12">
      <navComponent/>
    </div>
    <div class="mt-4">
      <router-view/>
    </div>
  </div>
</template>


<script>
import navComponent from '@/components/layouts/nav-component'

export default {

  name: 'App',
  components: {
    navComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

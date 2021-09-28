<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <navComponent/>
      </div>
    </div>
    <div class="row">
      <trucks-content/>
    </div>
  </div>
</template>


<script>
import navComponent from '@/components/layouts/nav-component'
import sidebar from '@/components/layouts/sidebar-trucks'
import trucksContent from '@/components/trucks/trucks-content'

export default {

  name: 'App',
  components: {
    navComponent,
    sidebar,
    trucksContent
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

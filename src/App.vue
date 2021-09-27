<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <navComponent/>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <sidebar/>
      </div>
      <div class="col-md-10">
        <contentComponent/>
      </div>
    </div>
  </div>
</template>


<script>
import navComponent from '@/components/layouts/nav-component'
import sidebar from '@/components/layouts/sidebar'
import contentComponent from '@/components/layouts/content-component'

export default {

  name: 'App',
  components: {
    contentComponent,
    navComponent,
    sidebar

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

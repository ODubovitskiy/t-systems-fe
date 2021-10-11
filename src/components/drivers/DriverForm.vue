<template>
  <form class="col-md-12">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="last_name" class="form-label">Last name</label>
      <input type="text" class="form-control" id="last_name">
    </div>
    <div class="mb-3">
      <label for="status" class="form-label">Status</label>
      <select class="form-control" id="status">
        <option value="" disabled selected>Select the status</option>
        <option v-for="(status, index) in driver.statuses" :value="index">{{ status }}</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: "DriverForm",
  mounted() {

  },
  data() {
    return {
      driver: {
        statuses: ["Working", " On shift", "Driving"],


      },


    }
  }
}
</script>

<style scoped>

</style>
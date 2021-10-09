<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4">
    <div class="container-fluid">
      <button aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-bs-target="#navbar" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/">Home</router-link>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link " to="/trucks">Trucks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to="/drivers">Drivers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to="/orders">Orders</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input aria-label="Search" class="form-control me-2" placeholder="Search" type="search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>

<template>
  <router-link
      :class="link.class"
      :to="link.path">{{ link.name }}
  </router-link>
</template>

<script>
export default {
  name: "BaseRouterLink",
  props:
      ["link"],
}
</script>

<style scoped>

</style>
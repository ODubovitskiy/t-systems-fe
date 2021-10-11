<template>
  <div>
    <button :class="button.class"
            :type="button.type"
            :data-bs-toggle="button.toggle"
            :data-bs-target="button.target"
            :data-bs-dismiss="button.dismiss"
            @click="callback">{{ button.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["button"],
  methods: {
    callback() {
      return this.$emit("callback");
    }
  }
}
</script>

<style scoped>

button {
  width: 100%;
}

</style>
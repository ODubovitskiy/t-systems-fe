<script>
export default {
  name: "ui-input",
  props: {
    value: {
      type: String,
      default: null,
    },
  }
}
</script>

<template>
  <input
      class="ui-input form-control"
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
  >
</template>

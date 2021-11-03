<template>
  <div class="checkbox-block">
    <label class="checkbox-block__label">
      <input
          :disabled="disabled"
          class="checkbox-block__input"
          type="checkbox"
          :value="value"
          :checked="modelValue.includes(value)"
          @change="(evt) => onChange(evt.target.value)"
      >
      <span class="checkbox-block__slot-container">
        <slot/>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "ui-checkbox",
  props: {
    disabled:{
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: null,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(value) {
      if (this.modelValue.includes(this.value)) {
        this.$emit('update:modelValue', this.modelValue.filter((cv) => cv !== value))
      }
      else {
        this.$emit('update:modelValue', this.modelValue.concat(value))
      }
      this.$emit('callback');
    },
  }
}
</script>

<style lang="scss" scoped>

.checkbox-block{
  &__label{
    display: block;
    text-align: left;
  }

  &__slot-container{
    margin-left: 8px;
  }
}

</style>
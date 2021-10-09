<template>
  <div>
    <button
        :data-bs-target="btn.target_modal"
        :data-bs-toggle="btn.type_modal"
        class="btn btn-primary my-2 w-100 text-left"
        type="button"
    >
      <i class="bi bi-plus-square m-2"></i>
      Add truck
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddTruck',
  props: [
    'btn',
  ]
}
</script>


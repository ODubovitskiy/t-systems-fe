<template>
  <div class="sidebar m-2">
    <div class="py-2">
      <ButtonAdd
          :btn="{
            type_modal:'modal',
            target_modal:'#add-truck-modal'
          }"
      />
      <ButtonAdd
          :btn="{
            type_modal:'modal',
            target_modal:'#add-truck-modal'
          }"
      />
    </div>
  </div>
</template>

<script>
import ButtonAdd from '../trucks/ButtonAdd.vue'

export default {
  name: "Sidebar",
  components: {ButtonAdd},
  props: ['dataSideBar'],
  computed: {
    mainStore: {
      get() {
        return this.$store;
      }
    }
  },
  methods: {
    onSubmit() {
      //TODO Send axios post-request
    },
  },
  mounted() {

  },
  data() {
    return {}
  }
}
</script>

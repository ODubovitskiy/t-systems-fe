<template>
  <div>
    <div class="sidebar py-4">
      <div class="py-2">
        <addTruck :cities="cities" :on-submit="onSubmit" :statuses="statuses"/>
      </div>
    </div>
  </div>
</template>

<script>
import addTruck from "@/components/trucks/addTruck";

export default {
  name: "sidebar",
  components: {addTruck},
  methods: {
    onSubmit() {
      //TODO Send axios post-request
    },
  },
  data() {
    return {
      //TODO Make axios request in mounted method
      cities: [
        {id: 1, name: 'Saint-Petersburg'},
        {id: 2, name: 'Moscow'},
        {id: 3, name: 'Sochi'},
      ],
      //TODO Make axios request in mounted method
      statuses: [
        {id: 1, status: 'Working'},
        {id: 2, status: 'Broken'},
      ]
    }
  }
}
</script>


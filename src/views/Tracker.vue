<template>
<v-container dark>
  <TrackerComp />
</v-container>
</template>

<script>
  import TrackerComp from '../components/TrackerComp.vue'

  export default {
    name: 'Crypto Island Tracker',

    components: {
      TrackerComp
    },
  }
</script>

<template>
  <v-app id="ds_montecarlo">
    <AppContent />
  </v-app>
</template>

<script>
import AppContent from './components/app/Content.vue';

export default {
  name: 'App',

  components: {
    AppContent
  },

  data: () => ({
    //
  }),
};
</script>
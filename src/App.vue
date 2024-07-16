<template>
  <v-app id="ds_montecarlo">
    <AppBar></AppBar>
    <AppContent />
  </v-app>
</template>

<script>
import AppContent from "./components/app/Content.vue";
import AppBar from "./components/app/AppBar.vue";

export default {
  name: "App",

  components: {
    AppContent,
    AppBar,
  },

  data: () => ({
    //
  }),
};
</script>
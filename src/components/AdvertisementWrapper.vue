<template>
  <v-container style="text-align: center;" fluid>
    <img height="100" :src="require('../assets/ECG-Logo.svg')">
    <img width="450" :src="require('../assets/termoobchod_logo.png')">
    <img height="50" :src="require('../assets/namenu.jpg')">
  </v-container>
  </template>
  
  <script>
  
  export default {
    name: 'AdvertisementWrapper',
  
    components: {
    },
  
    data: () => ({
      //
    }),
  };
  </script>
  <style>
img {
    margin-inline: 16px;
}
</style>
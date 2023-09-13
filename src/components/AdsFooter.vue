<template>
    <v-container style="text-align: center;" fluid>
      <img :width="$vuetify.breakpoint.name == 'xs' ? '100%' : ''" :src="require('../assets/podlipu_vechec.png')">
    </v-container>
    </template>
    
    <script>
    
    export default {
      name: 'AdsFooter',
    
      components: {
      },
    
      data: () => ({
        //
      }),
    };
    </script>
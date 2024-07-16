<template>
  <div>
    <!-- <AdsHeader/> -->
    <WeatherNow />
    <!-- <AdsFooter/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherNow from "../components/WeatherNow.vue";

// import AdsHeader from '../components/AdvertisementWrapper.vue'
// import AdsFooter from '../components/AdsFooter.vue'

export default {
  name: "WeatherView",
  components: {
    WeatherNow,
    // AdsHeader,
    // AdsFooter
  },
};
</script>

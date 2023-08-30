<template>
  <div>
     <Ads/>
     <FutbalnetWrapper />
  </div>
</template>

<script>
// @ is an alias to /src
import FutbalnetWrapper from '../components/FutbalnetWrapper.vue'
import Ads from '../components/AdvertisementWrapper.vue'

export default {
  name: 'HomeView',
  components: {
    FutbalnetWrapper,
    Ads
  }
}
</script>

<template>
  <div>
     <AdsHeader/>
     <FutbalnetWrapper />
     <AdsFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import FutbalnetWrapper from '../components/FutbalnetWrapper.vue'
import AdsHeader from '../components/AdvertisementWrapper.vue'
import AdsFooter from '../components/AdsFooter.vue'

export default {
  name: 'HomeView',
  components: {
    FutbalnetWrapper,
    AdsHeader,
    AdsFooter
  }
}
</script>

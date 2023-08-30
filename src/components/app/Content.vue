<template>
    <v-main>
      <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    </v-main>
</template>

<script>
export default {
    name: 'ContentCustom',
    data() {
        return {
        }
    }
}
</script>

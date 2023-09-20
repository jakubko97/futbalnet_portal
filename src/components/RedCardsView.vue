<template>
  <v-data-table
    mobile-breakpoint="0"
    :headers="headers"
    :items="data"
    :items-per-page="10"
    class="elevation-0"
    :loading="data.length == 0"
    :loading-text="'Hľadám červené karty...'"
    @click:row="routeTo"
  >
    <template #[`item.player.name`]="{ item }">
      <div v-if="item.player">
        {{ item.player.name }}
      </div>
      <div v-if="item.player == null && item.crewMember">
        {{ item.crewMember.name }} (R.)
      </div>
    </template>
    <!-- <template #[`footer.prepend`]="{}"> *R - Realizačný tím </template> -->
  </v-data-table>
</template>
    
<script>
export default {
  name: "RedCardsView",
  props: {
    data: {
      type: Array,
      required: true,
    },
    league: {
      type: Object,
      required: true,
    },
  },
  watch: {},
  components: {},
  methods: {
    routeTo(match) {
      this.$router.push("/match/" + match.__issfId);
    },
  },
  mounted() {},
  created() {},
  data: () => ({
    headers: [
      { text: "Meno", value: "player.name" },
      { text: "Kolo", value: "round" },
      { text: "Klub", value: "teamName" },
      { text: "Dôvod", value: "reason" },
    ],
  }),
};
</script>
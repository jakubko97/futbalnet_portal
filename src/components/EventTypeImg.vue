<template>
  <div class="d-flex align-center">
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="
        event.eventType == 'failed_goal' && event.type == 'failed_goal_penalty'
      "
      :src="'https://upload.wikimedia.org/wikipedia/commons/1/1f/Missed_penalty_icon.svg'"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'goal' && event.type == 'dropped'"
      src="https://www.clker.com/cliparts/D/t/D/V/p/u/red-football-md.png"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'goal' && event.type != 'dropped'"
      src="https://w7.pngwing.com/pngs/627/926/png-transparent-football-soccer-ball-outline-soccer-ball-illustration-sport-monochrome-sports-equipment-thumbnail.png"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'red_card'"
      :src="require('../assets/red.png')"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'yellow_card'"
      :src="require('../assets/yellow-card.png')"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'second_yellow_card'"
      :src="require('../assets/second_yellow.png')"
    />
    <v-img
      v-bind="attrs"
      v-on="on"
      alt=""
      max-height="20"
      max-width="20"
      v-if="event.eventType == 'substitution'"
      :src="require('../assets/sub.png')"
    />
  </div>
</template>
    
<script>
export default {
  name: "EventTypeImg",
  props: {
    event: {
      type: Object,
      required: true,
    },
    attrs: {
      type: Object,
      default: null,
    },
    on: {
      type: Object,
      default: null,
    },
  },
  created() {},
  components: {},

  data: () => ({
    //
  }),
};
</script>
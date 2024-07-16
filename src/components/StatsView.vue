<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in teams" :key="i">
      <v-expansion-panel-header>
        <div>
           <v-list-item-avatar>
        <img
          max-height="20"
          max-width="20"
          alt="team"
          :src="item.organization.logo_public_url"
        />
        </v-list-item-avatar>
        {{ item.name }}
        </div>
       
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <!-- {{ item.squad }} -->
        <v-data-table
          mobile-breakpoint="0"
          :headers="headers"
          :items="players.filter((player) => player.teamId == item._id)"
          :items-per-page="15"
          class="elevation-0"
          :loading-text="'Načítavám štatistiky hráčov...'"
        >
          <template #[`item.minutesPerGoal`]="{ item }">
            <div v-if="item.stats.goals > 0">
              {{ (item.stats.minutes / item.stats.goals).toFixed(0) }}
            </div>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
    
<script>
export default {
  name: "StatsView",
  props: {
    league: {
      type: Object,
      required: true,
    },
  },
  watch: {
    league() {
      console.log(this.league);
      this.fetchData();
    },
  },
  components: {},
  methods: {
    fetchData() {
      this.$apiV1
        .get(this.league.stats + "/teams")
        .then((response) => {
          this.teams = response.data.teams;

          this.$apiV1
            .get(this.league.stats + "/players")
            .then((response) => {
              this.players = response.data.players;
            })
            .catch(() => {
              // this.errors.push(e);
            })
            .finally(() => {});
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {});
    },
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  data: () => ({
    teams: [],
    players: [],
    headers: [
      { text: "Meno hráča", value: "name" },
      { text: "Góly", value: "stats.goals" },
      { text: "Minúty na gól", value: "minutesPerGoal" },
      { text: "Minúty", value: "stats.minutes" },
      { text: "Žlté karty", value: "stats.yellow_cards" },
      { text: "Červené karty", value: "stats.red_cards" },
    ],
  }),
};
</script>
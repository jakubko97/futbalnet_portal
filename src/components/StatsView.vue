<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(team, i) in teams" :key="i">
      <v-expansion-panel-header>
        <div>
           <v-list-item-avatar>
        <img
          max-height="20"
          max-width="20"
          alt="team"
          :src="team.organization.logo_public_url"
        />
        </v-list-item-avatar>
        {{ team.name }}
        </div>
       
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-btn class="primary" @click="exportToCSV(team)">Export</v-btn>
        <v-data-table
          mobile-breakpoint="0"
          :headers="headers"
          :items="players.filter((player) => player.teamId == team._id)"
          :items-per-page="15"
          class="elevation-0"
          :loading-text="'Načítavám štatistiky hráčov...'"
        >
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
    exportToCSV(team) {
    const items = this.players.filter((player) => player.teamId == team._id)
    const csvContent = [];

    // Vyberieme hlavičky, aj pre vnorené polia
    const exportHeaders = [
    { text: "Meno hráča", value: "name" },
    { text: "Góly", value: "stats.goals" },
    { text: "Minúty na gól", value: "stats.minutesPerGoal" },
    { text: "Zápasy", value: "stats.match_appearances" },
    { text: "Zápasy v základe", value: "stats.match_starts" },
    { text: "Minúty", value: "stats.minutes" },
    { text: "Žlté karty", value: "stats.yellow_cards" },
    { text: "Červené karty", value: "stats.red_cards" },
    ];

  // Prvý riadok CSV: hlavičky
  csvContent.push(exportHeaders.map(h => `"${h.text}"`).join(','));

  // Dáta
  items.forEach(item => {
    const row = exportHeaders.map(h => {
      const keys = h.value.split('.');
      let val = item;

      for (let k of keys) {
        val = val?.[k];
        if (val === undefined || val === null) val = '';
      }

      return `"${val}"`;
    });
    csvContent.push(row.join(','));
  });

  // Stiahni súbor
  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', team.name + '_stats.csv');
  link.click();
    },
    fetchData() {
      this.$apiV1
        .get(this.league.stats + "/teams")
        .then((response) => {
          this.teams = response.data.teams;

          this.$apiV1
            .get(this.league.stats + "/players")
            .then((response) => {
              this.players = response.data.players;
              Array.from(this.players, p => {
                if(p.stats.goals != null && p.stats.goals > 0){
                  p.stats.minutesPerGoal = (p.stats.minutes / p.stats.goals).toFixed(0)
                }
              })
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
      { text: "Minúty na gól", value: "stats.minutesPerGoal" },
      { text: "Zápasy", value: "stats.match_appearances" },
      { text: "Zápasy v základe", value: "stats.match_starts" },
      { text: "Minúty", value: "stats.minutes" },
      { text: "Žlté karty", value: "stats.yellow_cards" },
      { text: "Červené karty", value: "stats.red_cards" },
    ],
  }),
};
</script>
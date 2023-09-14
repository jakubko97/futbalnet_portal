<template>
  <div>
    <v-container class="ma-0 pa-2" fluid>
      <!-- PRE DESKTOPOVU VERZIU, TABS LEAGUE NAMES -->
      <v-tabs hide-slider v-if="$vuetify.breakpoint.name != 'xs'" v-model="tab">
        <v-tab @click="fetchData(league)" v-for="league in leagues" :key="league.name">
          {{ league.name }}
        </v-tab>
      </v-tabs>
      <!-- PRE MOBILNU VERZIU, COMBOBOX LEAGUE LIST -->
      <v-row v-else>
        <v-col cols="12">
          <v-combobox hide-details v-model="selectedLeague" :items="leagues" label="League" item-text="name" outlined
            @change="selectChange" dense></v-combobox>
        </v-col>
      </v-row>
      <!-- TAGS PRE DETAILNY VYBER KONTENTU (Program, vysledky, tabulka...) -->
      <v-row>
        <v-col cols="12">
          <v-chip-group mandatory @change="tagChange" active-class="primary--text" column>
            <v-chip v-for="tag in tags" :key="tag.name">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-tabs-items v-if="!selectedTag.table && !selectedTag.redCards" @change="tabChange()" v-model="tab">
        <v-tab-item v-for="league in leagues" :key="league.name">
          <v-list v-if="matches != null" dense>
            <!-- <v-subheader>Vysledky</v-subheader> -->
            <v-list-item-group color="primary">
              <template v-for="(match, idx) in matches">
                <div :key="match._id">
                  <v-row>
                    <v-col>
                      {{ match.round.name }}. Kolo
                      {{ $utils.formatDate(match.startDate) }}
                      <!-- <template v-for="vid in videos">
                        <div v-for="v in vid.videos" :key="v._id">
                      <template v-if="v.competitionMatchId == match._id">
                        {{ v.category }}
                      </template>
                    </div>
                        <v-img
                          style="float: right"
                          alt=""
                          max-height="20"
                          max-width="20"
                          v-if="isVideoAvailable(vid.videos, match)"
                          :key="vid._id"
                          :src="require('../assets/video_thumbnail.png')"
                        />
                      </template> -->
                    </v-col>
                  </v-row>
                  <v-list-item @click="routeTo(match)" :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''" dense>
                    <v-list-item-content>
                      <v-col class="d-md-flex justify-end flex-xs-1-0" style="text-align: center;" sm="5" cols="5">
                        <v-list-item-avatar v-if="['xs', 'sm'].filter(i => i == $vuetify.breakpoint.name).length > 0">
                          <img max-height="40" max-width="40" @error="imgError" alt="domaci"
                            :src="match.teams[0].organization.logo_public_url" />
                        </v-list-item-avatar>
                        <div :style="match.score[0] > match.score[1]
                          ? 'font-weight: bold; align-self: center'
                          : 'align-self: center'
                          ">
                          <div :class="isMatchLive(match) ? 'red--text' : ''">
                            {{ match.teams[0].name }}
                          </div>
                        </div>
                        <v-list-item-avatar v-if="['xs', 'sm'].filter(i => i == $vuetify.breakpoint.name).length == 0">
                          <img max-height="40" max-width="40" @error="imgError" alt="domaci"
                            :src="match.teams[0].organization.logo_public_url" />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col sm="2" cols="2">
                        <v-row class="d-flex justify-center" :class="isMatchLive(match) ? 'red--text' : ''">
                            {{ match.score[0] }} - {{ match.score[1] }}
                        </v-row>
                        <v-row class="d-flex justify-center" style="font-weight: bold" v-if="match.penaltiesScore">
                          pk
                          {{
                            match.penaltiesScore[0] +
                            ":" +
                            match.penaltiesScore[1]
                          }}
                        </v-row>
                        <!-- <v-icon dark right> mdi-checkbox-marked-circle </v-icon> -->
                      </v-col>
                      <v-col class="d-md-flex justify-start flex-xs-3" style="text-align: center;" sm="5" cols="5">
                        <v-list-item-avatar>
                          <img max-height="40" max-width="40" @error="imgError" alt="hostia"
                            :src="match.teams[1].organization.logo_public_url" />
                        </v-list-item-avatar>
                        <div :class="isMatchLive(match) ? 'red--text' : ''" :style="match.score[0] < match.score[1]
                          ? 'font-weight: bold; align-self: center'
                          : 'align-self: center'
                          ">
                          {{ match.teams[1].name }}
                        </div>
                      </v-col>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
      <TableView v-if="selectedTag.table" :table-data="matches" :league="selectedLeague" />
      <RedCardsView v-if="selectedTag.redCards" :league="selectedLeague" :data="redCards" />
    </v-container>
  </div>
</template>
<script>
import TableView from "./TableView.vue";
import RedCardsView from "./RedCardsView.vue";

export default {
  name: "FutbalnetWrapper",
  components: { TableView, RedCardsView },
  data() {
    return {
      tab: 0,
      selectedTag: null,
      results: null,
      selectedMatch: null,
      videos: [],
      selectedLeague: null,
      redCards: [],
      matches: [],
      tags: [
        { name: 'Program', closed: false, limit: 12 },
        { name: 'Vysledky', closed: true, limit: 32 },
        { name: 'Tabuľka', closed: true, table: true, limit: null },
        { name: 'Č. Karty', closed: true, redCards: true, limit: null }
      ],
      leagues: [{
        name: 'VI. Vihorlatsko-dukelská', api: 'public/VsFZ/competitions/6493204b7f8d0dc994674280/parts/6493204b76d0d348cd09994b/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'V. Liga Sever', api: 'public/VsFZ/competitions/6493200c7f8d0dc99466fb7a/parts/6493200c76d0d348cd099948/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'IV. Liga', api: 'public/VsFZ/competitions/647ba0837b634444d1c5174e/parts/6486d42f76d0d348cd097868/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'III. Východ', api: 'public/futbalsfz.sk/competitions/6477ac257b634444d118634a/parts/647a3f3b76d0d348cd095fa9/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'II.', api: 'public/futbalsfz.sk/competitions/647904787b634444d148590a/parts/6479047876d0d348cd095d6b/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'Niké Liga', api: 'public/ulk.futbalnet.sk/competitions/64997173eebe726b04698003/parts/649abbbb76d0d348cd09aa12/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'VII. VT', api: 'public/obfz-vranov-nad-toplou.futbalnet.sk/competitions/648189467b634444d1a6df81/parts/6490289976d0d348cd0990ec/matches', promotion: [1], relegation: [1, 2]
      },
      {
        name: 'Slovnaft Cup', api: 'public/futbalsfz.sk/competitions/64784fa27b634444d1943186/parts/64784fa276d0d348cd095bda/matches', promotion: [1], relegation: [1, 2]
      }]
    };
  },
  created() {
    this.selectedTag = this.tags[0];
    this.selectedLeague = this.leagues[0];
    this.fetchData(this.leagues[0]);
  },
  computed: {},
  methods: {
    tagChange(index) {
      this.selectedTag = this.tags[index];
      if (this.$vuetify.breakpoint.name == "xs") {
        this.fetchData(this.selectedLeague);
      } else {
        this.fetchData(this.leagues[this.tab]);
      }
    },
    tabChange() {
      this.fetchData(this.leagues[this.tab]);
    },
    isVideoAvailable(videos, match) {
      return (
        videos.filter((v) => v.competitionMatchId === match._id).length > 0
      );
    },
    selectChange(league) {
      this.fetchData(league);
    },
    getAverageAge(athletes) {
      let sum = 0;
      let count = 0;
      Array.from(athletes, (a) => {
        sum += a.additionalData.age;
        count++;
      });
      return (sum / count).toFixed(2);
    },
    isMatchLive(match) {
      return !match.closed && match.scoreByPhases.length > 0;
    },
    routeTo(match) {
      this.$router.push("/match/" + match.__issfId);
    },
    imgError(event) {
      event.target.src = require("../assets/default_club_logo.png");
    },
    retrieveRedCards() {
      this.redCards = []
      let matchDetails = []
      if (this.selectedTag.closed) {
        Array.from(this.matches, m => {
          let matchDetail = null
          this.$apiV1
            .get("matches/" + m.__issfId)
            .then((response) => {
              matchDetail = response.data
              matchDetails.push(matchDetail)
            })
            .catch(() => {
            })
            .finally(() => {
              Array.from(matchDetail.protocol.events, e => {
                if (e.eventType === 'red_card') {
                  Array.from(matchDetail.teams, t => {
                    if (t._id === e.team) {
                      e.teamName = t.name //assign actual name by teamId
                    }
                  })
                  this.redCards.push(e)
                }
              })
            });
        })
      }
    },
    fetchVideo() {
      Array.from(this.matches, (c) => {
        this.$apiV2
          .get(
            "public/futbalsfz.sk/videos?matchId=" +
            c.__issfId +
            "&competitionMatchId=" +
            c._id +
            "&expand_match=1"
          )
          .then((response) => {
            this.videos.push(response.data);
          })
          .catch(() => {
            // this.errors.push(e);
          })
          .finally(() => { });
      });
    },
    //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
    fetchData(league) {
      this.videos = [];
      this.matches = [];
      const params = {
        limit: this.selectedTag.limit,
        offset: 0,
        withDate: true,
        withTeams: true,
        closed: this.selectedTag.closed,
      };
      this.$apiV1
        .get(league.api, { params: params })
        .then((response) => {
          this.matches = response.data.matches;
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {
          //this.fetchVideo()
          if(this.selectedTag.redCards){
            this.retrieveRedCards()
          }
        });
    },
  },
};
</script>

<style></style>

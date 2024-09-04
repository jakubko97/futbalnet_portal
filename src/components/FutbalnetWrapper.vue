<template>
  <div>
    <v-container class="ma-0 pa-2" fluid>
      <!-- PRE DESKTOPOVU VERZIU, TABS LEAGUE NAMES -->
      <v-tabs hide-slider v-if="$vuetify.breakpoint.name != 'xs'" v-model="tab">
        <v-tab
          @click="leagueChange(league)"
          v-for="league in leagues"
          :key="league.name"
        >
          {{ league.name }}
        </v-tab>
      </v-tabs>
      <!-- PRE MOBILNU VERZIU, COMBOBOX LEAGUE LIST -->
      <v-row v-else>
        <v-col cols="12">
          <v-combobox
            hide-details
            v-model="selectedLeague"
            :items="leagues"
            label="League"
            item-text="name"
            outlined
            @change="selectChange"
            dense
          ></v-combobox>
        </v-col>
      </v-row>
      <!-- TAGS PRE DETAILNY VYBER KONTENTU (Program, vysledky, tabulka...) -->
      <v-row>
        <v-col cols="12">
          <v-chip-group
            mandatory
            @change="tagChange"
            active-class="primary--text"
            column
          >
            <v-chip v-for="tag in tags" :key="tag.name">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-tabs-items
        v-if="!selectedTag.table && !selectedTag.redCards && !selectedTag.stats"
        @change="tabChange()"
        v-model="tab"
      >
        <v-tab-item v-for="league in leagues" :key="league.name">
          <v-list v-if="matches != null" dense>
            <!-- <v-subheader>Vysledky</v-subheader> -->
            <v-list-item-group color="primary">
              <template v-for="(match, idx) in matches">
                <div :key="idx">
                  <v-row>
                    <v-col>
                      <!-- {{ match.round.name }}. Kolo -->
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
                  <v-list-item
                    @click="routeTo(match)"
                    :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''"
                    dense
                  >
                    <v-list-item-content>
                      <v-col
                        class="d-md-flex justify-end flex-xs-1-0"
                        style="text-align: center"
                        sm="5"
                        cols="5"
                      >
                        <v-list-item-avatar
                          v-if="
                            ['xs', 'sm'].filter(
                              (i) => i == $vuetify.breakpoint.name
                            ).length > 0
                          "
                        >
                          <img
                            max-height="40"
                            max-width="40"
                            @error="imgError"
                            alt="domaci"
                            :src="match.teams[0].organization.logo_public_url"
                          />
                        </v-list-item-avatar>
                        <div
                          :style="
                            match.score[0] > match.score[1]
                              ? 'font-weight: bold; align-self: center'
                              : 'align-self: center'
                          "
                        >
                          <div :class="isMatchLive(match) ? 'red--text' : ''">
                            {{ match.teams[0].name }}
                          </div>
                        </div>
                        <v-list-item-avatar
                          v-if="
                            ['xs', 'sm'].filter(
                              (i) => i == $vuetify.breakpoint.name
                            ).length == 0
                          "
                        >
                          <img
                            max-height="40"
                            max-width="40"
                            @error="imgError"
                            alt="domaci"
                            :src="match.teams[0].organization.logo_public_url"
                          />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col sm="2" cols="2">
                        <v-row
                          class="d-flex justify-center"
                          :class="isMatchLive(match) ? 'red--text' : ''"
                        >
                          {{ match.score[0] }} - {{ match.score[1] }}
                        </v-row>
                        <v-row
                          class="d-flex justify-center"
                          style="font-weight: bold"
                          v-if="match.penaltiesScore"
                        >
                          pk
                          {{
                            match.penaltiesScore[0] +
                            ":" +
                            match.penaltiesScore[1]
                          }}
                        </v-row>
                        <!-- <v-icon dark right> mdi-checkbox-marked-circle </v-icon> -->
                      </v-col>
                      <v-col
                        class="d-md-flex justify-start flex-xs-3"
                        style="text-align: center"
                        sm="5"
                        cols="5"
                      >
                        <v-list-item-avatar>
                          <img
                            max-height="40"
                            max-width="40"
                            @error="imgError"
                            alt="hostia"
                            :src="match.teams[1].organization.logo_public_url"
                          />
                        </v-list-item-avatar>
                        <div
                          :class="isMatchLive(match) ? 'red--text' : ''"
                          :style="
                            match.score[0] < match.score[1]
                              ? 'font-weight: bold; align-self: center'
                              : 'align-self: center'
                          "
                        >
                          {{ match.teams[1].name }}
                        </div>
                      </v-col>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
              <v-list-item
                v-if="result.nextOffset"
                @click="loadOtherMatches()"
                dense
              >
                <v-list-item-content class="d-flex justify-center">
                  <v-progress-circular
                    v-if="result.loading"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <div class="d-flex justify-center" v-else>
                    Načítať ďalšie zápasy <v-icon>mdi-chevron-down</v-icon>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
      <TableView
        v-if="selectedTag.table"
        :table-data="matches"
        :league="selectedLeague"
      />
      <RedCardsView
        v-if="selectedTag.redCards"
        :league="selectedLeague"
        :data="redCards"
      />
       <StatsView
        v-if="selectedTag.stats"
        :league="selectedLeague"
      />
    </v-container>
  </div>
</template>
<script>
import TableView from "./TableView.vue";
import RedCardsView from "./RedCardsView.vue";
import StatsView from "./StatsView.vue";

// import { useRouter } from 'vue-router'

export default {
  name: "FutbalnetWrapper",
  components: { TableView, RedCardsView, StatsView },
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
      result: { nextOffset: null, offset: null, total: null, loading: false },
      tags: [
        { name: "Program", closed: false, limit: 12, offset: 0 },
        { name: "Vysledky", closed: true, limit: 12, offset: 0 },
        { name: "Tabuľka", closed: true, table: true, limit: null },
        { name: "Stats", closed: true, table: false, limit: null, stats: true },
        { name: "Č. Karty", closed: true, redCards: true, limit: null },
      ],
      leagues: [
        {
          name: "VI. LIGA VIHORLATSKO-DUKELSKÁ",
          api: "public/VsFZ/competitions/4823/parts/6671c51b4cef74570e1fdba5",
          stats: "public/competitions/4823/parts/6671c51b4cef74570e1fdba5",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "VI. LIGA KOŠICKO-GEMERSKÁ",
          api: "public/VsFZ/competitions/4821/parts/6654f284f01cfa29cb795a98",
          stats: "public/competitions/4821/parts/6654f284f01cfa29cb795a98",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "VI. LIGA PODTATRANSKÁ",
          api: "public/VsFZ/competitions/4824/parts/6654f449f01cfa29cb795ac3",
          stats: "public/competitions/4824/parts/6654f449f01cfa29cb795ac3",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "VI. LIGA ZEMPLÍNSKA",
          api: "public/VsFZ/competitions/4822/parts/6671c52c4cef74570e1fdba6",
          stats: "public/competitions/4822/parts/6671c52c4cef74570e1fdba6",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "VI. LIGA ŠARIŠSKÁ",
          api: "public/VsFZ/competitions/4825/parts/6671c4da4cef74570e1fdb9d",
          stats: "public/competitions/4825/parts/6671c4da4cef74570e1fdb9d",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "V. Liga Sever",
          api: "public/VsFZ/competitions/4819/parts/6654f0bdf01cfa29cb795a5e",
          stats: "public/competitions/4819/parts/6654f0bdf01cfa29cb795a5e",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "V. Liga Juh",
          api: "public/VsFZ/competitions/4820/parts/6654f1baf01cfa29cb795a7b",
          stats: "public/competitions/4820/parts/6654f1baf01cfa29cb795a7b",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "IV. Liga",
          api: "public/VsFZ/competitions/4818/parts/6654efd2f01cfa29cb795a41",
          stats: "public/competitions/4818/parts/6654efd2f01cfa29cb795a41",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "III. Východ",
          api: "public/futbalsfz.sk/competitions/4878/parts/6659e03ac1e318dcfc5ab1b9",
          stats: "public/competitions/4878/parts/6659e03ac1e318dcfc5ab1b9",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "II. Monacobet",
          api: "public/futbalsfz.sk/competitions/4871/parts/66573f1bf01cfa29cb79a2c5",
          stats: "public/competitions/4871/parts/66573f1bf01cfa29cb79a2c5",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "Niké Liga",
          api: "public/ulk.futbalnet.sk/competitions/4809/parts/6673d92d7f52c9f46678a672",
          stats: "public/competitions/4809/parts/6673d92d7f52c9f46678a672",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "VII. VT",
          api: "public/obfz-vranov-nad-toplou.futbalnet.sk/competitions/5116/parts/667137074cef74570e1fd30d",
          stats: "public/competitions/5116/parts/667137074cef74570e1fd30d",
          promotion: [1],
          relegation: [1, 2],
        },
        {
          name: "Slovnaft Cup",
          api: "public/futbalsfz.sk/competitions/4875/parts/66584582ded2cae3ff6b013c",
          stats: "public/competitions/4875/parts/66584582ded2cae3ff6b013c",
          promotion: [1],
          relegation: [1, 2],
        },
      ],
    };
  },
  created() {
    this.selectedTag = this.tags[0];
    this.selectedLeague = this.leagues[0];
    this.fetchData(this.leagues[0]);
  },
  computed: {},
  methods: {
    loadOtherMatches() {
      this.result.loading = true;
      if (this.result.nextOffset != null) {
        let league = null;
        if (this.$vuetify.breakpoint.name == "xs") {
          league = this.selectedLeague;
        } else {
          league = this.leagues[this.tab];
        }
        this.videos = [];
        const params = {
          limit: this.selectedTag.limit,
          offset: this.result.nextOffset,
          withDate: true,
          withTeams: true,
          closed: this.selectedTag.closed,
        };
        this.$apiV1
          .get(league.api + '/matches', { params: params })
          .then((response) => {
            this.result.nextOffset = response.data.nextOffset;
            this.result.offset = response.data.offset;
            this.result.total = response.data.total;
            this.matches = this.matches.concat(response.data.matches);
          })
          .catch(() => {
            // this.errors.push(e);
          })
          .finally(() => {
            this.result.loading = false;
          });
      }
    },
    tagChange(index) {
      this.selectedTag = this.tags[index];
      if (this.$vuetify.breakpoint.name == "xs") {
        this.fetchData(this.selectedLeague);
      } else {
        this.fetchData(this.leagues[this.tab]);
      }
    },
    leagueChange(league){
      this.fetchData(league);
      this.selectedLeague = league
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
      // const router = useRouter();
      // const routeData = router.resolve({path: "/match/" + match.__issfId});
      // window.open(routeData.href, '_blank');
      this.$router.push("/match/" + match.__issfId);
    },
    imgError(event) {
      event.target.src = "https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png";
    },
    retrieveRedCards() {
      this.redCards = [];
      let matchDetails = [];
      if (this.selectedTag.closed) {
        Array.from(this.matches, (m) => {
          let matchDetail = null;
          this.$apiV1
            .get("matches/" + m.__issfId)
            .then((response) => {
              matchDetail = response.data;
              matchDetails.push(matchDetail);
            })
            .catch(() => {})
            .finally(() => {
              Array.from(matchDetail.protocol.events, (e) => {
                if (e.eventType === "red_card") {
                  Array.from(matchDetail.teams, (t) => {
                    if (t._id === e.team) {
                      e.teamName = t.name; //assign actual name by teamId
                      e.round = matchDetail.round.name;
                      e.__issfId = matchDetail.__issfId;
                    }
                  });
                  this.redCards.push(e);
                }
              });
            });
        });
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
          .finally(() => {});
      });
    },
    //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
    fetchData(league) {
      this.result.loading = true;
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
        .get(league.api + '/matches', { params: params })
        .then((response) => {
          this.result.nextOffset = response.data.nextOffset;
          this.result.offset = response.data.offset;
          this.result.total = response.data.total;
          this.matches = response.data.matches;
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {
          //this.fetchVideo()
          this.result.loading = false;
          if (this.selectedTag.redCards) {
            this.retrieveRedCards();
          }
        });
    },
  },
};
</script>

<style></style>

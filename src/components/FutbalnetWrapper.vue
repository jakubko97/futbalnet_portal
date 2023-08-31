<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab @click="fetchData(league)" v-for="league in leagues" :key="league.name">
        {{ league.name }}
      </v-tab>
    </v-tabs>
    <v-chip-group mandatory @change="tagChange" active-class="primary--text" column>
      <v-chip v-for="tag in tags" :key="tag.name">
        {{ tag.name }}
      </v-chip>
    </v-chip-group>
    <v-container class="ma-0 pa-2" fluid>
      <v-tabs-items @change="tabChange()" v-model="tab">
        <v-tab-item v-for="league in leagues" :key="league.name">
          <v-list v-if="matches != null" dense>
            <!-- <v-subheader>Vysledky</v-subheader> -->
            <v-list-item-group color="primary">
              <template v-for="(match, idx) in matches">
                <div :key="match._id">
                  <v-row>
                    <v-col>
                      {{ match.competition.name }} {{ match.round.name }}. Kolo
                      <template v-for="vid in videos">
                        <!-- <div v-for="v in vid.videos" :key="v._id">
                      <template v-if="v.competitionMatchId == match._id">
                        {{ v.category }}
                      </template>
                    </div> -->
                        <v-img style="float: right;" alt="" max-height="20" max-width="20"
                          v-if="isVideoAvailable(vid.videos, match)" :key="vid._id"
                          :src="require('../assets/video_thumbnail.png')" />
                      </template>

                    </v-col>
                  </v-row>
                  <v-list-item @click="routeTo(match)" :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''" dense>
                    <v-list-item-content>
                      <v-col class="d-md-flex justify-end flex-xs-1-0" style="justify-content: right: ;" lg="5" xs="3">
                        <div
                          :style="match.score[0] > match.score[1] ? 'font-weight: bold; align-self: center' : 'align-self: center'">
                          {{ match.teams[0].name }}</div>
                        <v-list-item-avatar>
                          <img max-height="40" max-width="40" @error="imgError" alt="domaci"
                            :src="match.teams[0].organization.logo_public_url">
                        </v-list-item-avatar>
                      </v-col>
                      <v-col class="d-flex justify-center" lg="1" xs="2">
                        {{ match.score[0] }} - {{ match.score[1] }}
                        <div style="font-weight: bold;" v-if="match.penaltiesScore">
                          pk {{ match.penaltiesScore[0] + ':' + match.penaltiesScore[1] }}
                        </div>
                      </v-col>
                      <v-col class="d-md-flex justify-start flex-xs-3" lg="5" xs="3">
                        <v-list-item-avatar>
                          <img max-height="40" max-width="40" @error="imgError" alt="hostia"
                            :src="match.teams[1].organization.logo_public_url">
                        </v-list-item-avatar>
                        <div
                          :style="match.score[0] < match.score[1] ? 'font-weight: bold; align-self: center' : 'align-self: center'">
                          {{ match.teams[1].name }}</div>
                      </v-col>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
    <!-- <DetailDialog ref="detailMatchDialog" v-if="selectedMatch != null" :match-id="selectedMatch.__issfId" /> -->
  </div>
</template>
<script>

export default {
  name: "FutbalnetWrapper",
  components: {
  },
  data() {
    return {
      tab: 0,
      selectedTag: null,
      results: null,
      selectedMatch: null,
      videos: [],
      matches: [],
      tags: [{ name: 'Program', closed: false }, { name: 'Vysledky', closed: true }],
      leagues: [{
        name: 'VI. Vihorlatsko-dukelská', api: 'public/VsFZ/competitions/6493204b7f8d0dc994674280/parts/6493204b76d0d348cd09994b/matches'
      },
      {
        name: 'V. Liga Sever', api: 'public/VsFZ/competitions/6493200c7f8d0dc99466fb7a/parts/6493200c76d0d348cd099948/matches'
      },
      {
        name: 'IV. Liga', api: 'public/VsFZ/competitions/647ba0837b634444d1c5174e/parts/6486d42f76d0d348cd097868/matches'
      },
      {
        name: 'III. Východ', api: 'public/futbalsfz.sk/competitions/6477ac257b634444d118634a/parts/647a3f3b76d0d348cd095fa9/matches'
      },
      {
        name: 'Niké Liga', api: 'public/ulk.futbalnet.sk/competitions/64997173eebe726b04698003/parts/649abbbb76d0d348cd09aa12/matches'
      },
      {
        name: 'VII. VT', api: 'public/obfz-vranov-nad-toplou.futbalnet.sk/competitions/648189467b634444d1a6df81/parts/6490289976d0d348cd0990ec/matches'
      },
      {
        name: 'Slovnaft Cup', api: 'public/futbalsfz.sk/competitions/64784fa27b634444d1943186/parts/64784fa276d0d348cd095bda/matches'
      }]
    };
  },
  created() {
    this.selectedTag = this.tags[0]
    this.fetchData(this.leagues[0]);
  },
  computed: {
  },
  methods: {
    tagChange(index) {
      this.selectedTag = this.tags[index]
      this.fetchData(this.leagues[this.tab])
    },
    tabChange() {
      this.fetchData(this.leagues[this.tab])
    },
    isVideoAvailable(videos, match) {
      return videos.filter(v => v.competitionMatchId === match._id).length > 0
    },
    getAverageAge(athletes) {
      let sum = 0
      let count = 0
      Array.from(athletes, a => {
        sum += a.additionalData.age
        count++
      })
      return (sum / count).toFixed(2)
    },
    routeTo(match) {
      this.$router.push('/match/' + match.__issfId);
    },
    imgError(event) {
      event.target.src = require('../assets/default_club_logo.png')
    },
    fetchVideo() {
      Array.from(this.matches, c => {
        this.$apiV2
          .get("public/futbalsfz.sk/videos?matchId=" + c.__issfId + "&competitionMatchId=" + c._id + "&expand_match=1")
          .then((response) => {
            this.videos.push(response.data)
          })
          .catch(() => {
            // this.errors.push(e);
          })
          .finally(() => {
          });
      })


    },
    //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
    fetchData(league) {
      this.videos = []
      this.matches = []
      console.log(this.selectedTag)
      const params = {
        limit: 12,
        offset: 0,
        withDate: true,
        withTeams: true,
        closed: this.selectedTag.closed
      }
      console.log(params)
      this.$apiV1
        .get(league.api, { params: params })
        .then((response) => {
          this.matches = response.data.matches
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {
          //this.fetchVideo()
        });
    },
  }
}
</script>

<style></style>

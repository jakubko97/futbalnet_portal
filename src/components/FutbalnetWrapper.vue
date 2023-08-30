<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab @click="fetchData(league)" v-for="league in leagues" :key="league.name">
        {{ league.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="league in leagues" :key="league.name">
        <v-list v-if="matches != null" dense>
          <v-subheader>Vysledky</v-subheader>
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
                      <v-img alt="" max-height="20" max-width="20" v-if="isVideoAvailable(vid.videos, match)"
                        :key="vid._id" :src="require('../assets/video_thumbnail.png')" />
                    </template>

                  </v-col>
                </v-row>
                <v-list-item @click="routeTo(match)" :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''" dense>
                  <v-list-item-content>
                    <v-col style="text-align: right;" lg="5" xs="3">
                      {{ match.teams[0].name }}
                      <v-list-item-avatar>
                        <v-img max-height="40" max-width="40" :src="match.teams[0].organization.logo_public_url"></v-img>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col style="text-align: center;" lg="1" xs="2">
                      {{ match.score[0] }} - {{ match.score[1] }}

                    </v-col>
                    <v-col style="text-align: left;" lg="5" xs="3">
                      <v-list-item-avatar>
                        <v-img max-height="40" max-width="40" :src="match.teams[1].organization.logo_public_url"></v-img>
                      </v-list-item-avatar>
                      {{ match.teams[1].name }}
                    </v-col>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </template>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
    </v-tabs-items>

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
      results: null,
      selectedMatch: null,
      videos: [],
      matches: [],
      leagues: [{
        name: 'VI. Vihorlatsko-dukelská', api: 'public/VsFZ/competitions/6493204b7f8d0dc994674280/parts/6493204b76d0d348cd09994b/matches?limit=12&offset=0&withDate=true&withTeams=true&closed=true'
      },
      {
        name: 'V. Liga Sever', api: 'public/VsFZ/competitions/6493200c7f8d0dc99466fb7a/parts/6493200c76d0d348cd099948/matches?limit=16&offset=0&withDate=true&withTeams=true&closed=true'
      },
      {
        name: 'IV. Liga', api: 'public/VsFZ/competitions/647ba0837b634444d1c5174e/parts/6486d42f76d0d348cd097868/matches?limit=16&offset=0&withDate=true&withTeams=true&closed=true'
      },
      {
        name: 'III. Východ', api: 'public/futbalsfz.sk/competitions/6477ac257b634444d118634a/parts/647a3f3b76d0d348cd095fa9/matches?limit=16&offset=0&withDate=true&withTeams=true&closed=true'
      },
      {
        name: 'Slovnaft Cup', api: 'public/futbalsfz.sk/competitions/64784fa27b634444d1943186/parts/64784fa276d0d348cd095bda/matches?limit=16&offset=0&withDate=true&closed=true'
      }]
    };
  },
  created() {
    this.fetchData(this.leagues[0]);
  },
  computed: {
  },
  methods: {
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
      this.$apiV1
        .get(league.api)
        .then((response) => {
          this.matches = response.data.matches
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {
          this.fetchVideo()
        });
    },
  }
}
</script>

<style></style>

<template>
  <div>
    <v-list v-if="results != null" dense>
      <v-subheader>Vysledky</v-subheader>
      <v-list-item-group color="primary">
        <template v-for="(match, idx) in results.matches">
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
                    <v-img alt="" max-height="20" max-width="20" v-if="isVideoAvailable(vid.videos, match)" :key="vid._id"
                      :src="require('../assets/video_thumbnail.png')" />
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
      results: null,
      selectedMatch: null,
      videos: []
    };
  },
  created() {
    this.fetchData();

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
      Array.from(this.results.matches, c => {
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
    fetchData() {
      this.$apiV1
        .get("public/VsFZ/competitions/6493204b7f8d0dc994674280/parts/6493204b76d0d348cd09994b/matches?limit=12&offset=0&withDate=true&withTeams=true&closed=true")
        .then((response) => {
          this.results = response.data
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

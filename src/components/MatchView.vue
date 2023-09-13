<template>
    <v-container class="ma-0 pa-0 mt-6" v-if="matchData" fluid>
        <MatchHeader class="ma-2 pa-2" :match-data="matchData" />
        <v-tabs v-model="tab" centered>
            <v-tab>Prehľad</v-tab>
            <v-tab>Zostavy</v-tab>
            <v-tab>Videozaznam</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <MatchOverview :events="matchData.protocol.events" :penalties-score="matchData.penaltiesScore"
                    :teams-id="[matchData.teams[0]._id, matchData.teams[1]._id]" :score-phases="matchData.scoreByPhases" />
            </v-tab-item>
            <v-tab-item>
                <LineUps :match-data="matchData" />
            </v-tab-item>
            <v-tab-item>
                <VideoZaznamView :match="matchData" />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
    
<script>
import LineUps from "./LineUps.vue";
import MatchHeader from "./MatchHeader.vue";
import MatchOverview from "./MatchOverview.vue";
import VideoZaznamView from "./VideoZaznamView.vue";

export default {
    name: 'MatchView',
    components: {
        MatchOverview,
        MatchHeader,
        LineUps,
        VideoZaznamView
    },
    created() {
        this.fetchData()
    },
    data: () => ({
        tab: 0,
        matchData: null
    }),
    methods: {
        formatEventType() {
            Array.from(this.matchData.protocol.events, e => {
                if (e.eventTime) {
                    e.eventTime = e.eventTime.substring(0, 2) + "'"
                }
                if (e.type == 'goal_game') {
                    e.type_sk = 'Gól z hry'
                } else if (e.type == 'goal_penalty') {
                    e.type_sk = 'Penalta'
                }
                else if (e.type == 'failed_goal_penalty') {
                    e.type_sk = 'Nepremenená penalta'
                } else if (e.type == 'dropped') {
                    e.type_sk = 'Vlastný gól'
                } else if (e.type == 'goal_standard') {
                    e.type_sk = 'Štandartka'
                }
            })
        },
        imgError(event) {
            event.target.src = require('../assets/default_club_logo.png')
        },
        fetchData() {
            this.$apiV1
                .get("matches/" + this.$route.params.id)
                .then((response) => {
                    this.matchData = response.data
                })
                .catch(() => {
                    // this.errors.push(e);
                })
                .finally(() => {
                    this.formatEventType()
                });
        },
    }
};
</script>
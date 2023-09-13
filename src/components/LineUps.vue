<template>
    <v-container v-if="matchData" fluid class="ma-0 pa-0">
        <!-- TABS PRE MOBILNU VERZIU -->
        <v-tabs centered hide-slider v-if="$vuetify.breakpoint.name == 'xs'" v-model="tab">
            <v-tab v-for="(i, idx) in matchData.teams" :key="i._id">
                <v-img class="mr-2" max-height="22" max-width="22" :src="i.organization.logo_public_url" />
                <!-- {{ i.name }} -->
                <div v-if="idx == 0">Domáci</div>
                <div v-else>Hostia</div>
            </v-tab>
        </v-tabs>
        <!-- TAB ITEM PRE MOBILNU VERZIU -->
        <v-tabs-items v-if="$vuetify.breakpoint.name == 'xs' && matchData.nominations.length > 0" v-model="tab">
            <template v-for="(nom) in matchData.nominations">
                <v-tab-item :key="nom.teamId">
                    <AthleteItem :events="matchData.protocol.events"
                        :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                    <v-subheader>Nahradnici</v-subheader>
                    <AthleteItem :events="matchData.protocol.events"
                        :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                    <v-subheader> Realizačný tím</v-subheader>
                    <AthleteItem crew :events="matchData.protocol.events" :athletes="nom.crew" />
                </v-tab-item>
            </template>
        </v-tabs-items>
        <div class="d-flex justify-center" v-if="$vuetify.breakpoint.name == 'xs' && matchData.nominations.length == 0">
            Nominácia zatiaľ nebola uzatvorená
        </div>

        <!-- PRE DESKTOPOVU VERZIU, TEAMS NAME -->
        <v-row v-if="$vuetify.breakpoint.name != 'xs'">
            <v-col v-for="team in matchData.teams" :key="team._id">
                <v-list-item>
                    <v-list-item-avatar>
                        <img max-height="40" max-width="40" :src="team.organization.logo_public_url" @error="imgError">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        {{ team.name }}
                    </v-list-item-content>

                </v-list-item>
                <v-subheader>{{ team.additionalProperties.homeaway }}</v-subheader>
            </v-col>
        </v-row>
        <!-- PRE DESKTOPOVU VERZIU, TEAMS CONTENT, ZOSTAVY -->
        <v-row v-if="$vuetify.breakpoint.name != 'xs'">
            <template v-if="matchData.nominations.length > 0">
                <v-col v-for="(nom) in matchData.nominations" :key="nom.teamId">
                    <AthleteItem :events="matchData.protocol.events"
                        :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                    <v-subheader>Nahradnici</v-subheader>
                    <AthleteItem :events="matchData.protocol.events"
                        :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                    <v-subheader> Realizačný tím</v-subheader>
                    <AthleteItem crew :events="matchData.protocol.events" :athletes="nom.crew" />
                </v-col>
            </template>
            <template v-if="matchData.nominations.length == 0">
                <v-col class="d-flex justify-start">
                    Nominácia zatiaľ nebola uzatvorená
                </v-col>
                <v-col class="d-flex justify-start">
                    Nominácia zatiaľ nebola uzatvorená
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import AthleteItem from './AthleteItem.vue';

export default {
    name: "LineUps",
    components: {
        AthleteItem
    },
    props: {
        matchData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dialog: false,
            loading: false,
            tab: 0
        };
    },
    created() {
    },
    computed: {
    },
    methods: {
        imgError(event) {
            event.target.src = require('../assets/default_club_logo.png')
        },
        //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
    }
}
</script>

<style></style>

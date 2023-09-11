<template>
    <v-container v-if="matchData" fluid>
        <!-- TABS PRE MOBILNU VERZIU -->
        <v-tabs hide-slider v-if="$vuetify.breakpoint.name == 'xs'" v-model="tab">
            <v-tab v-for="i in matchData.teams" :key="i._id">
                <v-img class="mr-2" max-height="28" max-width="28" :src="i.organization.logo_public_url" />
                {{ i.name }}
            </v-tab>
        </v-tabs>
        <!-- TAB ITEM PRE MOBILNU VERZIU -->
        <v-tabs-items v-if="$vuetify.breakpoint.name == 'xs'" v-model="tab">
            <v-tab-item v-for="(nom) in matchData.nominations" :key="nom.teamId">
                <AthleteItem :events="matchData.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                <v-subheader>Nahradnici</v-subheader>
                <AthleteItem :events="matchData.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                <v-subheader> Realizačný tím</v-subheader>
                <AthleteItem crew :events="matchData.protocol.events" :athletes="nom.crew" />
            </v-tab-item>
        </v-tabs-items>

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
        <v-row v-if="$vuetify.breakpoint.name != 'xs' && matchData.nominations.length > 0">
            <v-col v-for="(nom) in matchData.nominations" :key="nom.teamId">
                <AthleteItem :events="matchData.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                <v-subheader>Nahradnici</v-subheader>
                <AthleteItem :events="matchData.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                <v-subheader> Realizačný tím</v-subheader>
                <AthleteItem crew :events="matchData.protocol.events" :athletes="nom.crew" />
            </v-col>
        </v-row>
        <v-row class="mt-6" v-else>
            <v-col class="d-flex justify-center">
                Zostavy nie su zatiaľ dostupné
            </v-col>
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

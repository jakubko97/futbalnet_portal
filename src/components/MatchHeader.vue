<template>
    <div>
        <v-row class="d-flex justify-center">
            {{ matchData.competition.name + ' - ' + matchData.round.name + '. kolo' }}
        </v-row>
        <v-row>
            <v-col cols="4" class="mb-0">
                <v-row class="d-flex justify-center">
                    <v-img max-width="80" :src="matchData.teams[0].organization.logo_public_url" @error="imgError" />
                </v-row>
                <v-row class="d-flex justify-center font-weight-bold my-4" style="text-align: center;">
                    {{ matchData.teams[0].name }}
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-row class="d-flex justify-center display-3">
                    {{ printScore(matchData.score) }}
                </v-row>
                <v-row v-if="matchData.scoreByPhases.length > 0" class="d-flex justify-center">
                    {{ '(' + printScore(matchData.scoreByPhases[0]) + ',' + printScore(matchData.scoreByPhases[1]) + ')' }}
                </v-row>
                <v-row v-if="matchData.protocol.audience" class="d-flex justify-center">
                    {{ matchData.protocol.audience }} divákov
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-row class="d-flex justify-center">
                    <v-img max-width="80" :src="matchData.teams[1].organization.logo_public_url" @error="imgError" />
                </v-row>
                <v-row class="d-flex justify-center font-weight-bold my-4" style="text-align: center;">
                    {{ matchData.teams[1].name }}
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
    
<script>

export default {
    name: 'MatchHeader',
    props: {
        matchData: {
            type: Object,
            required: true
        },
    },
    methods: {
        printScore(score) {
            if (score.length > 0) {
                return score[0] + ':' + score[1]
            }
            return ''
        },
        imgError(event) {
            event.target.src = "https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png"
        },
    },
    components: {

    },

    data: () => ({
        //
    }),
};
</script>
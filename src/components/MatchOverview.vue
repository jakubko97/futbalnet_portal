<template>
    <div>
        <!-- TIMELINE FOR DESKTOP VERSION -->
        <template v-if="$vuetify.breakpoint.name != 'xs'">
            <v-row class="d-flex justify-center my-1 subtitle-2">1.polčas {{
                printScore(scorePhases[0]) }}</v-row>
            <!-- PRE 1.POLCAS -->
            <v-timeline>
                <TimelineCustom v-for="(ev, index) in events.filter(r => r.phase == '1HT')" :key="index + ev.phase" :ev="ev"
                    :teams-id="teamsId" />
            </v-timeline>
            <v-row class="d-flex justify-center my-1 subtitle-2">2.polčas {{
                printScore(scorePhases[1]) }}</v-row>
            <!-- PRE 2.POLCAS -->
            <v-timeline>
                <TimelineCustom v-for="(ev, index) in events.filter(r => r.phase == '2HT')" :key="index + ev.phase" :ev="ev"
                    :teams-id="teamsId" />
            </v-timeline>
            <v-row v-if="events.filter(r => r.phase == 'shootout').length > 0"
                class="d-flex justify-center my-1 subtitle-2">Penalty {{
                    printScore(penaltiesScore) }}</v-row>
            <v-timeline>
                <!-- PRE PENALTY -->
                <TimelineCustom v-for="(ev, index) in events.filter(r => r.phase == 'shootout')" :event-index="index + 1"
                    :key="index + ev.phase" :ev="ev" :teams-id="teamsId" />
            </v-timeline>
            <v-row class="d-flex justify-center my-1 subtitle-2">Koniec</v-row>
        </template>

        <!-- OVERVIEW FOR MOBILE VERSION -->
        <v-container class="mt-5" v-if="$vuetify.breakpoint.name == 'xs' && scorePhases.length > 0" fluid>
            <v-row style="background-color: aliceblue;">
                <v-col class="d-flex justify-start ma-0 pa-0 px-3" cols="6">
                    1.polčas
                </v-col>
                <v-col class="d-flex justify-end ma-0 pa-0 px-3" cols="6">
                    {{ printScore(scorePhases[0]) }}
                </v-col>
            </v-row>
            <TimelineCustomMobile v-for="(ev, index) in events.filter(r => r.phase == '1HT')" :key="index + ev.phase"
                :teams-id="teamsId" :ev="ev" />
            <v-row style="background-color: aliceblue;">
                <v-col class="d-flex justify-start ma-0 pa-0 px-3" cols="6">
                    2.polčas
                </v-col>
                <v-col class="d-flex justify-end ma-0 pa-0 px-3" cols="6">
                    {{ printScore(scorePhases[1]) }}
                </v-col>
            </v-row>
            <TimelineCustomMobile v-for="(ev, index) in events.filter(r => r.phase == '2HT')" :key="index + ev.phase"
                :teams-id="teamsId" :ev="ev" />
            <template v-if="penaltiesScore">
                <v-row style="background-color: aliceblue;">
                    <v-col class="d-flex justify-start ma-0 pa-0 px-3" cols="6">
                        Penalty
                    </v-col>
                    <v-col class="d-flex justify-end ma-0 pa-0 px-3" cols="6">
                        {{ printScore(penaltiesScore) }}
                    </v-col>
                </v-row>
            </template>

        </v-container>
    </div>
</template>
    
<script>
import TimelineCustom from './TimelineCustom.vue';
import TimelineCustomMobile from './TimelineCustomMobile.vue';

export default {
    name: 'MatchOverview',
    props: {
        scorePhases: {
            type: Array,
            required: true
        },
        penaltiesScore: {
            type: Array,
            default: null
        },
        events: {
            type: Array,
            required: true
        },
        teamsId: {
            type: Array,
            required: true
        }
    },
    components: {
        TimelineCustom,
        TimelineCustomMobile
    },
    created() {

    },
    data: () => ({
        checkbox1: false
        //
    }),
    methods: {
        printScore(score) {
            return score[0] + ':' + score[1]
        },
    }
};
</script>
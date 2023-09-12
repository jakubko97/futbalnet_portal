<template>
    <div>
        <v-row class="d-flex justify-center mt-2">1.polčas</v-row>
        <v-timeline v-if="$vuetify.breakpoint.name != 'xs'">
            <TimelineCustom v-for="(ev, index) in events.filter(r => r.phase == '1HT')" :key="index + ev.phase" :ev="ev"
                :teams-id="teamsId" />
        </v-timeline>
        <v-row class="d-flex justify-center my-1">2.polčas</v-row>
        <v-timeline v-if="$vuetify.breakpoint.name != 'xs'">
            <TimelineCustom v-for="(ev, index) in events.filter(r => r.phase == '2HT')" :key="index + ev.phase" :ev="ev"
                :teams-id="teamsId" />
        </v-timeline>
        <v-row class="d-flex justify-center my-1">Koniec</v-row>
        <v-container class="mt-5" v-if="$vuetify.breakpoint.name == 'xs'">
            <template v-for="(ev, index) in events">
                <v-row v-if="teamsId[0] == ev.team" :key="index">
                    <v-col :class="teamsId[0] == ev.team ? 'd-flex justify-start' : 'd-flex justify-end'" cols="2">
                        <strong> {{ ev.eventTime }}
                        </strong>
                        <EventTypeImg :event="ev" />
                    </v-col>
                    <v-col :class="teamsId[0] == ev.team ? 'd-flex justify-start' : 'd-flex justify-end'" cols="10">
                        <div>
                            <v-row class="d-flex justify-start font-weight-bold">
                                <div v-if="ev.player">
                                    {{ ev.player.name }}
                                </div>
                                <div v-if="ev.player == null && ev.crewMember">
                                    {{ ev.crewMember.name }}
                                </div>
                            </v-row>
                            <v-row class="d-flex justify-start caption text-wrap">
                                <div v-if="ev.reason">
                                    {{ ev.reason }}
                                </div>
                                <div v-if="ev.reason == null && ev.type_sk">
                                    {{ ev.type_sk }}
                                </div>
                                <div v-if="ev.reason == null && ev.replacement != null">
                                    Striedajúci: {{ ev.replacement.name }}
                                </div>
                            </v-row>
                        </div>
                    </v-col>

                </v-row>
                <v-row v-if="teamsId[1] == ev.team" :key="index">
                    <v-col :class="teamsId[0] == ev.team ? 'd-flex justify-start' : 'd-flex justify-end'" cols="10">
                        <div>
                            <v-row class="d-flex justify-end font-weight-bold">
                                <div v-if="ev.player">
                                    {{ ev.player.name }}
                                </div>
                                <div v-if="ev.player == null && ev.crewMember">
                                    {{ ev.crewMember.name }}
                                </div>
                            </v-row>
                            <v-row class="d-flex justify-end caption text-wrap">
                                <div style="text-align: right;" v-if="ev.reason">
                                    {{ ev.reason }}
                                </div>
                                <div v-if="ev.reason == null && ev.type_sk">
                                    {{ ev.type_sk }}
                                </div>
                                <div v-if="ev.reason == null && ev.replacement != null">
                                    Striedajúci: {{ ev.replacement.name }}
                                </div>

                            </v-row>
                        </div>
                    </v-col>
                    <v-col :class="teamsId[0] == ev.team ? 'd-flex justify-start' : 'd-flex justify-end'" cols="2">
                        <EventTypeImg :event="ev" />
                        <strong> {{ ev.eventTime }}
                        </strong>
                    </v-col>

                </v-row>
            </template>
        </v-container>
    </div>
</template>
    
<script>
import EventTypeImg from './EventTypeImg.vue';
import TimelineCustom from './TimelineCustom.vue';

export default {
    name: 'MatchOverview',
    props: {
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
        EventTypeImg,
        TimelineCustom
    },
    created() {

    },
    data: () => ({
        checkbox1: false
        //
    }),
};
</script>
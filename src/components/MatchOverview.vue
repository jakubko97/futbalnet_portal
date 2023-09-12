<template>
    <div>
        <v-timeline v-if="$vuetify.breakpoint.name != 'xs'">
            <v-timeline-item color="transparent" small v-for="(ev, index) in events" :key="index" :left="teamsId[0] == ev.team"
                :right="teamsId[1] == ev.team">
                <template v-slot:icon>
                    <strong class=""> {{ parseInt(ev.eventTime) }}
                    </strong> '
                </template>
                <!-- design row patter for left side team -->
                <v-row v-if="teamsId[0] == ev.team" class="pt-1">
                    <v-col class="d-flex justify-end pa-2" cols="12">
                        <div class="mr-4">
                            <v-row class="d-flex justify-end font-weight-bold">
                                <div v-if="ev.player">
                                    {{ ev.player.name }}
                                </div>
                                <div v-if="ev.player == null && ev.crewMember">
                                    {{ ev.crewMember.name }}
                                </div>
                            </v-row>
                            <v-row class="d-flex justify-end caption text-wrap">
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
                        <EventTypeImg :event="ev" />
                    </v-col>
                    <!-- <v-col class="d-flex justify-end pa-0" cols="1">
                        <strong> {{ ev.eventTime }}
                        </strong>
                    </v-col> -->
                </v-row>
                <!-- design row patter for RIGHT side team -->
                <v-row v-if="teamsId[1] == ev.team" class="pt-1">
                    <!-- <v-col class="d-flex justify-start pa-2" cols="1">
                        <strong> {{ ev.eventTime }}
                        </strong> -->
                    <!-- </v-col> -->
                    <v-col class="d-flex justify-start pa-2" cols="12">
                        <EventTypeImg :event="ev" />
                        <div class="ml-4">
                            <v-row class="d-flex justify-start font-weight-bold">
                                <div v-if="ev.player">
                                    {{ ev.player.name }}
                                </div>
                                <div v-if="ev.player == null && ev.crewMember">
                                    {{ ev.crewMember.name }}
                                </div>
                            </v-row>
                            <v-row class="caption">
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
            </v-timeline-item>
        </v-timeline>
        <v-container class="mt-5" v-else>
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
        EventTypeImg
    },

    data: () => ({
        checkbox1: false
        //
    }),
};
</script>
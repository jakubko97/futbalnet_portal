<template>
    <div>
        <v-timeline>
            <v-timeline-item v-for="(ev, index) in events" :key="index" :left="teamsId[0] == ev.team"
                :right="teamsId[1] == ev.team" >
                <!-- design row patter for left side team -->
                <v-row v-if="teamsId[0] == ev.team" class="pt-1">
                    <v-col class="d-flex justify-end pa-2" cols="11">
                        <div class="mr-4">
                            <v-row class="d-flex justify-end font-weight-bold">
                                {{ ev.player.name }}
                            </v-row>
                            <v-row class="d-flex justify-end caption">
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
                    <v-col class="d-flex justify-end pa-2" cols="1">
                        <strong> {{ ev.eventTime }}
                        </strong>
                    </v-col>
                </v-row>
                <!-- design row patter for RIGHT side team -->
                <v-row v-if="teamsId[1] == ev.team" class="pt-1">
                    <v-col class="d-flex justify-start pa-2" cols="1">
                        <strong> {{ ev.eventTime }}
                        </strong>
                    </v-col>
                    <v-col class="d-flex justify-start pa-2" cols="11">
                        <EventTypeImg :event="ev" />
                        <div class="ml-4">
                            <v-row class="d-flex justify-start font-weight-bold">
                                {{ ev.player.name }}
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
        //
    }),
};
</script>
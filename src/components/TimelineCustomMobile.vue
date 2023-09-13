<template>
    <v-row>
        <template v-if="teamsId[0] == ev.team">
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

        </template>
        <template v-if="teamsId[1] == ev.team">
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
        </template>
    </v-row>
</template>
    
<script>
import EventTypeImg from './EventTypeImg.vue';

export default {
    name: 'TimelineCustomMobile',
    props: {
        ev: {
            type: Object,
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
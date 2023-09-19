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
                        <div @click="open(ev.player._issfId)" v-if="ev.player">
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
                        <div @click="open(ev.replacement._issfId)" v-if="ev.reason == null && ev.replacement != null">
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
                        <div @click="open(ev.player._issfId)" v-if="ev.player">
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
                        <div @click="open(ev.replacement._issfId)" v-if="ev.reason == null && ev.replacement != null">
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
        <CsDialog v-if="playerData" maxWidth="750" @close-dialog="close()" v-model="dialog" :title="''">
            <v-container fluid>
                <v-row class="d-flex justify-center">
                    <v-avatar size="140">
                        <v-img :src="playerData.photo ? playerData.photo.public_url : require('../assets/person.svg')"
                            alt="player" />
                    </v-avatar>
                </v-row>
                <v-row class="d-flex justify-center headline" style="align-items: center;">
                    <v-img max-width="16" max-height="12" class="mr-2" :src="'https://api.sportnet.online/assets/countries/'+playerData.citizenship+'.svg'"></v-img>
                    {{ playerData.titles.before + ' ' + playerData.name + ' ' + playerData.surname + ' ' +
                        playerData.titles.after }}
                </v-row>
                <v-row class="d-flex justify-center">
                    {{ playerData.age + ' rokov' }} {{ ' | ' + playerData.birthyear + '' }} {{ ' | Reg. číslo ' + playerId +
                        '' }}
                </v-row>
                <!-- <v-row class="d-flex justify-center">
                   {{ playerData }}

                </v-row> -->
            </v-container>
        </CsDialog>
    </v-row>
</template>
    
<script>
import EventTypeImg from './EventTypeImg.vue';
import CsDialog from './custom/CsDialog.vue';

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
        EventTypeImg,
        CsDialog
    },
    methods: {
        loadUser() { //ppo/futbalsfz.sk/users/
            this.$apiPerson
                .get("ppo/futbalsfz.sk/users/" + this.playerId)
                .then((response) => {
                    this.playerData = response.data
                })
                .catch(() => {
                    // this.errors.push(e);
                })
                .finally(() => {
                });
        },
        open(issfId) {
            this.playerId = issfId
            this.dialog = true
            this.loadUser()
        },
        close() {
            this.dialog = false
            this.playerData = null
        }
    },
    data: () => ({
        dialog: false,
        playerId: null,
        playerData: null
        //
    }),
};
</script>
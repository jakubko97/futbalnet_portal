<template>
  <v-timeline-item
    color="transparent"
    small
    :left="teamsId[0] == ev.team"
    :right="teamsId[1] == ev.team"
  >
    <template v-slot:icon>
      <strong v-if="ev.eventTime" class="">
        {{ parseInt(ev.eventTime) }}
      </strong>
      '
      <strong v-if="ev.eventTime == null" class=""> {{ eventIndex }} </strong>
    </template>
    <!-- design row patter for left side team -->
    <v-row v-if="teamsId[0] == ev.team" class="pt-1">
      <v-col class="d-flex justify-end pa-2" cols="12">
        <div class="mr-4">
          <v-row class="d-flex justify-end font-weight-bold">
            <div @click="open(ev.player._issfId)" v-if="ev.player">
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
            <div
              @click="open(ev.replacement._issfId)"
              v-if="ev.reason == null && ev.replacement != null"
            >
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
            <div @click="open(ev.player._issfId)" v-if="ev.player">
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
            <div
              @click="open(ev.replacement._issfId)"
              v-if="ev.reason == null && ev.replacement != null"
            >
              Striedajúci: {{ ev.replacement.name }}
            </div>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <CsDialog
      v-if="playerData"
      maxWidth="750"
      @close-dialog="close()"
      v-model="dialog"
      :title="''"
    >
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <v-avatar size="140">
            <v-img
              :src="
                playerData.photo
                  ? playerData.photo.public_url
                  : require('../assets/person.svg')
              "
              alt="player"
            />
          </v-avatar>
        </v-row>
        <v-row
          class="d-flex justify-center headline"
          style="align-items: center"
        >
          <v-img
            max-width="16"
            max-height="12"
            class="mr-2"
            :src="
              'https://api.sportnet.online/assets/countries/' +
              playerData.citizenship +
              '.svg'
            "
          ></v-img>
          {{
            playerData.titles.before +
            " " +
            playerData.name +
            " " +
            playerData.surname +
            " " +
            playerData.titles.after
          }}
        </v-row>
        <v-row class="d-flex justify-center">
          {{ playerData.age + " rokov" }}
          {{ " | " + playerData.birthyear + "" }}
          {{ " | Reg. číslo " + playerId + "" }}
        </v-row>
        <!-- <v-row class="d-flex justify-center">
                   {{ playerData }}

                </v-row> -->
      </v-container>
    </CsDialog>
  </v-timeline-item>
</template>
    
<script>
import EventTypeImg from "./EventTypeImg.vue";
import CsDialog from "./custom/CsDialog.vue";

export default {
  name: "TimelineCustom",
  props: {
    eventIndex: {
      type: Number,
      default: 0,
    },
    ev: {
      type: Object,
      required: true,
    },
    teamsId: {
      type: Array,
      required: true,
    },
  },
  components: {
    EventTypeImg,
    CsDialog,
  },
  methods: {
    loadUser() {
      //ppo/futbalsfz.sk/users/
      this.$apiPerson
        .get("ppo/futbalsfz.sk/users/" + this.playerId)
        .then((response) => {
          this.playerData = response.data;
        })
        .catch(() => {
          // this.errors.push(e);
        })
        .finally(() => {});
    },
    open(issfId) {
      this.playerId = issfId;
      this.dialog = true;
      this.loadUser();
    },
    close() {
      this.dialog = false;
      this.playerData = null;
    },
  },
  data: () => ({
    dialog: false,
    playerId: null,
    playerData: null,
    //
  }),
};
</script>
<style>
.v-timeline-item__dot {
  z-index: 2;
  border-radius: 50%;
  height: 22px;
  text-align: center;
  box-shadow: none;
}
</style>
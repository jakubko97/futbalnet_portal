<template>
  <div>
    <v-list-item
      v-for="(ath, idx) in athletes"
      :key="crew ? ath.position + ath.sportnetUser._id : ath.sportnetUser._id"
      :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''"
    >
      <v-list-item-icon v-if="ath.additionalData">
        {{ ath.additionalData.nr }}
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          <span @click="open(ath)">{{ ath.sportnetUser.name }}</span>
          <span v-if="ath.additionalData && ath.additionalData.captain">
            (C)
          </span>
          <v-row style="float: right">
            <template v-for="ev in getEventByUserId(ath.sportnetUser._id)">
              <v-col
                class="d-flex justify-center"
                :key="ev.eventTime + ev.eventType"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <EventTypeImg :event="ev" :on="on" :attrs="attrs" />
                  </template>
                  <span v-if="ev.reason">{{
                    ev.eventTime + " " + ev.reason
                  }}</span>
                  <span v-if="ev.eventType == 'goal'">{{
                    ev.eventTime + " " + ev.type_sk
                  }}</span>
                  <span v-if="ev.eventType == 'failed_goal'">{{
                    ev.eventTime + " " + ev.type_sk
                  }}</span>
                  <span v-if="ev.eventType == 'substitution'"
                    >{{ ev.eventTime }} Striedanie</span
                  >
                </v-tooltip>
              </v-col>
            </template>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle>
          <template v-if="ath.additionalData">
            {{ ath.additionalData.position }}
          </template>
          <template v-if="ath.position">
            {{ ath.position }}
          </template>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
    <div v-if="!crew && athletes.length > 0" class="mx-2 px-2">
      Priemerný vek: {{ getAverageAge() }}
    </div>
  </div>
</template>
  
<script>
import EventTypeImg from "./EventTypeImg.vue";
import CsDialog from "./custom/CsDialog.vue";

export default {
  name: "AthleteItem",
  props: {
    athletes: {
      type: Array,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
    crew: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EventTypeImg,
    CsDialog,
  },
  methods: {
    open(athlete) {
      if (athlete.additionalData) {
        this.playerId = athlete.additionalData.__issfId;
        this.dialog = true;
        this.loadUser();
      }
    },
    close() {
      this.dialog = false;
      this.playerData = null;
    },
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
    getEventByUserId(id) {
      let arr = [];
      Array.from(this.events, (e) => {
        if (e.player == null && e.crewMember && e.crewMember._id == id) {
          arr.push(e);
        }
        if (e.player && e.player._id == id) {
          arr.push(e);
        }
        if (e.replacement && e.replacement._id == id) {
          arr.push({ eventType: e.eventType, eventTime: e.eventTime });
        }
      });
      return arr;
    },
    getAverageAge() {
      let sum = 0;
      let count = 0;
      Array.from(this.athletes, (a) => {
        sum += a.additionalData.age;
        count++;
      });
      return (sum / count).toFixed(2);
    },
  },
  data: () => ({
    dialog: false,
    playerData: null,
    playerId: null,
    //
  }),
};
</script>
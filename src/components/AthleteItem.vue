<template>
    <div>
        <v-list-item v-for="(ath, idx) in athletes" :key="crew ? (ath.position + ath.sportnetUser._id) : ath.sportnetUser._id"
            :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''">
            <v-list-item-icon v-if="ath.additionalData">
                {{ ath.additionalData.nr }}
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ ath.sportnetUser.name }}
                    <span v-if="ath.additionalData && ath.additionalData.captain"> (C)
                    </span>
                    <v-row style="float: right">
                        <template v-for="ev in getEventByUserId(ath.sportnetUser._id)">
                            <v-col :key="ev.eventTime + ev.eventType">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'failed_goal' && ev.type == 'failed_goal_penalty'" :src="require('../assets/missed_penalty.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'goal' && ev.type == 'dropped'" :src="require('../assets/own_goal.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'goal' && ev.type != 'dropped'" :src="require('../assets/ball.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'red_card'" :src="require('../assets/red.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'yellow_card'"
                                            :src="require('../assets/yellow-card.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'second_yellow_card'"
                                            :src="require('../assets/second_yellow.png')" />
                                        <v-img v-bind="attrs" v-on="on" alt="" max-height="20" max-width="20"
                                            v-if="ev.eventType == 'substitution'" :src="require('../assets/sub.png')" />
                                    </template>
                                    <span v-if="ev.reason">{{ ev.eventTime + ' ' + ev.reason }}</span>
                                    <span v-if="ev.eventType == 'goal'">{{ ev.eventTime + ' ' + ev.type_sk }}</span>
                                    <span v-if="ev.eventType == 'failed_goal'">{{ ev.eventTime + ' ' + ev.type_sk }}</span>
                                    <span v-if="ev.eventType == 'substitution'">{{ ev.eventTime }} Striedanie</span>
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
        <div v-if="!crew && athletes.length > 0" class="ma-2 pa-2">Avg age: {{ getAverageAge() }}</div>
    </div>
</template>
  
<script>

export default {
    name: 'AthleteItem',
    props: {
        athletes: {
            type: Array,
            required: true
        },
        events: {
            type: Array,
            required: true
        },
        crew: {
            type: Boolean,
            default: false
        }
    },
    components: {
    },
    methods: {
        getEventByUserId(id) {
            let arr = []
            Array.from(this.events, e => {
                if(e.eventTime){
                    e.eventTime = e.eventTime.substring(0, 2) + '´'
                }
                if(e.type == 'goal_game'){
                    e.type_sk = 'Gól z hry'
                }else if(e.type == 'goal_penalty'){
                    e.type_sk = 'Penalta'
                }
                else if(e.type == 'failed_goal_penalty'){
                    e.type_sk = 'Nepremenená penalta'
                }else if(e.type == 'dropped'){
                    e.type_sk = 'Vlastný gól'
                }else if(e.type == 'goal_standard'){
                    e.type_sk = 'Štandartka'
                }
                if (e.player == null && e.crewMember && e.crewMember._id == id) {
                    arr.push(e)
                }
                if (e.player && e.player._id == id) {
                    arr.push(e)
                }
                if (e.replacement && e.replacement._id == id) {
                    arr.push({ eventType: e.eventType, eventTime: e.eventTime })
                }
            })
            return arr
        },
        getAverageAge() {
            let sum = 0
            let count = 0
            Array.from(this.athletes, a => {
                sum += a.additionalData.age
                count++
            })
            return (sum / count).toFixed(2)
        }
    },
    data: () => ({
        //
    }),
};
</script>
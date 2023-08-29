<template>
    <div>
        <v-list-item v-for="(ath, idx) in athletes" :key="ath.sportnetUser._id" :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''">
                <v-list-item-icon>
                    {{ ath.additionalData.nr }}
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ ath.sportnetUser.name }}
                        <span v-if="ath.additionalData.captain"> (C)
                        </span>
                        <v-row style="float: right">
                            <template v-for="ev in getEventByUserId(ath.sportnetUser._id)">
                                <v-col :key="ev.eventTime + ev.eventType">
                                    <v-img alt="" max-height="20" max-width="20" v-if="ev.eventType == 'goal'"
                                        :src="require('../assets/ball.png')" />
                                    <v-img alt="" max-height="20" max-width="20" v-if="ev.eventType == 'red_card'"
                                        :src="require('../assets/red.png')" />
                                    <v-img alt="" max-height="20" max-width="20" v-if="ev.eventType == 'yellow_card'"
                                        :src="require('../assets/yellow-card.png')" />
                                    <v-img alt="" max-height="20" max-width="20" v-if="ev.eventType == 'second_yellow_card'"
                                        :src="require('../assets/second_yellow.png')" />
                                    <v-img alt="" max-height="20" max-width="20" v-if="ev.eventType == 'substitution'"
                                        :src="require('../assets/sub.png')" />
                                </v-col>
                            </template>
                        </v-row>
                    </v-list-item-title>
                    <v-list-item-subtitle> {{ ath.additionalData.position }}
                    </v-list-item-subtitle>
                </v-list-item-content>
        </v-list-item>
        <div class="ma-2 pa-2">Avg age: {{ getAverageAge() }}</div>
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
    },
    components: {
    },
    methods: {
        getEventByUserId(id) {
            let arr = []
            Array.from(this.events, e => {
                if (e.player._id == id) {
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
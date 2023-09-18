<template>
    <v-container v-if="data != null" style="text-align: center;" fluid>
        <v-tabs v-model="tab" centered>
            <v-tab v-for="(video, idx) in data.videos" :key="idx">{{ video.category }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(video, idx) in data.videos" :key="idx">
                <v-row class="d-flex justify-center">
                    <v-col :cols="matchEvents ? 10 : 12">
                        <video ref="video" controls>
                            <source :poster="video.thumbnail + '?x11217'" :src="'https://video.sportnet.online/videospace/' + video.path" :type="video.type" />
                            <p>
                                Your browser doesn't support HTML video. Here is a
                                <a :href="'https://video.sportnet.online/videospace/' + video.path">link to the video</a>
                                instead.
                            </p>
                        </video>
                    </v-col>
                    <v-col v-if="matchEvents" cols="2">
                        <v-row @click="clickEvent(event.eventTime, idx)"
                            v-for="(event, idx2) in match.protocol.events.filter(a => eventTypes.includes(a.eventType) && (idx == 0 ? a.phase == '1HT' : a.phase == '2HT'))"
                            :key="idx2">
                            <v-col class="d-flex justify-end" cols="2">
                                <strong> {{ event.eventTime }}
                                </strong>
                                <EventTypeImg :event="event" />
                            </v-col>
                            <v-col class="d-flex justify-start" cols="10">
                                <template v-if="event.player != null">
                                    {{ event.player.name }}
                                </template>
                                <template v-if="event.player == null && event.crewMember.name">
                                    {{ event.crewMember.name }}
                                </template>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center pa-2">
                    Veľkosť: {{ formatBytes(video.size) }} - Typ: {{ video.type }}
                </v-row>

            </v-tab-item>
        </v-tabs-items>
        <div v-if="data.videos.length == 0">
            Žiaden videozáznam zatiaľ nebol pridaný.
        </div>
    </v-container>
</template>
    
<script>
import EventTypeImg from './EventTypeImg.vue';

export default {
    name: 'VideoZaznamView',
    props: {
        match: {
            type: Object,
            required: true
        }
    },
    components: {
        EventTypeImg
    },

    data: () => ({
        tab: 0,
        data: null,
        matchEvents: true,
        eventTypes: ['goal', 'red_card', 'second_yellow_card']
    }),
    created() {
        this.fetchVideo()
    },
    methods: {
        clickEvent(eventTime , half) {
            let seconds = 0
            if(half == 1){
                seconds = (parseFloat(eventTime) * 60) - (60*45)
                this.$refs.video[1].currentTime = seconds
                this.$refs.video[1].play()
            }else if(half == 0){
                seconds = (parseFloat(eventTime) * 60)
                this.$refs.video[0].currentTime = seconds
                this.$refs.video[0].play()
            }
        },
        formatBytes(bytes, decimals = 2) {
            if (!+bytes) return '0 Bytes'

            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

            const i = Math.floor(Math.log(bytes) / Math.log(k))

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
        },
        fetchVideo() {
            const params = {
                matchId: this.match.__issfId,
                competitionMatchId: this.match._id,
                expand_match: 1
            };
            this.$apiV2
                .get(
                    "public/futbalsfz.sk/videos?", { params: params }
                )
                .then((response) => {
                    this.data = response.data
                })
                .catch(() => {
                    // this.errors.push(e);
                })
                .finally(() => { });
        }
    },

};
</script>
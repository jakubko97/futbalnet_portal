<template>
    <v-container v-if="data != null" style="text-align: center;" fluid>
        <v-tabs v-model="tab" centered>
            <v-tab v-for="(video, idx) in data.videos" :key="idx">{{ video.category }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(video, idx) in data.videos" :key="idx">
                <v-row class="d-flex justify-center">
                    <video controls>
                        <source :src="'https://video.sportnet.online/videospace/' + video.path" :type="video.type" />
                        <!-- <p>
                    Your browser doesn't support HTML video. Here is a
                    <a :href="'https://video.sportnet.online/videospace/' + video.path">link to the video</a> instead.
                </p> -->
                    </video>
                </v-row>
                <v-row class="d-flex justify-center pa-2">
                    Veľkosť: {{ formatBytes(video.size) }} - Typ: {{ video.type }}
                </v-row>

            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
    
<script>


export default {
    name: 'VideoZaznamView',
    props: {
        match: {
            type: Object,
            required: true
        }
    },
    components: {
    },

    data: () => ({
        tab: 0,
        data: null
    }),
    created() {
        this.fetchVideo()
    },
    methods: {
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
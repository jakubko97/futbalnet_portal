<template>
    <CsDialog maxWidth="750" save-button save-button-label="Submit" :disabled="destDevice == null" @close-dialog="close()"
        :loading-save-button="loading" v-model="dialog" title="Detail">
        <v-card>
            <v-card-text>
            </v-card-text>
        </v-card>
    </CsDialog>
</template>

<script>
import CsDialog from './custom/CsDialog.vue';

export default {
    name: "DetailDialog",
    components: {
        CsDialog
    },
    props: {
        matchId: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            results: null,
            dialog: false,
            loading: false
        };
    },
    created() {
        this.fetchData();
    },
    computed: {
    },
    methods: {
        open() {
            this.dialog = true;
        },
        close() {
            this.dialog = false;

        },
        //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
        fetchData() {
            this.$apiV1
                .get("matches/" + this.matchId)
                .then((response) => {
                    this.results = response.data
                })
                .catch(() => {
                    // this.errors.push(e);
                })
                .finally(() => {
                });
        },
    }
}
</script>

<style></style>

<template>
    <div>
        <v-row v-if="results">
            <v-col v-for="(nom, index) in results.nominations" :key="nom.teamId">
                <div v-if="index == 0">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img max-height="40" max-width="40"
                                :src="results.teams[index].organization.logo_public_url"></v-img> </v-list-item-avatar>
                        <v-list-item-content>
                            {{ results.teams[index].name }}
                        </v-list-item-content>

                    </v-list-item>
                    <v-subheader>Domaci</v-subheader>
                </div>
                <div v-else>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img max-height="40" max-width="40"
                                :src="results.teams[index].organization.logo_public_url"></v-img> </v-list-item-avatar>
                        <v-list-item-content>
                            {{ results.teams[index].name }}
                        </v-list-item-content>

                    </v-list-item>
                    <v-subheader>Hostia</v-subheader>
                </div>
                <AthleteItem :events="results.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                <v-subheader>Nahradnici</v-subheader>
                <AthleteItem :events="results.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                <v-subheader> Realizačný tím</v-subheader>

                <v-list-item v-for="(cr, idx) in nom.crew" :key="cr.position">
                    <v-list-item-content :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''">
                        <v-row>
                            <v-col>
                                <v-list-item-title class="pl-2">{{ cr.sportnetUser.name }}
                                </v-list-item-title>
                            </v-col>
                            <v-col>
                                <v-list-item-title>{{ cr.position }}
                                </v-list-item-title>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AthleteItem from './AthleteItem.vue';

export default {
    name: "DetailView",
    components: {
        AthleteItem
    },
    props: {
        // matchId: {
        //     type: Number,
        //     required: true
        // },
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
        //matches?playerAppSpace=fk-vechec.futbalnet.sk&competitionId=4497&dateTo=2023-08-28T17%3A08%3A00.000Z&withDate=true&closed=true&teamId=57400&offset=0&limit=8
        fetchData() {
            this.$apiV1
                .get("matches/" + this.$route.params.id)
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

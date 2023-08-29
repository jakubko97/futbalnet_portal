<template>
    <v-container v-if="results" fluid>
        <v-tabs v-if="$vuetify.breakpoint.name == 'xs'" v-model="tab">
            <v-tab v-for="i in [0, 1]" :key="i">
                <v-img class="mr-2" max-height="28" max-width="28"
                    :src="results.teams[i].organization.logo_public_url"></v-img>
                {{ results.teams[i].name }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-if="$vuetify.breakpoint.name == 'xs'" v-model="tab">
            <v-tab-item v-for="(nom, index) in results.nominations" :key="nom.teamId">
                <template v-if="$vuetify.breakpoint.name != 'xs'">
                    <div v-if="index == 0">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img max-height="40" max-width="40"
                                    :src="results.teams[index].organization.logo_public_url"></v-img>
                            </v-list-item-avatar>
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
                                    :src="results.teams[index].organization.logo_public_url"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                {{ results.teams[index].name }}
                            </v-list-item-content>

                        </v-list-item>
                        <v-subheader>Hostia</v-subheader>
                    </div>
                </template>

                <AthleteItem :events="results.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == false)" />
                <v-subheader>Nahradnici</v-subheader>
                <AthleteItem :events="results.protocol.events"
                    :athletes="nom.athletes.filter(n => n.additionalData.substitute == true)" />
                <v-subheader> Realizačný tím</v-subheader>


                <AthleteItem crew :events="results.protocol.events" :athletes="nom.crew" />
                <!-- <v-list-item v-for="(cr, idx) in nom.crew" :key="cr.position">
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
                </v-list-item> -->
            </v-tab-item>
        </v-tabs-items>
        <v-row>
            <template v-if="$vuetify.breakpoint.name != 'xs'">
                <v-col v-for="(nom, index) in results.nominations" :key="nom.teamId">
                    <div v-if="index == 0">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img max-height="40" max-width="40"
                                    :src="results.teams[index].organization.logo_public_url"></v-img>
                            </v-list-item-avatar>
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
                                    :src="results.teams[index].organization.logo_public_url"></v-img>
                            </v-list-item-avatar>
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


                    <AthleteItem crew :events="results.protocol.events" :athletes="nom.crew" />
                </v-col>
            </template>
        </v-row>
    </v-container>
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
            loading: false,
            tab: 0
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

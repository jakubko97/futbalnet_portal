<template>
    <v-container fluid>
        <v-row>
            <v-col cols="3" sm="2">
                <strong>Meno</strong>
            </v-col>
            <v-col cols="3" sm="2">
                <strong>Klub</strong>
            </v-col>
            <v-col cols="6" sm="8">
                <strong>Dôvod</strong>
            </v-col>
        </v-row>
        <v-row v-for="(card, idx) in data" :key="idx" :style="idx % 2 == 0 ? 'background-color: aliceblue;' : ''">
            <v-col cols="3" sm="2">
                <div v-if="card.player">
                    {{ card.player.name }}
                </div>
                <div v-if="card.player == null && card.crewMember">
                    {{ card.crewMember.name }} (realizačný tím)
                </div>
            </v-col>
            <v-col cols="3" sm="2">
                {{ card.teamName }}
            </v-col>
            <v-col cols="6" sm="8">
                {{ card.reason }}
            </v-col>
        </v-row>
    </v-container>
</template>
    
<script>

export default {
    name: 'RedCardsView',
    props: {
        data: {
            type: Array,
            required: true
        },
        league: {
            type: Object,
            required: true
        }
    },
    watch: {

    },
    components: {
    },
    methods: {
    },
    mounted() {

    },
    created() {

    },
    data: () => ({

    }),
};
</script>
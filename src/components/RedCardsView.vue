<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <strong>Meno</strong>
            </v-col>
            <v-col cols="9">
                <strong>Dôvod</strong>
            </v-col>
        </v-row>
        <v-row v-for="(card, idx) in data" :key="idx">
            <v-col cols="3">
                <div v-if="card.player">
                    {{ card.player.name }}
                </div>
                <div v-if="card.player == null && card.crewMember">
                    {{ card.crewMember.name }} (realizačný tím)
                </div>
            </v-col>
            <v-col cols="9">
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
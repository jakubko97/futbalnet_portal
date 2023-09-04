<template>
    <v-data-table mobile-breakpoint="0" hide-default-footer :headers="headers" :items="teams" :items-per-page="24" class="elevation-0">
        <template #[`item.score`]="{ item }">
            {{ item.score[0] + ':' + item.score[1] }}
        </template>
        <template #[`item.logo`]="{ item }">
            <v-img max-height="20" max-width="20" :src="item.logo" />
        </template>
        <template #[`item.club_name`]="{ item }">
            <div :class="favTeams.includes(item.club_name) ? 'font-weight-bold' : ''">
                {{ item.club_name }}
            </div>
        </template>
        <template #[`item.position`]="{ item }">
            <v-chip :outlined="nonColoredPositions(item)" :class="coloringPosition(item)">
                {{ item.position }}.
            </v-chip>
        </template>
    </v-data-table>
</template>
    
<script>

function compareFn(a, b) {
    return b.points - a.points || new Date(b.score[0]-b.score[1]) - new Date(a.score[0]-a.score[1])
}

export default {
    name: 'TableView',
    props: {
        tableData: {
            type: Array,
            required: true
        },
        league: {
            type: Object,
            required: true
        }
    },
    watch : {
        tableData(){
            this.initTable()
        }
    },
    components: {
    },
    methods: {
        nonColoredPositions(item){
            return !this.league.promotion.includes(item.position) && this.league.relegation.filter(a => this.tableData.length - a + 1 == item.position).length == 0
        },
        coloringPosition(item){
            let coloring = ''
            if(this.league.promotion.includes(item.position)){
                coloring += 'primary white--text'
            }
            else{
                Array.from(this.league.relegation, i => {
                    let idx = this.tableData.length - i + 1 //calculate last indexes for relegated positions
                    if(idx == item.position){
                        coloring += 'red white--text' 
                    }
                })
            }
            return coloring
        },
        initTable() {
            this.teams = []
            let idx = 0
            Array.from(this.tableData, t => {
                Array.from(t.teams, i => {
                    if (this.teams.filter(f => f.club_name === i.name).length == 0) {
                        const team = {
                            club_id: i._id,
                            club_name: i.name,
                            logo: i.organization.logo_public_url,
                            position: ++idx,
                            score: [0, 0],
                            points: 0
                        }
                        this.teams.push(team)
                    }
                })
            })

            Array.from(this.tableData, t => {
                let winner = ''
                if (t.score[0] > t.score[1]) {
                    winner = t.teams[0].name
                    this.teams.filter(f => f.club_name === winner)[0].points += 3
                } else if (t.score[0] < t.score[1]) {
                    winner = t.teams[1].name
                    this.teams.filter(f => f.club_name === winner)[0].points += 3
                } else if (t.score[0] === t.score[1]) { 
                    let draw = this.teams.filter(f => f.club_name === t.teams[0].name || f.club_name === t.teams[1].name)
                    draw[0].points +=1
                    draw[1].points +=1
                }
                
                // if (w != null) {
                //     w.points = 3
                // }
                Array.from(t.teams, (s, index) => {
                    if (index == 0) { 
                        this.teams.filter(f => f.club_name === s.name)[0].score[0] += t.score[0]
                        this.teams.filter(f => f.club_name === s.name)[0].score[1] += t.score[1]
                    }else if(index == 1){
                        this.teams.filter(f => f.club_name === s.name)[0].score[0] += t.score[1]
                        this.teams.filter(f => f.club_name === s.name)[0].score[1] += t.score[0]
                    }

                })
            })

            this.teams.sort(compareFn)
            let p = 0
            Array.from(this.teams, b => {
                b.position = ++p
            })
        },
    },
    mounted() {

    },
    created() {
        this.initTable()
        // Array.from(this.tableData, t => {
        //     let winner = ''
        //     if (t.score[0] > t.score[1]) {
        //         winner = t.teams[0].name
        //     } else if (t.score[0] < t.score[1]) {
        //         winner = t.teams[1].name
        //     } if (t.score[0] == t.score[1]) {

        //     }
        // })
    },
    data: () => ({
        teams: [],
        favTeams: ['FK Vechec', 'MFK Vranov nad Topľou'],
        headers: [
            { text: '#', value: 'position' },
            { text: '', value: 'logo', sortable: false },
            { text: 'Klub', value: 'club_name' },
            { text: 'Skóre', value: 'score' },
            { text: 'B', value: 'points' }
        ],
    }),
};
</script>
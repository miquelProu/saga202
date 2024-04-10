<template>
    <section>
        <div clqss="container" style="margin-bottom:40px;">
            <div class="title cinzel-regular">Campanya: {{nom}}</div> 
            <div class="title cinzel-regular">Bando A: {{punts_bando_A}} Bando B: {{punts_bando_B}}</div>
            <div class="title cinzel-regular" v-if="isCalculat">Generals: Bando A: {{maxs[0]['jugador']}} {{maxs[0]['punts']}} Bando B: {{maxs[1]['jugador']}} {{maxs[1]['punts']}}</div>
            <div class="title"><router-link :to="{ name: 'confrontacions', params: { campanya: campanya_id, torn: Object.keys(grouped_display).length + 1, isNew: 1 }}">Nou torn</router-link></div>
        </div>
        <div class="container">
            <div class="columns">
                <div class="column is-4" v-for="element in Object.keys(grouped_display)">
                        <div class="title"><router-link :to="{ name: 'confrontacions', params: { campanya: campanya_id, torn: element, isNew: 0 }}">Torn {{element}}</router-link></div>
                        <div v-for="e in grouped_display[element]">
                            <div>{{e.bandoA.name}}::{{e.bandoA.punts}}::{{batalles[e.id_batalla].name}}::{{e.bandoB.punts}}::{{e.bandoB.name}}</div>
                        </div>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios';

export default {
    name: 'campanya',
    components: {
      draggable,
    },
    data: function(){
        return{
            enabled: true,
            nom: '', 
            torns: null, 
            torns_jugats: [],

            grouped_display: [],
            isCalculat: false,
            punts_bando_A: 0,
            punts_bando_B: 0,
            maxs: [],
            campanya_id: 10,
            
            bando_A: [],
            bando_B: [],
            users:[
                /*{ name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 },
                { name: "Maria", id: 3 },
                { name: "Paula", id: 4 },
                { name: "Montse", id: 5 }*/
            ],
            batalles:[
                {name: "Bienes de valor", id: 0},
                {name: "Reclamar el territorio", id: 1},
                {name: "Festines y saqueos", id: 2},
                {name: "Una historia de desafíos", id: 3},
                {name: "¡Emboscada!", id: 4},
                {name: "Mantener el botín", id: 5},
                {name: "Desacratización", id: 6},
                {name: "Vieja disputa", id: 7},
                {name: "El cruce", id: 8},
                {name: "Cambio de planes", id: 9},
            ],
            dragging: false,
            nRondes: null,
            punts:[],
        }
    },
    computed: {
        isOrdered(){
            return (this.ordered.length > 0) ? true : false;
        },

    },
    methods: {
        checkMove: function(e) {
            console.log("Future index: " + e.draggedContext);
            console.log(e.draggedContext);
        },
        guardar(){
            console.log(this.bando_A, this.bando_B);
            console.log(this.nom, this.nRondes);
        },
        calculs(){
            let self = this;
            let pa = 0;
            let pb = 0;
            for (const f of this.torns_jugats){
                self.punts_bando_A = self.punts_bando_A + parseInt(f.bandoA.punts);
                self.punts_bando_B = self.punts_bando_B + parseInt(f.bandoB.punts);
            }

            const byUserA = Object.groupBy(this.torns_jugats, ({bandoA}) => bandoA.name);
            this.maxs.push(this.calculBando(byUserA, 'bandoA'));
            const byUserB = Object.groupBy(this.torns_jugats, ({bandoB}) => bandoB.name);
            console.log(byUserB);
            this.maxs.push(this.calculBando(byUserB, 'bandoB'));
            this.isCalculat = true;


        },
        calculBando(byUser, bando){
            let jugador_bando_A = '';
            let max_bando_A = 0;
                //console.log(byUser);
            for (const f of Object.keys(byUser)){
                //console.log(f, byUser[f]);
                let temp = 0;
                for (const ff of byUser[f]){
                    temp = temp + (ff[bando]['punts'] * 1);
                }
                console.log(f,temp);
                if (temp > max_bando_A){
                    jugador_bando_A = f;
                    max_bando_A = temp;
                }
                //console.log(jugador_bando_A, max_bando_A);
            }
            return {'jugador': jugador_bando_A, 'punts': max_bando_A} ;
        },
    },
    async created() {
      const posts = await axios.get(`https://historic.irregularesplanb.com/php/getControntacioByCampanyaId.php?id=10`)
      if (posts.data) {
        console.log(posts.data);
        this.nom = posts.data.campanya;
        this.torns = posts.data.torns;
        this.torns_jugats = posts.data.confrontacions;

        this.grouped_display = Object.groupBy(posts.data.confrontacions, ({ torn }) => torn);
        console.log(this.grouped_display);
        this.calculs();
      }
    },
    mounted: function(){
        console.log("CAMPANYA!!");
        let self = this;
        /*let order = this.torns_jugats.sort(function(a,b){
            if (a.torn < b.torn){
                return -1;
            } else if (a.torn > b.torn){
                return 1;
            } else {
                return (a.idx < b.idx) ? -1 : 1;
            }
            
        });
        const grouped = Object.groupBy(order, ({ torn }) => torn);

        for (const k in Object.keys(grouped)){
            self.ordered.push(grouped[k]);
        }

        // Punts per banda
        let punts_bando_A = 0;
        let punts_bando_B = 0;
        for (const o of order){
            punts_bando_A = punts_bando_A + o.punts_bando_A;
            punts_bando_B = punts_bando_B + o.punts_bando_B;
        }
        this.punts_bando_A = punts_bando_A;
        this.punts_bando_B = punts_bando_B;

        let jugador_bando_A = 1;
        let max_bando_A = 0;
        let jugador_bando_B = 1;
        let max_bando_B = 0;
        const byUserA = Object.groupBy(order, ({bando_A}) => bando_A);
        
        for (const f of Object.keys(byUserA)){
            let temp = 0;
            let tempB = 0;
            for (const ff of byUserA[f]){
                temp = temp + ff.punts_bando_A;
            }
            if (temp > max_bando_A){
                jugador_bando_A = byUserA[f][0]['bando_A'];
                max_bando_A = temp;
            }
        }
        this.jugador_bando_A = jugador_bando_A;
        this.max_bando_A = max_bando_A;

        const byUserB = Object.groupBy(order, ({bando_B}) => bando_B);
        for (const f of Object.keys(byUserB)){
            let temp = 0;
            for (const ff of byUserB[f]){
                temp = temp + ff.punts_bando_B;
            }
            if (temp > max_bando_B){
                jugador_bando_B = byUserA[f][0]['bando_B'];
                max_bando_B = temp;
            }
        }
        this.jugador_bando_B = jugador_bando_B;
        this.max_bando_B = max_bando_B;      
        */  
    }
}
</script>

<style lang="scss">
@import "./scss/estil.scss";

.bandoA .tarja.selected {
    margin-right: 0;
    border-color:green;
    border-right-width: 0;
}
.misio .tarja {
    padding-top: 7px;
    padding-bottom: 7px;
    &.selected {
        margin-right: 0;
        margin-left: 0;
        border-color: green;
        border-right-width: 0;
        border-left-width: 0;
    }

    &.columns.is-gapless {
        margin-bottom: 5px !important;
    }
}
.bandoB .tarja.selected {
    margin-left: 0;
    border-color:green;
    border-left-width: 0;
}
.tarja {
    text-align: center;
    padding: 10px 20px;
    border: 1px solid red;
    margin-top: 5px;
    &:first-child{
        margin-top: 0;
    }
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group{
    padding-top:30px;
}

.bandoA {
    .tarja {
        margin-right: 0.75rem;
    }
}
.misio {
    .tarja {
        margin-right: 0.75rem;
        margin-left: 0.75rem;

        input {
            text-align: center;
        }
    }
}
.bandoB {
    .tarja {
        margin-left: 0.75rem;
    }
}

.botons {
    .boto {
        padding: 3px 0;
        text-align: left;
        margin-left: 0.75rem;
        margin-bottom: 5px;
        &:last-child{
            margin-bottom: 0;
        }
        .button{
            margin-bottom: 0;
        }
    }
}
</style>

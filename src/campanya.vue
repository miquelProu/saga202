<template>
    <section>
        <div clqss="container" style="margin-bottom:40px;">
            <div class="title cinzel-regular">Campanya: {{nom}}</div> 
            <div class="title cinzel-regular">Bando A: {{punts_bando_A}} Bando B: {{punts_bando_B}}</div>
            <div class="title cinzel-regular">Generals: Bando A: {{users[jugador_bando_A].name}} {{max_bando_A}} Bando B: {{users[jugador_bando_B].name}} {{max_bando_B}}</div>
        </div>
        <div class="container">
            <div class="columns" v-if="isOrdered">
                <div class="column is-4" v-for="(element, idx) in ordered">
                        <div class="title">Ronda {{idx + 1}}</div>
                        <div v-for="e in element">
                            <div>{{buscarUsers(e.bando_A)}}::{{e.punts_bando_A}}::{{buscarBatalla(e.batalla)}}::{{e.punts_bando_B}}::{{buscarUsers(e.bando_B)}}</div>
                        </div>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: 'campanya',
    components: {
      draggable,
    },
    data: function(){
        return{
            enabled: true,
            nom: 'kill em all', 
            torns: 5, 
            ordered: [],
            punts_bando_A: 0,
            punts_bando_B: 0,
            jugador_bando_A: 0,
            max_bando_A: 0,
            jugador_bando_B: 0,
            max_bando_B: 0,
            generals: [
               { name: "John", id: 0 },
               { name: "Joao", id: 1 },
               { name: "Jean", id: 2 },
               { name: "Maria", id: 3 },
               { name: "Paula", id: 4 },
               { name: "Montse", id: 5 }
            ],
            torns_jugats: [
                {
                    idx: 0, 
                    bando_A: 0, //id user 
                    batalla: 0, //id batalla 
                    bando_B: 3, // id user
                    punts_bando_A: 12,
                    punts_bando_B: 15,
                    torn: 0,
                    isFinal: false,
                },
                {
                    idx: 1, 
                    bando_A: 1, //id user 
                    batalla: 1, //id batalla 
                    bando_B: 4, // id user
                    punts_bando_A: 9,
                    punts_bando_B: 15,
                    torn: 0,
                    isFinal: false,
                },
                {
                    idx: 2, 
                    bando_A: 2, //id user 
                    batalla: 2, //id batalla 
                    bando_B: 5, // id user
                    punts_bando_A: 17,
                    punts_bando_B: 12,
                    torn: 0,
                    isFinal: false,
                },

                {
                    idx: 0, 
                    bando_A: 2, //id user 
                    batalla: 6, //id batalla 
                    bando_B: 3, // id user
                    punts_bando_A: 12,
                    punts_bando_B: 15,
                    torn: 1,
                    isFinal: false,
                },
                {
                    idx: 1, 
                    bando_A: 1, //id user 
                    batalla: 1, //id batalla 
                    bando_B: 5, // id user
                    punts_bando_A: 9,
                    punts_bando_B: 15,
                    torn: 1,
                    isFinal: false,
                },
                {
                    idx: 2, 
                    bando_A: 0, //id user 
                    batalla: 2, //id batalla 
                    bando_B: 4, // id user
                    punts_bando_A: 17,
                    punts_bando_B: 12,
                    torn: 1,
                    isFinal: false,
                },

                {
                    idx: 0, 
                    bando_A: 0, //id user 
                    batalla: 8, //id batalla 
                    bando_B: 3, // id user
                    punts_bando_A: 12,
                    punts_bando_B: 15,
                    torn: 2,
                    isFinal: false,
                },
                {
                    idx: 1, 
                    bando_A: 1, //id user 
                    batalla: 9, //id batalla 
                    bando_B: 4, // id user
                    punts_bando_A: 9,
                    punts_bando_B: 15,
                    torn: 2,
                    isFinal: false,
                },
                {
                    idx: 2, 
                    bando_A: 2, //id user 
                    batalla: 10, //id batalla 
                    bando_B: 5, // id user
                    punts_bando_A: 17,
                    punts_bando_B: 12,
                    torn: 2,
                    isFinal: false,
                },
            ],
            bando_A: [],
            bando_B: [],
            users:[
                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 },
                { name: "Maria", id: 3 },
                { name: "Paula", id: 4 },
                { name: "Montse", id: 5 }
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
        buscarUsers(id){
            for (const u of this.users) {
                if (u.id == id){
                    return u.name;
                }
            }   
        },
        buscarBatalla(id){
            for (const u of this.batalles) {
                if (u.id == id){
                    return u.name;
                }
            }   
        },
    },
    mounted: function(){
        console.log("CAMPANYA!!");
        let self = this;
        let order = this.torns_jugats.sort(function(a,b){
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

        let jugador_bando_A = 0;
        let max_bando_A = 0;
        let jugador_bando_B = 0;
        let max_bando_B = 0;
        const byUserA = Object.groupBy(order, ({bando_A}) => bando_A);
        for (const f of Object.keys(byUserA)){
            let temp = 0;
            let tempB = 0;
            for (const ff of byUserA[f]){
                temp = temp + ff.punts_bando_A;
            }
            if (temp > max_bando_A){
                jugador_bando_A = f;
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
                jugador_bando_B = f;
                max_bando_B = temp;
            }
        }
        this.jugador_bando_B = jugador_bando_B;
        this.max_bando_B = max_bando_B;        
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

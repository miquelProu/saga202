<template>
    <section class="campanya">
        <div class="container " style="margin-bottom:40px;">
            <div class="cinzel-regular title is-size-4 has-text-centered"><span class="is-size-2">{{getCampanyaActual.nom}}</span></div>
            <div class="cinzel-regular title is-size-4 has-text-centered">Puntuació</div>
            <div class="columns cinzel-regular is-mobile  is-hidden-tablet">
                <div class="column is-6 ">
                    <div class="columns">
                        <div class="column">
                            <div class="has-text-centered">
                              <p class="heading">Bando A</p>
                              <p class="title irrpb">{{punts_bando_A}}</p>
                            </div>
                        </div>
                        <div class="column">
                            <div class=" has-text-centered">
                              <p class="heading">General Bando A</p>
                              <p class="title  is-size-3"><span class="is-size-5">{{maxs[0]['jugador']}}</span> {{maxs[0]['punts']}}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="column is-6">
                    <div class="columns">
                        <div class="column">
                            <div class=" has-text-centered">
                              <p class="heading">Bando B</p>
                              <p class="title irrpb">{{punts_bando_B}}</p>
                          </div>
                        </div>
                        <div class="column">
                            <div class=" has-text-centered">
                              <p class="heading">General Bando B</p>
                              <p class="title is-size-3"><span class="is-size-5">{{maxs[1]['jugador']}}</span> {{maxs[1]['punts']}}</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="level cinzel-regular is-hidden-mobile">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">General Bando A</p>
                  <p class="title is-size-3"><span class="is-size-5">{{maxs[0]['jugador']}}</span> {{maxs[0]['punts']}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Bando A</p>
                  <p class="title irrpb">{{punts_bando_A}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Bando B</p>
                  <p class="title irrpb">{{punts_bando_B}}</p>
                </div>
              </div>

              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">General Bando B</p>
                  <p class="title is-size-3"><span class="is-size-5">{{maxs[1]['jugador']}}</span> {{maxs[1]['punts']}}</p>
                </div>
              </div>
            </nav>
            <div class="content has-text-centered"><button class="button is-primary is-outlined is-medium noutorn"><router-link active-class="link-torn" :to="{ name: 'confrontacions', params: { campanya_id: campanya_id, torn: Object.keys(grouped_display).length + 1}}">Nou torn</router-link></button></div>
        </div>
        <div class="container confrontacions">
            <div class="columns is-multiline">
                <div class="column" v-for="element in Object.keys(grouped_display)">
                    <table class="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <td colspan="5" class="has-text-centered">
                                <router-link :to="{ name: 'confrontacions', params: { campanya_id: campanya_id, torn: element} }">Torn {{element}}</router-link>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in grouped_display[element]">
                                <td v-if="e.isFinal == 1">{{e.bandoA.name}}</td>
                                <td v-if="e.isFinal == 1">{{e.bandoA.punts}} </td>
                                <td v-if="e.isFinal == 1" class="has-text-centered">{{batalles[e.id_batalla].name}}</td>
                                <td v-if="e.isFinal == 1" class="has-text-right">{{e.bandoB.punts}}</td>
                                <td v-if="e.isFinal == 1" class="has-text-right">{{e.bandoB.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

/**
 * TODO: Mirar si el getUsuarisByCampanyaIdFromDB del final de la carrega servei per algo
 * o ens apanyem amb el que ja tenim. Els users han de venir de les confrontacions, i sinó
 * n'hi han, no els calen els noms aquí
 * */

export default {
    name: 'campanya',
    components: {
    },
    data: function(){
        return{
            torns: null,

            grouped_display: [],
            isCalculat: false,
            punts_bando_A: 0,
            punts_bando_B: 0,
            maxs: [{jugador: '', punts: null},{jugador: '', punts: null}],
            campanya_id: null,

            bando_A: [],
            bando_B: [],
            batalles:[
                {name: "Bienes de valor", id: 0, joc: 'saga'},
                {name: "Reclamar el territorio", id: 1, joc: 'saga'},
                {name: "Festines y saqueos", id: 2, joc: 'saga'},
                {name: "Una historia de desafíos", id: 3, joc: 'saga'},
                {name: "¡Emboscada!", id: 4, joc: 'saga'},
                {name: "Mantener el botín", id: 5, joc: 'saga'},
                {name: "Desacratización", id: 6, joc: 'saga'},
                {name: "Vieja disputa", id: 7, joc: 'saga'},
                {name: "El cruce", id: 8, joc: 'saga'},
                {name: "Cambio de planes", id: 9, joc: 'saga'},
                {name: "¡Esta es mi tierra!", id: 10, joc: 'clash'},
                {name: "Forrajeo", id: 11, joc: 'clash'},
                {name: "Exploración previa a la batalla", id: 12, joc: 'clash'},
                {name: "Proyección de fuerza", id: 13, joc: 'clash'},
                {name: "Rescate", id: 14, joc: 'clash'},
            ],
            nRondes: null,
            punts:[],
            mans_usual: 0,
        }
    },
    watch: {
        $route(to, from) {
      // react to route changes...
            console.log(to, from);
            this.campanya_id =  this.$route.params.id;
            this.start();

        }
    },
    computed: {
        ...mapGetters({
            getConfrontacions: 'getConfrontacions',
            getCampanyaActual:'getCampanyaActual',
            getUsersByCampanyaActual: 'getUsersByCampanyaActual',
        }),
    },
    methods: {
        ...mapActions({
            getConfrontacionsByCampanyaIdFromDB: 'getConfrontacionsByCampanyaIdFromDB',
            getUsuarisByCampanyaIdFromDB: 'getUsuarisByCampanyaIdFromDB',
        }),
        calculs(){
            let self = this;
            for (const f of this.getConfrontacions){
                self.punts_bando_A = self.punts_bando_A + parseInt(f.bandoA.punts);
                self.punts_bando_B = self.punts_bando_B + parseInt(f.bandoB.punts);
            }

            this.maxs = [];
            const byUserA = Object.groupBy(this.getConfrontacions, ({bandoA}) => bandoA.name);
            this.maxs.push(this.calculBando(byUserA, 'bandoA'));
            const byUserB = Object.groupBy(this.getConfrontacions, ({bandoB}) => bandoB.name);
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
        start(){
            let self = this;
            this.getConfrontacionsByCampanyaIdFromDB(this.campanya_id).then(()=>{
            console.log("GET CONFRONTACIONS FROM DB TROUGHT THE STORE", self.getConfrontacions);

            console.log("campanya actual", self.getCampanyaActual);
            console.log("campanya actual confrontacions", self.getConfrontacions);

            if (self.getConfrontacions.length > 0) {
                self.grouped_display = Object.groupBy(self.getConfrontacions, ({ torn }) => torn);
                console.log(this.grouped_display);

                let t = Object.keys(this.grouped_display);
                //self.mans_usual = self.grouped_display[t[0]].length;
                //console.log("MAns USUAL", self.mans_usual);
            } else {
                self.grouped_display = [];
            }
            this.isCalculat = false;
            this.punts_bando_A = 0;
            this.punts_bando_B = 0;
            this.maxs = [];
            self.calculs();
        });

        this.getUsuarisByCampanyaIdFromDB(this.campanya_id).then(()=>{
            console.log("GET USUARIS BY CAMPANYA ID FROM DB TROUGHT THE STORE", self.getUsersByCampanyaActual);
        });
        },
    },
    mounted: function(){
        let self = this;
        console.log("CAMPANYA!!",this.$route);
        this.campanya_id =  this.$route.params.id;

        this.start();

    }
}
</script>

<style lang="scss">
@import "./scss/estil.scss";

.campanya {
    .title a {
        color: #f1592a;
    }


    .title.irrpb {
        color: #f1592a;
    }

    button.noutorn {
        &:hover a {
            color: white;
        }

        a {
            color: #f1592a;
            font-weight: bold;;

        }
    }

    .bandoA .tarja.selected {
        margin-right: 0;
        border-color: green;
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
        border-color: green;
        border-left-width: 0;
    }

    .tarja {
        text-align: center;
        padding: 10px 20px;
        border: 1px solid $irrpb;
        margin-top: 5px;

        &:first-child {
            margin-top: 0;
        }
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .campanya .list-group {
        padding-top: 30px;
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

            &:last-child {
                margin-bottom: 0;
            }

            .button {
                margin-bottom: 0;
            }
        }
    }

    .confrontacions {
        table thead tr td a {
            color: $irrpb;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
}
</style>

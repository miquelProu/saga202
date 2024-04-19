<template>
     <section class="confrontacio">
          <div class="container">
              <div class="columns is-gapless">
                  <div class="column is-9">
                    <div class="title cinzel-regular">Confrontacións torn {{ torn }} campanya {{ getCampanyaActual.nom }} </div>
                  </div>
              </div>
          </div>

        <div class="container">
            <div class="columns is-gapless">
                <div class="column is-2 bandoA">
                    <draggable
                        :list="bando_A"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" :class="isSelected('bando_A', element.id)" v-for="element in bando_A" :key="element.id">
                            <div>{{ element.name }}</div>
                        </div>
                    </draggable>
                </div>
                <div class="column is-5 misio">
                    <draggable
                        :list="batalles_selected"
                        group="batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja columns is-gapless" :class="isSelected('batalla', element.id)" v-for="(element,idx) in batalles_selected" :key="element.id">
                            <div class="column one-three-fifths">
                                    <div class="field" v-if="existControntacio(idx)">
                                        <p class="control">
                                            <input
                                            class="input is-small"
                                            type="text"
                                            placeholder="0"
                                            v-model="confrontacions[modeel(idx)].punts_bando_A"
                                            :disabled="isDisabled(idx, 'final')">
                                        </p>
                                    </div>
                            </div>
                            <div class="column is-three-fifths">{{ element.name }}</div>
                            <div class="column one-three-fifths">
                                <div class="field "  v-if="existControntacio(idx)">
                                        <p class="control">
                                            <input class="input is-small" type="text" placeholder="0"
                                            v-model="confrontacions[modeel(idx)].punts_bando_B"
                                            :disabled="isDisabled(idx, 'final')">
                                        </p>
                                </div>
                            </div>
                        </div>
                    </draggable>
                </div>
                <div class="column is-2 bandoB">
                    <draggable
                        :list="bando_B"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" :class="isSelected('bando_B', element.id)" v-for="element in bando_B" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
                <div class="column is-3 botons" style="margin-top:30px;">
                    <div class="boto buttons" v-for="(element,idx) in bando_A" :key="idx">
                        <button class="button" @click="tancar(idx)" :disabled="isDisabled(idx, 'tancar')">
<!--                            <span class="icon">
                              <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
                            </span>-->
                            <span>Tancar</span>
                        </button>
                        <button class="button" @click="final(idx)" :disabled="isDisabled(idx, 'final')">
<!--                            <span class="icon">
                              <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
                            </span>-->
                            <span>Final</span>
                        </button>
                    </div>

                </div>
            </div>
            <div class="columns">
                <div class="column is-4" style="height: 80px;">
                    <div class="colonna has-text-centered" style="font-size: 65px;margin-top: -10px;">SAGA</div>
                </div>
                <div class="column is-4 is-offset-1" style="height: 80px;">
                    <div class="windlass has-text-centered" style="font-size: 40px;">CLASH OF SPEARS</div>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-4 misio-seleccio">
                    <draggable
                        :list="selectBatallesByJoc('saga')"
                        group="batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in selectBatallesByJoc('saga')" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
                <div class="column is-4 is-offset-1 misio-seleccio">
                    <draggable
                        :list="selectBatallesByJoc('clash')"
                        group="batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in selectBatallesByJoc('clash')" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
            </div>
        </div>
      <router-view></router-view>
          </section>

</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";

/**
 * TODO: Mirar de no portar una dobla contabilitat de les contrntacions,
 * a la store i al component i gesionar-ho tot des de la store
 * */

export default {
    name: 'confrontacions',
    components: {
      draggable,
    },
    data: function(){
        return{
            enabled: true,
            bando_A: [
/*                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 }
*/            ],
            bando_B: [
/*                { name: "Maria", id: 3 },
                { name: "Paula", id: 4 },
                { name: "Montse", id: 5 }
*/            ],
            batalles_selectables:[
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
            batalles_selected:[],
            confrontacions:[],
            dragging: false,
            last_ID_salvat: 0,
            torn: 0,
        }
    },
    computed: {
        ...mapGetters({
            getConfrontacionsByTorn: 'getConfrontacionsByTorn',
            getCampanyaActual: 'getCampanyaActual',
            getUsersByCampanyaActual: 'getUsersByCampanyaActual',
        }),
    },
    methods: {
        ...mapActions({
            setConfrontacioTorn: 'setConfrontacioTorn',
            pushConfrontacio: 'pushConfrontacio',
            getUsersFromDB: 'getUsersFromDB',
            finalizeConfrontacioById: 'finalizeConfrontacioById',
        }),
        getUserById(id){
            return this.getUsersByCampanyaActual.filter((obj) => {return obj.id_usuari === id + ''});
        },
        selectBatallesByJoc(joc){
            return this.batalles_selectables.filter(function( obj ) {
                return obj.joc === joc ;
            });
        },
        modeel(idx){
            let temp = 0;
            let count = 0;

            for (const conf of this.confrontacions) {
                    if (conf.idx == idx){
                        temp = count;
                    }
                    count++;
            }
            return temp;
        },
        checkMove: function(e) {
            //console.log("Future index: " + e);
            //console.log(e, Object.keys(e)[0]);
            if (Object.keys(e)[0] === "added") {
                console.log("ADDED", e.added.element.id);
                this.batalles_selectables = this.extractRepetits(this.batalles_selectables, e.added.element.id)
            }
        },
        tancar: function(id) {
            //L' Apunto al component
            this.confrontacions.push({
                idx: id,
                bando_A: this.bando_A[id].id,
                batalla: this.batalles_selected[id].id,
                bando_B: this.bando_B[id].id,
                punts_bando_A: null,
                punts_bando_B: null,
                torn: this.torn,
                isFinal: false,
                id: 0,
            });
            console.log("CONFRONTACIONS", this.confrontacions);

            //L'Apunto a la BBDD
            let params = {
                'id_campanya': this.$route.params.campanya_id,
                'id_usuari_A': this.bando_A[id].id,
                'id_batalla': this.batalles_selected[id].id,
                'id_usuari_B': this.bando_B[id].id,
                'nPunts_A': 0,
                'nPunts_B': 0,
                'nTorn': this.torn,
                'isFinal': 0,
            };
            this.setTancar(params, id);


        },
        async setTancar(params, id){
            let self = this;
            let text = '?';
            for (const f of Object.keys(params)){
                text = text + '&' + f + '=' + params[f];
            }

            const posts = await axios.get(`https://historic.irregularesplanb.com/php/setControntacio.php`+text);
            if (posts.data) {
                console.log("TANCAT I GUARDAT", posts.data);
                this.last_ID_salvat = posts.data;
                let self = this;
                for (const f of this.confrontacions){
                    if (f.idx == id){
                        f.id = posts.data;
                    }
                }

            //L'Apunto al Vuex
                let confrVuex = {
                    torn: this.torn,
                    isFinal: "0",
                    id: posts.data,
                    id_batalla: this.batalles_selected[id].id,
                }
                let bandoAtemp = this.getUserById(this.bando_A[id].id);
                console.log(bandoAtemp);
                let bandoA = bandoAtemp[0];
                console.log(bandoA);
                confrVuex['bandoA'] = {id: bandoA.id_usuari, name: bandoA.nom, punts: bandoA.punts};
                let bandoBtemp = this.getUserById(this.bando_B[id].id);
                let bandoB = bandoBtemp[0];
                confrVuex['bandob'] = {id: bandoB.id_usuari, name: bandoB.nom, punts: bandoB.punts};


                this.pushConfrontacio(confrVuex);

            }
        },
        final(idx){
            let id = 0;
            let pA = 0;
            let pB = 0;


            for (const conf of this.confrontacions) {
                if (conf.idx == idx){
                    conf.isFinal = true;
                    id = parseInt(conf.id);
                    pA = parseInt(conf.punts_bando_A);
                    pB = parseInt(conf.punts_bando_B);
                }
            }

            this.setFinal(id, pA, pB);
            this.finalizeConfrontacioById({id: id, pA: pA, pB: pB});
        },
        async setFinal(id, pA, pB){
            const posts = await axios.get('https://historic.irregularesplanb.com/php/updateConfrontacioFinal.php?id='+id+'&pA='+pA+'&pB='+pB);
            if (posts.data) {
                console.log("UPDATE FINAL!!", posts.data);
            }
        },
        isSelected: function(banda, id){
            let self = this;
            let temp = false;

            for (const conf of this.confrontacions) {
                if (conf[banda] == id){
                    //console.log(conf,banda, id);
                    temp = true;
                }
            }

            return (temp) ? 'selected' : '';
        },
        isDisabled: function(id, boto){
            let self = this;
            let temp = false;

            if (boto == 'tancar'){
                for (const conf of this.confrontacions) {
                    if (conf.idx == id){
                        //console.log('DISABLED', id);
                        temp = true;
                    }
                }
            } else if(boto == 'final'){
                for (const conf of this.confrontacions) {
                    if (conf.idx == id && conf.isFinal){
                        //console.log('DISABLED', id);
                        temp = true;
                    }
                }
            }

            return temp;
        },
        existControntacio(id){
            let self = this;
            let temp = false;

            for (const conf of this.confrontacions) {
                if (conf.idx == id){
                    //console.log('DISABLED', id);
                    temp = true;
                }
            }

            return temp;
        },
        extractRepetits(coleccio, id, nom = "id"){
            coleccio = coleccio.filter(function( obj ) {
                //console.log(obj[nom], id);
                return obj[nom] !== id ;
            });
            //console.log("EXTREURE", coleccio);
            return coleccio;
        },
        convertConfrontacionsVuexConfrontacions(){
            // Amotllem les confrontacions de la BBDD a l'estructura del component
            let self = this;
            for (const [idx, f] of this.getConfrontacionsByTorn.entries()){
                self.bando_A.push({id: f.bandoA.id, name: f.bandoA.name});
                self.bando_B.push({id: f.bandoB.id, name: f.bandoB.name});
                let batalla = self.findBatallaById(f.id_batalla * 1);
                self.batalles_selected.push(batalla);

                self.confrontacions.push({
                    idx: idx,
                    bando_A: f.bandoA.id,
                    batalla: f.id_batalla,
                    bando_B: f.bandoB.id,
                    punts_bando_A: (f.bandoA.punts == 0) ? null : f.bandoA.punts,
                    punts_bando_B: (f.bandoB.punts == 0) ? null : f.bandoB.punts,
                    torn: self.torn,
                    isFinal: (f.isFinal == "1") ? true: false,
                    id: f.id,
                });
            }
            // EN tots els casos esborrem dels selectables les batelles escollides
            for (const f of this.getConfrontacionsByTorn){
                self.batalles_selectables = self.extractRepetits(self.batalles_selectables, f.id_batalla * 1);
            }

            // Si no esta el torn ple, afegim els usuaris sense confrontacio
            if (this.getConfrontacionsByTorn.length !== this.getUsersByCampanyaActual.length / 2){
                let bandoA = this.getUsersByCampanyaActual.filter((obj) => { return obj.bando == "0" });
                for (const f of this.bando_A) {
                    bandoA = this.extractRepetits(bandoA, f.id + "", "id_usuari");
                }
                for (const f of bandoA){
                    self.bando_A.push({id: f.id_usuari, name: f.nom});
                }
                console.log("BANDO A: FILTERED", bandoA);

                let bandoB = this.getUsersByCampanyaActual.filter((obj) => { return obj.bando == "1" });
                for (const f of this.bando_B) {
                    bandoB = this.extractRepetits(bandoB, f.id + "", "id_usuari");
                }
                for (const f of bandoB){
                    self.bando_B.push({id: f.id_usuari, name: f.nom});
                }
                console.log("BANDO B: FILTERED", bandoB);

            }

        },
        findBatallaById(id){
            let self = this;
            for (const ff of this.batalles_selectables){
                if (ff.id == id){
                    return ff;
                }
            }
        },
    },
    mounted: function(){
        console.log(this.$route.params.campanya_id), this.$route.params.torn;
        this.torn = this.$route.params.torn;
        this.setConfrontacioTorn(this.torn);
        console.log(this.getConfrontacionsByTorn);
        this.convertConfrontacionsVuexConfrontacions();
        //this.getUsersFromDB();
        console.log("CAMPANYA ACTUAL", this.getCampanyaActual);
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
.confrontacio .misio .tarja {
    padding-top: 10px;
    padding-bottom: 10px;
    &.selected {
        margin-right: 0;
        margin-left: 0;
        border-color: green;
        border-right-width: 0;
        border-left-width: 0;
        padding-top: 7px;
        padding-bottom: 7px;
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
    padding: 10px 20px;
    border: 1px solid $irrpb;
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

.misio-seleccio .list-group{
    padding-top: 0;
}

.bandoA {
    .tarja {
        margin-right: 0.75rem;
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

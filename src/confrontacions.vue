<template>
     <section class="confrontacio">
          <div class="container" style="margin-bottom: 30px;">
              <div class="columns is-gapless">
                  <div class="column is-9">
                      <div class="title cinzel-regular has-text-centered is-size-4">{{ getCampanyaActual.nom }} <span class="is-size-3">Torn {{ torn }}</span></div>
                  </div>
              </div>
          </div>

        <div class="container">
            <div class="columns acabat is-gapless is-mobile" v-for="(element, idx) in getConfrontacionsByTornAcabades" :key="element.id"">
                <div class="column is-2-tablet is-2-mobile bandoA">
                    <div class="tarja nodrag" :class="isSelected('bandoA', element.id, idx)">
                        <div>{{ element.bandoA.name }}</div>
                    </div>
                </div>
                <div class="column is-5 missio">
                    <div class="columns">
                        <div class="column is-one-fifth has-text-centered">
                            <span class="is-size-7 pr-2 has-text-weight-bold">{{element.bandoA.puntuacio}}</span>
                            <span class="is-size-7 pr-2 has-text-weight-bold">{{element.bandoA.punts}}</span>
                        </div>
                        <div class="column is-three-fifths has-text-centered" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" :title="element.name">{{ getBatallaNomByIdBatalla(element.id_batalla) }}</div>
                        <div class="column is-one-fifth has-text-centered">
                            <span class="is-size-7 pr-2 has-text-weight-bold">{{element.bandoB.punts}}</span>
                            <span class="is-size-7 pr-2 has-text-weight-bold">{{element.bandoB.puntuacio}}</span>
                        </div>
                    </div>
                </div>
                <div class="column is-2-tablet is-2-mobile bandoA">
                    <div class="tarja nodrag" :class="isSelected('bandoA', element.id, idx)" >
                        <div>{{ element.bandoB.name }}</div>
                    </div>
                </div>
            </div>
            <div class="columns is-gapless is-mobile">
                <div class="column is-2-tablet is-2-mobile bandoA">
                    <div class="tarja nodrag" :class="isSelected('bandoA', element.id, idx)" v-for="(element, idx) in bandoAColumn" :key="element.id">
                        <div>{{ element.name }}</div>
                    </div>
                    <draggable
                        :list="bando_A"
                        group="users"
                        :disabled="isAllFinal"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" :class="isSelected('bandoA', element.id, idx)" v-for="(element, idx) in bando_A" :key="element.id">
                            <div>{{ element.name }}</div>
                        </div>
                    </draggable>
                </div>
                <div class="column is-5-tablet is-6-mobile misio">

                    <div class="tarja columns is-gapless  is-mobile nodrag"  :class="isSelected('batalla', element.id, idx)" v-for="(element,idx) in batallesColumn" :key="element.id">
                        <div class="column one-three-fifths">
                            <div class="field" v-if="existControntacio(element.id, idx)">
                                <p v-if="showElementBatalla(idx, 'final', 'input-A-pA')" class="control has-text-centered">
                                    <input
                                        class="input is-small has-text-centered"
                                        type="text"
                                        placeholder="Final"
                                        v-model="modell[idx]['A']">
                                </p>
                                <p v-else class="control has-text-centered">
                                    <input
                                        class="input is-small has-text-centered"
                                        type="text"
                                        placeholder="Puntuacio"
                                        v-model="modell[idx]['pA']">
                                </p>
                            </div>
                        </div>

                        <div class="column is-three-fifths" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" :title="element.name"><span v-if="showElementBatalla(idx, 'punts', 'text-A')" class="is-size-7 pr-2 has-text-weight-bold">{{modell[idx]['A']}}</span>{{ element.name }}<span v-if="showElementBatalla(idx, 'punts', 'text-B')" class="is-size-7 pl-2 has-text-weight-bold">{{modell[idx]['B']}}</span></div>

                        <div class="column one-three-fifths">
                            <div class="field "  v-if="existControntacio(element.id, idx)">
                                <p  v-if="!showElementBatalla(idx, 'final', 'input-pB-B')" class="control has-text-centered">
                                    <input class="input is-small has-text-centered" type="text" placeholder="Puntuacio"
                                           v-model="modell[idx]['pB']">
                                </p>
                                <p v-else class="control has-text-centered">
                                    <input class="input is-small has-text-centered" type="text" placeholder="Final"
                                           v-model="modell[idx]['B']">
                                </p>
                            </div>
                        </div>
                    </div>
                    <draggable
                        :list="batalles_selected"
                        :disabled="isAllFinal"
                        group="batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja columns is-gapless  is-mobile"  :class="isSelected('batalla', element.id, idx)" v-for="(element,idx) in batalles_selected" :key="element.id">


                            <div class="column is-three-fifths is-offset-one-fifth" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" :title="element.name">{{ element.name }}</div>


                        </div>
                    </draggable>

                    <div class="tarja columns is-gapless  is-mobile"  :class="isSelected('batalla', element.id, idx)" v-for="(element,idx) in batallesFinalsColumns" :key="element.id">

                        <div class="column is-one-fifth">{{element.bandoA.puntuacio}}::{{element.bandoA.punts}}</div>
                        <div class="column is-three-fifths" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" :title="element.name">{{ element.name }}</div>
                        <div class="column is-one-fifth">{{element.bandoB.punts}}::{{element.bandoB.puntuacio}}</div>
                    </div>


                </div>
                <div class="column is-2-tablet is-2-mobile bandoB">
                    <div class="tarja nodrag" :class="isSelected('bandoB', element.id, idx)" v-for="(element, idx) in bandoBColumn" :key="element.id">{{ element.name }}::{{element.id}}</div>
                    <draggable
                        :list="bando_B"
                        group="users"
                        :disabled="isAllFinal"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" :class="isSelected('bandoB', element.id, idx)" v-for="(element, idx) in bando_B" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>

                <div class="column is-3-tablet is-2-mobile botons" xstyle="margin-top:30px;">


                    <div class="xboto buttons" :class="{'are-small': $mq == 'mobile'}" v-for="(element,idx) in botonsColumnGrabat" :key="idx + 1000">

                        <button
                            v-if = "showBoto(element.id, idx, 'final', 'boto-final')"
                            class="button py-1 mb-0"
                            @click="final(element.id, idx)"
                        >
                            <span class="icon">
                              <svg-icon :size="24" type="mdi" :path="finalIcon"></svg-icon>
                            </span>
                            <span class=" is-hidden-mobile ">Final</span>
                        </button>

                        <button
                            v-else-if="showBoto(element.id, idx, 'punts', 'boto-puntuacio') && !showBoto(element.id, idx, 'puntuat', 'boto-final')"
                            class="button py-1 mb-0"
                            @click="puntuacio(element.id, idx)"
                        >
                            <span class="icon">
                              <svg-icon :size="24" type="mdi" :path="puntsIcon"></svg-icon>
                            </span>
                            <span class=" is-hidden-mobile ">Puntuació {{idx}}</span>
                        </button>
                    </div>




                    <div class="xboto buttons" :class="{'are-small': $mq == 'mobile'}" v-for="(element,idx) in botonsColumn" :key="idx">
                        <button
                            class="button mb-0"
                            @click="tancar(element, idx)"
                        >
                            <span class="icon is-small">
                              <svg-icon :size="24" type="mdi" :path="candau"></svg-icon>
                            </span>
                            <span  class=" is-hidden-mobile ">Tancar</span>
                        </button>
                    </div>

                </div>
            </div>

            <div class="columns mt-6">
                <div class="column is-5-tablet is-offset-2-tablet is-10-mobile is-offset-1-mobile misio-seleccio">
                    <div class="colonna has-text-centered" :class="getCampanyaActual.joc == 'saga' ? 'colonna' : 'windlass'" style="font-size: 65px;margin-top: -10px;text-transform: uppercase;">{{this.getCampanyaActual.joc}}</div>
                    <draggable
                        :list="batalles_selectables"
                        :group="group_batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja has-text-centered" v-for="element in batalles_selectables" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
            </div>
        </div>
  </section>

</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLock, mdiStopCircleOutline, mdiPodiumGold } from '@mdi/js'

import {batallesFile} from "@/batalles";

export default {
    name: 'confrontacions',
    components: {
      draggable,
      SvgIcon,
    },
    data: function(){
        return{
            candau: mdiLock,
            finalIcon: mdiStopCircleOutline,
            puntsIcon: mdiPodiumGold,
            modell: [],
            enabled: true,
            bando_A: [],
            bando_B: [],
            batallesOrig: batallesFile,
            batalles_selectables: [],
            batalles_noms: [],
            batalles_selected:[],
            confrontacions:[],
            dragging: false,
            isAllFinal: false,
            torn: 0,
            group_batalles: null,
        }
    },
    watch: {},
    computed: {
        ...mapGetters({
            getConfrontacionsByTorn: 'getConfrontacionsByTorn',
            getCampanyaActual: 'getCampanyaActual',
            getUsersByCampanyaActual: 'getUsersByCampanyaActual',
            getConfrontacionsByTornAcabades: 'getConfrontacionsByTornAcabades',
        }),
        //Creem llista calenta des de Vuex amb el bando A
        bandoAColumn: function () {
            return this.getConfrontacionsByTorn.map(function (f) {
              return {name:f.bandoA.name, id:f.bandoA.id};
            });
        },
        bandoBColumn: function () {
          return this.getConfrontacionsByTorn.map(function (f) {
              return {name:f.bandoB.name, id:f.bandoB.id};
            });
        },
        botonsColumnGrabat: function(){
            return this.getConfrontacionsByTorn.map(function(f){
                return {id: f.id};
            });
        },
        botonsColumn: function(){
            let ret = [];
            //ret.push(...this.botonsColumnGrabat);
            for (let i =0; i < this.batalles_selected.length; i++) {
                ret.push({id: '99'});
            }
            return ret;
        },
        batallesColumn: function(){
            let self = this;
            let temp = [];
            for (const f of this.getConfrontacionsByTorn){
                for (const x of self.batalles_noms){
                    if (x.id == f.id_batalla && (!('puntuacio' in f.bandoA) || f.bandoA.puntuacio === null)){
                        temp.push(x);
                    }
                }
            }
            return temp;
        },
        batallesFinalsColumns: function(){
            let self = this;
            let temp = [];
            for (const f of this.getConfrontacionsByTorn){
                for (const x of self.batalles_noms){
                    if (x.id == f.id_batalla && ('puntuacio' in f.bandoA) && f.bandoA.puntuacio !== null){
                        let t = f;
                        t['name'] = x.name
                        temp.push(t);
                    }
                }
            }
            return temp;
        },
    },
    methods: {
        ...mapActions({
            setConfrontacioTorn: 'setConfrontacioTorn',
            pushConfrontacio: 'pushConfrontacio',
            getUsersFromDB: 'getUsersFromDB',
            finalizeConfrontacioById: 'finalizeConfrontacioById',
            puntuaConfrontacioById: 'puntuaConfrontacioById',
            refreshConfrontacionsByTorn: 'refreshConfrontacionsByTorn',
        }),
        getBatallesByJoc(joc) {
            return this.batallesOrig.filter((x) => x.joc == joc);
        },
        selectBatallesByJoc(joc){
            return this.batalles_selectables.filter(function( obj ) {
                return obj.joc === joc ;
            });
        },
        isSelected: function(banda, id, idx){
            let arr = null;
            if (banda != 'batalla'){
                arr = this.getConfrontacionsByTorn.filter((x) => x[banda]['id'] == id);

            } else {
                arr = this.getConfrontacionsByTorn.filter((x) => x['id_batalla'] == id);
            }
            return (!arr.length) ? '' : 'selected';

        },
        getBatallaNomByIdBatalla(id){
            let arr = this.batallesOrig.filter((x) => x['id'] == id);
            return arr[0].name;
        },
        existControntacio(id, idx){
            let arr = this.getConfrontacionsByTorn.filter((x) => x['id_batalla'] == id);
            return (!arr.length) ? false : true;
        },
        showBoto: function(id, idx, boto, origen){
            let temp = false;

            let arr = this.getConfrontacionsByTorn.filter((x) => x['id'] == id);
            if (boto == 'tancar'){
                temp = (arr.length) ? false : true;
            } else if(boto == 'final'){
                temp = (arr.length > 0 && arr[0].isFinal == "0");
            } else if (boto == 'punts'){
                temp = (arr.length > 0 && arr[0].isFinal == "1");
            } else if (boto == 'puntuat'){
                temp = (arr.length > 0 && arr[0].isFinal == "1" && ('puntuacio' in arr[0].bandoA) && arr[0].bandoA.puntuacio !== null);
            }
            console.log("ACTIVA BUTONS");
            console.log(origen, boto);
            console.log(id, temp);
            console.log(arr);
            return temp;
        },
        showElementBatalla(idx, boto, origen){
            //console.log("SHOW ELEMENT BATALLA", idx);
            //console.log(boto, origen);
            let temp = this.showBoto(this.botonsColumnGrabat[idx].id, 0, boto, origen);
            return temp;
        },
        checkMove: function(e) {
            //console.log("Future index: " + e);
            //console.log(e, Object.keys(e)[0]);
            /*if (Object.keys(e)[0] === "added") {
                console.log("ADDED", e.added.element.id);
                console.log("IS REPETIR MISSIO", this.getCampanyaActual.is_repetir_misions);
                if (this.getCampanyaActual.is_repetir_misions == "0") {
                    console.log("ENTER extractRepetits");
                    this.batalles_selectables = this.extractRepetits(this.batalles_selectables, e.added.element.id)
                }
            }*/
        },
        tancar: function(id, idx) {
            console.log("TANCAR", idx);
            //L'Apunto a la BBDD
            let params = {
                'id_campanya': this.$route.params.campanya_id,
                'id_usuari_A': this.bando_A[idx]['id'],
                'id_batalla': this.batalles_selected[idx]['id'],
                'id_usuari_B': this.bando_B[idx]['id'],
                'nPunts_A': 0,
                'nPunts_B': 0,
                'nTorn': this.torn,
                'isFinal': 0,
            };
            this.setTancar(params, idx);
            // Afegeixo a l'array del v-model
            this.modell.push({A:0, B:0});
        },
        async setTancar(params, idx){
            // Faig l'insert i espero el nou id per guardar-ho a la store
            let self = this;
            let text = '?';
            for (const f of Object.keys(params)){
                text = text + '&' + f + '=' + params[f];
            }
            console.log(text);
            //const posts = await axios.get(`https://historic.irregularesplanb.com/php/setControntacio.php`+text);
            const posts = {data: 103+idx+''};
            if (posts.data) {
                console.log("TANCAT I GUARDAT", posts.data);
                let conf = {
                    id: posts.data,
                    id_batalla: this.batalles_selected[idx]['id'],
                    isFinal: "0",
                    torn: this.torn,
                    bandoA: this.bando_A[idx],
                    bandoB: this.bando_B[idx]
                };
                // Esborro la confrontacio que ara guardarem a la store de la llista dels bandos no guardats
                const iddx = this.bando_A.findIndex(function(x){return x.id == self.bando_A[idx]['id']});
                console.log(iddx);
                this.bando_A.splice(iddx, 1);
                const idddx = this.bando_B.findIndex(function(x){return x.id == self.bando_B[idx]['id']});
                this.bando_B.splice(idddx, 1);
                //Esborro de la llista de batallas seleccionades, la que guardem a la store
                const iddddx = this.batalles_selected.findIndex(function(x){return x.id == self.batalles_selected[idx]['id']});
                this.batalles_selected.splice(iddddx, 1);

                //Afegeixo tot l'obejcte confrontacio amb l'Id de l'insert a la store
                this.pushConfrontacio(conf);
            }
        },
        final(id, idx){
            //this.setFinal(id, this.modell[idx]['A'], this.modell[idx]['B']);
            this.finalizeConfrontacioById({id: id, pA: this.modell[idx]['A'], pB: this.modell[idx]['B']});
        },
        async setFinal(id, pA, pB){
            const posts = await axios.get('https://historic.irregularesplanb.com/php/updateConfrontacioFinal.php?id='+id+'&pA='+pA+'&pB='+pB);
            //const posts = {data: "12"};
            if (posts.data) {
                console.log("UPDATE FINAL!!", posts.data);
            }
        },
        puntuacio(id, idx){
            this.puntuaConfrontacioById({id: id, pA:this.modell[idx]['pA'], pB: this.modell[idx]['pB']});
            this.refreshConfrontacionsByTorn();
        },

        extractRepetits(coleccio, id, nom = "id"){
            coleccio = coleccio.filter(function( obj ) {
                //console.log(obj[nom], id);
                return obj[nom] != id ;
            });
            //console.log("EXTREURE", coleccio);
            return coleccio;
        },
    },
    created: function(){
        let self = this;
        this.modell = []
        for (const f of this.getConfrontacionsByTorn){
            // Creo l'array pels v-models
            self.modell.push({A:f['bandoA']['punts'], B:f['bandoB']['punts'], pA:null, pB: null});
        }
    },

/*    bandols: "2"
    id: "32"
    is_repetir_misions: "0"
    joc: "saga"
    nom: "Prova v2 2 bandos"
    torns: "4"
 */
    mounted: function(){
        let self = this;
        console.log(this.$route.params.campanya_id, this.$route.params.torn);
        this.torn = this.$route.params.torn;
        this.setConfrontacioTorn(this.torn);
        console.log("GET CAMPANYA ACTUAL", this.getCampanyaActual);
        console.log("GET CONFRONTACIO BY TORN", this.getConfrontacionsByTorn);

        console.log("GET BATALLES BY JOC", this.getBatallesByJoc(this.getCampanyaActual.joc));
        this.batalles_selectables.push(...this.getBatallesByJoc(this.getCampanyaActual.joc));
        this.batalles_noms.push(...this.getBatallesByJoc(this.getCampanyaActual.joc));

        this.group_batalles = {name: 'batalles', pull: (this.getCampanyaActual.is_repetir_misions == "0") ? true : 'clone'};

        console.log("Creo els models");
        let finalCounter = 0;
        this.modell = [];
        for (const f of this.getConfrontacionsByTorn){
            // Creo l'array pels v-models
            self.modell.push({
                A:(f['bandoA']['punts'] == "0") ? null : f['bandoA']['punts'],
                B:(f['bandoB']['punts'] == "0") ? null : f['bandoB']['punts'],
                pA: null,
                pB: null
            });
            // EN tots els casos esborrem dels selectables les batalles escollides
            self.batalles_selectables = self.extractRepetits(self.batalles_selectables, f.id_batalla);
        }
        // També extrect de les selectables les batalles finlas
         for (const f of this.getConfrontacionsByTornAcabades){
            self.batalles_selectables = self.extractRepetits(self.batalles_selectables, f.id_batalla);
        }


        // Si no esta el torn ple, afegim els usuaris sense confrontacio
        if (this.getConfrontacionsByTorn.length + this.getConfrontacionsByTornAcabades.length !== this.getUsersByCampanyaActual.length / 2){
            console.log("EL TORN NO ÉS PLE");
            let temp = []

            let arr = this.getUsersByCampanyaActual;
            for (const f of this.getConfrontacionsByTorn){
                arr = arr.filter((x) => f.bandoA.id != x.id_usuari);
                arr = arr.filter((x) => f.bandoB.id != x.id_usuari);
            }
            console.log("ARR", arr);
            for (const [idx, f] of arr.entries()){
                if (this.getCampanyaActual.bandols == "2") {

                    if (f.bando == "0" ) {
                        self.bando_A.push({id: f.id_usuari, name: f.nom});
                    } else {
                        self.bando_B.push({id: f.id_usuari, name: f.nom});
                    }
                } else if (this.getCampanyaActual.bandols == "1") {
                    if(idx % 2 == 0){
                        self.bando_A.push({id: f.id_usuari, name: f.nom});
                    } else {
                        self.bando_B.push({id: f.id_usuari, name: f.nom});
                    }
                }
            }

        }
    }
}
</script>

<style lang="scss">
@import "./scss/estil.scss";

.confrontacio {

    .bandoA .tarja {
        text-align: center;

        &.nodrag {
            margin-bottom: 5px;
        }

        &.selected {
            margin-right: 0;
            border-color: green;
            border-right-width: 0;
        }
    }

    .misio .tarja {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;

        &.nodrag {
            margin-bottom: 5px;
        }

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

    .bandoB .tarja {
        text-align: center;

        &.nodrag {
            margin-bottom: 5px;
        }
        &.selected {
            margin-left: 0;
            border-color: green;
            border-left-width: 0;
        }
}

    .tarja {
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

    /*
.list-group{
    padding-top:30px;
}
*/
    .misio-seleccio .list-group {
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


/*    .botons {

        .boto {
            padding: 3px 0;
            text-align: left;
            margin-left: 0.75rem;
            margin-bottom: 5px;

            @include mobile {

            }

            &:last-child {
                margin-bottom: 0;
            }

            .button {
                margin-bottom: 0;
            }
        }
    }*/


    .xboto.buttons {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        margin-bottom: 0.25rem;
        margin-left: 1rem;

        @include mobile {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            margin-left: 0.5rem;
        }

        button span.icon {
            @include mobile {
                margin-right: calc(-0.5em - 1px) !important;
            }
        }
    }
}
</style>

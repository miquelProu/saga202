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
                        <div class="tarja" :class="isSelected('bandoA', element.id, idx)" v-for="(element, idx) in bandoAColumn" :key="element.id">
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
                        <div class="tarja columns is-gapless"  :class="isSelected('batalla', element.id, idx)" v-for="(element,idx) in batallesColumn" :key="element.id">
                            <div class="column one-three-fifths">
                                    <div class="field" v-if="existControntacio(element.id, idx)">
                                        <p class="control">
                                            <input
                                            class="input is-small"
                                            type="text"
                                            placeholder="0"
                                            v-model="modell[idx]['A']"
                                            :disabled="isDisabled(element.id, 'final')">
                                        </p>
                                    </div>
                            </div>
                            <div class="column is-three-fifths">{{ element.name }}</div>
                            <div class="column one-three-fifths">
                                <div class="field "  v-if="existControntacio(element.id, idx)">
                                        <p class="control">
                                            <input class="input is-small" type="text" placeholder="0"
                                            v-model="modell[idx]['B']"
                                            :disabled="isDisabled(element.id, 'final')">
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
                        <div class="tarja" :class="isSelected('bandoB', element.id, idx)" v-for="(element, idx) in bandoBColumn" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
                <div class="column is-3 botons" style="margin-top:30px;">
                    <div class="boto buttons" v-for="(element,idx) in botonsColumn" :key="idx">
                        <button class="button" @click="tancar(element, idx)" :disabled="isDisabled(element.id, 'tancar')">
<!--                            <span class="icon">
                              <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
                            </span>-->
                            <span>Tancar</span>
                        </button>
                        <button class="button" @click="final(element.id, idx)" :disabled="isDisabled(element.id, 'final')">
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
            modell: [],
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
            batalles_noms:[
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
      watch: {
       /* getConfrontacionsByTorn: function (newQuestion, oldQuestion) {
          console.log("WATCH TORNS");
          console.log(newQuestion, oldQuestion);
      },*/
    },
    computed: {
        ...mapGetters({
            getConfrontacionsByTorn: 'getConfrontacionsByTorn',
            getCampanyaActual: 'getCampanyaActual',
            getUsersByCampanyaActual: 'getUsersByCampanyaActual',
        }),
        bandoAColumnGrabat: function () {
            return this.getConfrontacionsByTorn.map(function (f) {
              return {name:f.bandoA.name, id:f.bandoA.id};
            });
        },
        bandoAColumn: function () {
            let ret = []
            ret.push(...this.bandoAColumnGrabat);
            ret.push(...this.bando_A);
            
            return ret;
        },
        bandoBColumnGrabat: function () {
          return this.getConfrontacionsByTorn.map(function (f) {
              return {name:f.bandoB.name, id:f.bandoB.id};
            });
        },
        bandoBColumn: function () {
            let ret = []
            ret.push(...this.bandoBColumnGrabat);
            ret.push(...this.bando_B);
            
            return ret;
        },
        botonsColumnGrabat: function(){
            return this.getConfrontacionsByTorn.map(function(f){
                return {id: f.id};
            });
        },
        botonsColumn: function(){
            let ret = [];
            ret.push(...this.botonsColumnGrabat);
            for (let i =0; i < this.batalles_selected.length; i++) {
                ret.push({id: '99'});
            }
            return ret;
        },
        batallesColumnGrabat: function(){
            let self = this;
            let temp = [];
            for (const f of this.getConfrontacionsByTorn){
                for (const x of self.batalles_noms){
                    if (x.id == f.id_batalla){
                        temp.push(x);
                    }
                }
            }
            return temp;
        },
        batallesColumn: function(){
            let ret = []
            ret.push(...this.batallesColumnGrabat);
            ret.push(...this.batalles_selected);
            
            return ret;
        },

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
        isSelected: function(banda, id, idx){
            let self = this;
            let temp = false;
            let arr = null;
            if (banda != 'batalla'){
                arr = this.getConfrontacionsByTorn.filter((x) => x[banda]['id'] == id);
                
            } else {
                arr = this.getConfrontacionsByTorn.filter((x) => x['id_batalla'] == id);
            }
            return (!arr.length) ? '' : 'selected';
            
        },
        existControntacio(id, idx){
            let arr = this.getConfrontacionsByTorn.filter((x) => x['id_batalla'] == id);
            return (!arr.length) ? false : true;
        },
        isDisabled: function(id, boto){
            let self = this;
            let temp = false;

            let arr = this.getConfrontacionsByTorn.filter((x) => x['id'] == id);
            if (boto == 'tancar'){
                temp = (!arr.length) ? false : true;
            } else if(boto == 'final'){
                temp = (arr.length > 0 && arr[0].isFinal == "1");
            }

            return temp;
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
        tancar: function(id, idx) {
            console.log("TANCAR", idx);
            //L'Apunto a la BBDD
            let params = {
                'id_campanya': this.$route.params.campanya_id,
                'id_usuari_A': this.bandoAColumn[idx]['id'],
                'id_batalla': this.batallesColumn[idx]['id'],
                'id_usuari_B': this.bandoBColumn[idx]['id'],
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
            //console.log(text);
            const posts = await axios.get(`https://historic.irregularesplanb.com/php/setControntacio.php`+text);
            if (posts.data) {
                console.log("TANCAT I GUARDAT", posts.data);
                let conf = {
                    id: posts.data,
                    id_batalla: this.batallesColumn[idx]['id'],
                    isFinal: "0",
                    torn: this.torn,
                    bandoA: this.bandoAColumn[idx],
                    bandoB: this.bandoBColumn[idx]
                };
                // Esborro la confrontacio que ara guardarem a la store de la llista den bandos n o guardats
                const iddx = this.bando_A.findIndex(function(x){return x.id == self.bandoAColumn[idx]['id']});
                console.log(iddx);
                this.bando_A.splice(iddx, 1);
                const idddx = this.bando_B.findIndex(function(x){return x.id == self.bandoBColumn[idx]['id']});
                this.bando_B.splice(idddx, 1);
                //Esborro de la llista de batallas seleccionades la que guardem a la store
                const iddddx = this.batalles_selected.findIndex(function(x){return x.id == self.batallesColumn[idx]['id']});
                this.batalles_selected.splice(iddddx, 1);

                //Afegeixo tot l'obejcte confrontacio amb l'Id de l'insert a la store
                this.pushConfrontacio(conf);
            }
        },
        final(id, idx){
            this.setFinal(id, this.modell[idx]['A'], this.modell[idx]['B']);
            this.finalizeConfrontacioById({id: id, pA: this.modell[idx]['A'], pB: this.modell[idx]['B']});
        },
        async setFinal(id, pA, pB){
            const posts = await axios.get('https://historic.irregularesplanb.com/php/updateConfrontacioFinal.php?id='+id+'&pA='+pA+'&pB='+pB);
            //const posts = {data: "12"};
            if (posts.data) {
                console.log("UPDATE FINAL!!", posts.data);
            }
        },
        
        
        extractRepetits(coleccio, id, nom = "id"){
            coleccio = coleccio.filter(function( obj ) {
                //console.log(obj[nom], id);
                return obj[nom] != id ;
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
    created: function(){
        let self = this;
        this.modell = []
        for (const f of this.getConfrontacionsByTorn){
            // Creo l'array pels v-models
            self.modell.push({A:f['bandoA']['punts'], B:f['bandoB']['punts']});
            // EN tots els casos esborrem dels selectables les batelles escollides
            //self.batalles_selectables = self.extractRepetits(self.batalles_selectables, f.id_batalla);
        }
    },
    mounted: function(){
        let self = this;
        console.log(this.$route.params.campanya_id), this.$route.params.torn;
        this.torn = this.$route.params.torn;
        this.setConfrontacioTorn(this.torn);
        console.log(this.getConfrontacionsByTorn.length);

        this.modell = [];
        for (const f of this.getConfrontacionsByTorn){
            // Creo l'array pels v-models
            self.modell.push({A:(f['bandoA']['punts'] == "0") ? null : f['bandoA']['punts'], B:(f['bandoB']['punts'] == "0") ? null : f['bandoB']['punts']});
            // EN tots els casos esborrem dels selectables les batelles escollides
            self.batalles_selectables = self.extractRepetits(self.batalles_selectables, f.id_batalla);
        }
        // Si no esta el torn ple, afegim els usuaris sense confrontacio
        if (this.getConfrontacionsByTorn.length !== this.getUsersByCampanyaActual.length / 2){
            console.log("EL TORN NO ÉS PLE");
            let temp = []

            let arr = this.getUsersByCampanyaActual;
            for (const f of this.getConfrontacionsByTorn){
                arr = arr.filter((x) => f.bandoA.id != x.id_usuari);
                arr = arr.filter((x) => f.bandoB.id != x.id_usuari);
            }
            console.log("ARR", arr);
            for (const f of arr){
                if (f.bando == "0"){
                    self.bando_A.push({id: f.id_usuari, name: f.nom});
                } else {
                    self.bando_B.push({id: f.id_usuari, name: f.nom});
                }
            }

        }
        console.log("Creo els models");
        //this.convertConfrontacionsVuexConfrontacions();
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

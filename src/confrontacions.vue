<template>
     <section>
          <div class="container">
              <div class="columns is-gapless">
                  <div class="column is-9">
                    <div class="title cinzel-regular">Confrontacións {{campanya}} Torn: {{torn}}</div>
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
                        <button class="button" @click="tancar(idx, 'boto')" :disabled="isDisabled(idx, 'tancar')">
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
            <div class="columns is-mobile">
                <div class="column is-5 is-offset-2 misio">
                    <draggable
                        :list="batalles_selectables"
                        group="batalles"
                        class="list-group"
                        ghost-class="ghost"
                        @change="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in batalles_selectables" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
            </div>
        </div>
      </section>

</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios';


export default {
    name: 'confrontacions',
    components: {
      draggable,
    },
    data: function(){
        return{
            enabled: true,
            bando_A: [],
            bando_B: [],
            campanya: '',
            torn: 0,
            batalles_selectables:[
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
            batalles_selected:[],
            confrontacions:[],
            dragging: false,
            bando_AClass: '',
            users:[],
            lastIdxTancat : null,
        }
    },
    computed: {


    },
    methods: {
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
            console.log("Future index: " + e.draggedContext);
            console.log(e.draggedContext);
        },
        tancar: function(id, procedencia, isFinal = false, punts_bando_A = null, punts_bando_B = null, id_confrontacio=null) {
            let self = this;

            this.confrontacions.push({
                idx: id,
                bando_A: self.bando_A[id].id,
                batalla: self.batalles_selected[id].id,
                bando_B: self.bando_B[id].id,
                punts_bando_A: punts_bando_A,
                punts_bando_B: punts_bando_B,
                torn: 0,
                isFinal: isFinal,
                id: id_confrontacio
            });
            console.log("isFinal", isFinal);


            if (procedencia == 'boto'){
                this.lastIdxTancat = id;
                let params = {
                        'id_campanya': self.$route.params.campanya_id,
                        'id_usuari_A': self.bando_A[id].id,
                        'id_batalla': self.batalles_selected[id].id,
                        'id_usuari_B': self.bando_B[id].id,
                        'nPunts_A': 0,
                        'nPunts_B': 0,
                        'nTorn': self.$route.params.torn,
                        'isFinal': 0,
                    };

                this.setTancar(params);
            }

        },
        async setFinal(id, pA, pB){
            const posts = await axios.get('https://historic.irregularesplanb.com/php/updateConfrontacioFinal.php?id='+id+'&pA='+pA+'&pB='+pB);
            if (posts.data) {
                console.log("UPDATE FINAL!!", posts.data);
            }
        },
        final(idx){
            let id = 0;
            let pA = 0;
            let pB = 0;

            for (const conf of this.confrontacions) {
                if (conf.idx == idx){
                    conf.isFinal = true;
                    console.log(conf);
                    id = parseInt(conf.id);
                    pA = parseInt(conf.punts_bando_A);
                    pB = parseInt(conf.punts_bando_B);
                }
            }

            this.setFinal(id, pA, pB);

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

            return (temp) ? 'selected' : 'not-selected';
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
                    console.log('DISABLED', id);
                    temp = true;
                }
            }

            return temp;
        },

        async setTancar(params){
            let text = '?';
            for (const f of Object.keys(params)){
                text = text + '&' + f + '=' + params[f];
            }

            const posts = await axios.get(`https://historic.irregularesplanb.com/php/setControntacio.php`+text);
            if (posts.data) {
                console.log("TANCAT I GUARDAT", posts.data);
                this.confrontacions[this.lastIdxTancat]['id'] = posts.data;
            }
        },

        getisFinalProcess(dades){
            let self = this;
            console.log("RESP COMFRONTACIO BY ID", dades);
                let count = 0;
                for (const f of dades.confrontacions){
                    console.log(f.bandoA);
                    self.bando_A.push(f.bandoA);
                    self.bando_B.push(f.bandoB);
                    console.log("LALA", f);
                    for (const ff of self.batalles_selectables){
                        if (ff.id == f.id_batalla){
                            self.batalles_selected.push(ff);
                        }
                    }
                    //if(f.isFinal == 1) {
                        self.tancar(count, 'bbdd', (f.isFinal == 0) ? false : true, f.bandoA.punts * 1, f.bandoB.punts * 1, f.id);
                        count++;
                    //}
                }
        },

        async getisFinal(){
            let self = this;

            const posts = await axios.get(`https://historic.irregularesplanb.com/php/getConfrontacioBtCampAndTorn.php?id=`+this.$route.params.campanya_id+'&torn='+this.$route.params.torn)

            if (posts.data) {
                this.getisFinalProcess(posts.data);
                this.torn =posts.data.confrontacions[0].torn;
                this.campanya = posts.data.campanya;
            }
        },
        getisNewProcess(dades){
            console.log("RESP CAMPANYA BY ID", dades);
            this.bando_A = dades.bando_A;
            this.bando_B = dades.bando_B;
            this.torn = this.$route.params.torn;
        },
        async getisNew(){
            
            const posts = await axios.get(`https://historic.irregularesplanb.com/php/getCampanyaById.php?id=`+this.$route.params.campanya_id)
            if (posts.data) {
                this.getisNewProcess(posts.data);
            }
        },
        async esperant(){
            let self = this;
            const postss = await axios.get(`https://historic.irregularesplanb.com/php/getConfrontacioBtCampAndTorn.php?id=`+this.$route.params.campanya_id+'&torn='+this.$route.params.torn)

            if (postss.data) {
                this.getisFinalProcess(postss.data);
                this.torn =postss.data.confrontacions[0].torn;
                this.campanya = postss.data.campanya;

                const posts = await axios.get(`https://historic.irregularesplanb.com/php/getCampanyaById.php?id=`+this.$route.params.campanya_id)
                if (posts.data) {
                    //this.getisNewProcess(posts.data);

                    let bandoA = posts.data.bando_A;
                    let bandoB = posts.data.bando_B;
                    for (const f of this.confrontacions){
                        bandoA = this.extractRepetits(bandoA, f.bando_A);
                        bandoB = this.extractRepetits(bandoB, f.bando_B)
                    }
                    for (const f of bandoA){
                        self.bando_A.push(f);
                    }
                    for (const f of bandoB){
                        self.bando_B.push(f);
                    }

                    let batalles = this.confrontacions.map(a => a.batalla);
//                    console.log("BATALLES", batalles);
                    for (const f of batalles){
                        self.batalles_selectables = self.batalles_selectables.filter(function(obj){
                            return obj.id !== f;
                        });
                    }
                }


            }
        },
        extractRepetits(coleccio, id){
            coleccio = coleccio.filter(function( obj ) {
                return obj.id !== id ;
            });
            console.log("EXTREURE", coleccio);
            return coleccio;;
        },

    },
    created() {


        if (this.$route.params.isNew == 0){
            this.getisFinal();
        } else if (this.$route.params.isNew == 1) {
            this.getisNew();
        } else {
            this.esperant(true);   
        }

    },
    mounted: function(){
        console.log(this.$route.params.campanya_id);

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
    &.not-selected {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    input {
            text-align: center;
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

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
                        <button class="button" @click="tancar(idx, 0)" :disabled="isDisabled(idx, 'tancar')">
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
      <router-view></router-view>
          </section>

</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios';


export default {
    name: 'campanyes',
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
        tancar: function(id, isFinal, punts_bando_A = null, punts_bando_B = null, id_confrontacio=null) {
            let self = this;
            this.confrontacions.push({
                idx: id, 
                bando_A: self.bando_A[id].id, 
                batalla: self.batalles_selected[id].id, 
                bando_B: self.bando_B[id].id,
                punts_bando_A: punts_bando_A,
                punts_bando_B: punts_bando_B,
                torn: 0,
                isFinal: (isFinal == 0) ? false : true,
                id: id_confrontacio
            });
            console.log("isFinal", isFinal);

            if (isFinal == 0){
                let params = {
                        'id_campanya': self.$route.params.campanya,
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
        final(idx){
            for (const conf of this.confrontacions) {
                    if (conf.idx == idx){
                        conf.isFinal = true;
                    }
                }
        },
        isSelected: function(banda, id){
            let self = this;
            let temp = false;

            for (const conf of this.confrontacions) {
                if (conf[banda] == id){
                    console.log(conf,banda, id);
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
                        console.log('DISABLED', id);
                        temp = true;
                    }
                }
            } else if(boto == 'final'){
                for (const conf of this.confrontacions) {
                    if (conf.idx == id && conf.isFinal){
                        console.log('DISABLED', id);
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
                    console.log(posts.data);
                }
        },
    },
    async created() {

        let self = this;
        if (this.$route.params.isNew == 0){
            const posts = await axios.get(`https://historic.irregularesplanb.com/php/getConfrontacioBtCampAndTorn.php?id=`+this.$route.params.campanya+'&torn='+this.$route.params.torn)
            if (posts.data) {
                console.log(posts.data);
                let count = 0;
                for (const f of posts.data.confrontacions){
                    console.log(f.bandoA);
                    self.bando_A.push(f.bandoA);
                    self.bando_B.push(f.bandoB);

                    for (const ff of self.batalles_selectables){
                        if (ff.id == f.id_batalla){
                            self.batalles_selected.push(ff);
                        }
                    } 
                    self.tancar(count, 1, f.bandoA.punts * 1, f.bandoB.punts * 1, f.id);
                    count ++;
                }
                this.torn =posts.data.confrontacions[0].torn;
                this.campanya = posts.data.campanya;
            }
        } else {
            const posts = await axios.get(`https://historic.irregularesplanb.com/php/getCampanyaById.php?id=`+this.$route.params.campanya)
            if (posts.data) {
                console.log(posts.data);
                this.bando_A = posts.data.bando_A;
                this.bando_B = posts.data.bando_B;
                this.torn = this.$route.params.torn;
            }
        }
        
    },
    mounted: function(){
        console.log(this.$route.params.campanya);
        
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

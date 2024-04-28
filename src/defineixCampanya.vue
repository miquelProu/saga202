<template>
    <section class="defineix">
        <div class="container" style="margin-bottom:40px;">
            <div class="columns is-multiline is-vcentered">
                <div class="column is-5">
                    <div class="field">
                      <label class="label">Nom de la campanya</label>
                      <div class="control">
                        <input class="input" type="text" v-model="nom" placeholder="Kill 'em all">
                      </div>
                    </div>
                </div>

                <div class="column is-3">
                    <div class="field">
                      <label class="label">Número de rondes</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="100" v-model.number="nRondes">
                      </div>
                    </div>
                </div>

                <div class="column is-3">
                    <div class="field">
                      <label class="label">Número de bàndols</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="2" v-model.number="nBandols">
                      </div>
                    </div>
                </div>

                

                <div class="column is-5">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="joc" value="saga" v-model="joc" checked>
                            SAGA
                        </label>
                        <label class="radio">
                            <input type="radio" name="joc" value="clash" v-model="joc">
                            CLASH OF SPEARS
                        </label>
                    </div>
                </div>

                

                <div class="column is-3">
                    <label class="checkbox">
                        Repetir Missió ?
                        <input type="checkbox" v-model="repetir">
                    </label>
                            
                </div>

                <div class="column is-3">
                
                      <div class="control">
                        <button class="button" @click="guardar()">Guardar</button>
                      </div>
                </div>

            </div>

        </div>
        <div class="container">
            <div class="columns is-multiline">
                <div class="column" v-for="(x, idx) in old_nBandols*1">
                    <div class="title cinzel-regular has-text-centered">Bando {{String.fromCharCode(idx+65)}}</div>
                    <draggable
                        v-model="bandols_list[idx]"
                        group="users"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in bandols_list[idx]" :key="element.id">
                            <div>{{ element.name }}</div>
                        </div>
                    </draggable>
                </div>
                <!--div class="column is-3-tablet is-10-mobile is-offset-1-mobile">
                    <div class="title cinzel-regular has-text-centered">Bando B</div>
                    <draggable
                        :list="bando_B"
                        group="users"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in bando_B" :key="element.id">
                            <div>{{ element.name }}</div>
                        </div>
                    </draggable>
                </div -->
                <div class="column">
                    <div class="title cinzel-regular has-text-centered">Generals</div>
                    <draggable
                        :list="generals"
                        :group="{name: 'users', put: false}"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in generals" :key="element.id">{{ element.name }}</div>
                    </draggable>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
//import axios from 'axios';
import { mapGetters, mapActions } from 'vuex'
import router from './router'


export default {
    name: 'definirCampanya',
    components: {
      draggable,
    },
    data: function(){
        return{
            enabled: true,
            bando_A: [],
            bando_B: [],
            //users:[],
            dragging: false,
            nRondes: null,
            nBandols: 2,
            old_nBandols: 2,
            nom: '',
            bandols_list:[],
            generals:[],
            joc: 'saga',
            repetir: false,
        }
    },
    computed: {
        ...mapGetters({
            getUsers: 'getUsers'
        }),
    },
    watch: {
        nBandols(val){
            console.log("WATCH!!");
            console.log(val, this.old_nBandols);
            if (val && val != '' && val != this.old_nBandols && val != "0"){
                console.log("entro");
                let self = this;
                this.bandols_list = [];
                for (let f = 0; f < val; f++){
                    self.bandols_list[f] = [];
                }
                this.old_nBandols = this.nBandols;
                this.generals = [];
                this.generals.push(...this.getUsers)
            }
        }
    },
    methods: {
        ...mapActions({
            getUsersFromDB: 'getUsersFromDB',
            saveCampaya: 'saveCampaya',
        }),
        checkMove: function(e) {
            console.log("Future index: " + e.draggedContext);
            console.log(e.draggedContext);
        },
        guardar(){
            let self = this;
            console.log(this.nom, this.nRondes);
            let obj = {
                nom: self.nom,
                nRondes: self.nRondes,
                bandols: self.bandols_list,
                nBandols: self.nBandols,
                joc: self.joc,
                isRepeticio: self.repetir,
            };
            this.saveCampaya(obj);
            router.push({ name: 'home'});
        }
    },
    mounted: function(){
        let self = this;
        console.log("HOLS DEFINIR CAMAPANYA");
        this.getUsersFromDB().then(() => {
            console.log("GET USERS FROM DB TROUGHT THE STORE");
            console.log(this.getUsers);
            self.generals = [];
            self.generals.push(...self.getUsers)
        });
        
        for (let f = 0; f < this.nBandols; f++){
                self.bandols_list[f] = [];
            }
    }
}
</script>

<style lang="scss">
@import "./scss/estil.scss";

.defineix {
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

    .defineix .list-group {
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
}
</style>

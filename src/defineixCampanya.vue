<template>
    <section class="defineix">
        <div class="container" style="margin-bottom:40px;">
            <div class="columns">
                <div class="column is-5 is-offset-1">

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
                        <input class="input" type="text" placeholder="100" v-model="nRondes">
                      </div>
                    </div>
                </div>
                <div class="column is-2">
                    <div class="field">
                      <label class="label is-hidden-mobile">&nbsp;</label>
                      <div class="control">
                        <button class="button" @click="guardar()">Guardar</button>
                      </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns">
                <div class="column is-3-tablet is-10-mobile is-offset-1-mobile">
                    <div class="title cinzel-regular has-text-centered">Bando A</div>
                    <draggable
                        :list="bando_A"
                        group="users"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in bando_A" :key="element.id">
                            <div>{{ element.name }}</div>
                        </div>
                    </draggable>
                </div>
                <div class="column is-3-tablet is-10-mobile is-offset-1-mobile">
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
                </div>
                <div class="column is-4-tablet is-10-mobile is-offset-1-mobile is-offset-1-tablet">
                    <div class="title cinzel-regular has-text-centered">Generals</div>
                    <draggable
                        :list="getUsers"
                        group="users"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        :move="checkMove"
                        @start="dragging = true"
                        @end="dragging = false"
                    >
                        <div class="tarja" v-for="element in getUsers" :key="element.id">{{ element.name }}</div>
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
            nom: '',
        }
    },
    computed: {
        ...mapGetters({
            getUsers: 'getUsers'
        }),
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
                bando_A: self.bando_A,
                bando_B: self.bando_B
            };
            this.saveCampaya(obj);
            router.push({ name: 'home'});
        }
    },
    mounted: function(){
        console.log("HOLS DEFINIR CAMAPANYA");
        this.getUsersFromDB().then(() => {
            console.log("GET USERS FROM DB TROUGHT THE STORE");
            console.log(this.getUsers);
        });
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

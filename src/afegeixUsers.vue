<template>
    <section class="afegeix">
        <div clqss="container" style="margin-bottom:40px;">
            <div class="columns">
                <div class="column is-5 is-offset-1">

                    <div class="field">
                      <label class="label">Nom del general</label>
                      <div class="control">
                        <input class="input" type="text" v-model="nom" placeholder="Alejandro Magno">
                      </div>
                    </div>

                </div>
                <div class="column is-2" style="position: relative;">
                    <button class="button" style="position: absolute; bottom:0.75rem;" @click="guardar()">Guardar</button>
                </div>
            </div>
        </div>

        <div class="container" style="text-align: center;">

                <div class="title cinzel-regular">Generals</div>
        </div>
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-3" v-for="element in getUsers" :key="element.id">
                    <div class="tarja">{{ element.name }}</div>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
//import axios from 'axios';

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'afegeixUsers',
    components: {
    },
    data: function(){
        return{
            //enabled: true,
            //users:[],
            //dragging: false,
            //nRondes: null,
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
            saveUser: 'saveUser',
        }),
        guardar(){
            let self = this;
            console.log(this.nom);
            this.saveUser(this.nom);
        }
    },

    mounted: function(){
        console.log("HOLA AFEGEIX USERS");
        this.getUsersFromDB().then(() => {
            console.log("GET USERS FROM DB TROUGHT THE STORE");
            console.log(this.getUsers);
        });
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
.afegeix .list-group{
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

<template>
    <section>
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
                <div class="column is-3" v-for="element in users" :key="element.id">
                
                        <div class="tarja">{{ element.name }}</div>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'afegeixUsers',
    components: {
    },
    data: function(){
        return{
            enabled: true,
            users:[],
            dragging: false,
            nRondes: null,
            nom: '',
        }
    },
    computed: {
        

    },
    methods: {
        checkMove: function(e) {
            console.log("Future index: " + e.draggedContext);
            console.log(e.draggedContext);
        },
        guardar(){
            let self = this;
            console.log(this.nom);
            
            axios.get('https://historic.irregularesplanb.com/php/setUser.php?nom='+this.nom)
                .then(function(response){
                    console.log(response);
                })
                .catch(function (error) {
                    // manejar error
                    console.log(error);
                })
                .finally(function () {
                    // siempre sera executado
            });
            const max = Math.max(...self.users.map(o => parseInt(o.id)));
            this.users.push({id: max +1, name: this.nom});
        }
    },
    async created() {
      const posts = await axios.get(`https://historic.irregularesplanb.com/php/users.php`)
      if (posts.data) {
        console.log(posts.data);
        this.users = posts.data;
      }
    },
    mounted: function(){

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

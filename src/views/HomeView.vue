<template>
  <section class="home" style="text-align: center;">
      <div class="container">
          <div class="notification is-primary">
              <button class="delete"></button>
              <div class="title">ANUNCI IMPORTANT</div>
              L'aplicació està en <strong>desenvolupament</strong>, és funcional, però no està acabada, aneu amb compte, si demana un número no hi poseu lletres, porteu-vos bé, encara no hi ha totes les característiques a què esteu habituats, les aniré implementant, però ja es pot fer servir, <strong>ja es pot jugar!!</strong>
          </div>
      </div>
      <div class="container">
          <div class="title colonna titolot mt-6 mb-6" style="color: #F1592AFF; font-size: 6rem;">CAMPANYES d'HISTÒRIC</div>
      </div>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-4 is-vertical is-parent">
                <div class="tile is-child box">
                    <p class="title">Campanyes</p>
                    <div v-for="c in getCampanyes" class="has-text-centered">
                        <router-link class="has-text-centered" style="color: #F1592AFF;" :to="{name: 'campanya', params: {id: c.id} }">{{c.nom}}</router-link>
                    </div>
                </div>
                <div class="tile is-child box">
                    <p class="title">Últims canvis</p>
                    <p>Afegit les mission i suport per les partides de Clash of Spears</p>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <p class="title">Generals</p>
                    <p>Aquí podem posar informació de les campanyes, el General amb més victories, la batalla amb mes punts totals, no sé.... </p>
                    <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                    <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
                </div>
            </div>
        </div>



    </div>
  </section>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
import {mapGetters} from "vuex";

export default {
    name: 'HomeView',
    components: {},
    data(){
        return{
            campanyes: []
        };
    },
    computed: {
        ...mapGetters({
            getCampanyes: 'getCampanyes'
        }),
    },
    mounted: function(){
        console.log("HOLA HOME");
    }
}
</script>

<style lang="scss">
@import "./../scss/estil.scss";

.titolot {
    font-size: 6rem;
    color: $irrpb;
}

</style>

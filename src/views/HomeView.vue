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
          <div class="colonna titolot mt-6 mb-6" style="color: #F1592AFF;">CAMPANYES d'HISTÒRIC</div>
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
                <div class="tile is-child box content">
                    <p class="title">Últims canvis</p>
                    <ul class="has-text-left">
                        <li>Versió aplicació beta 2</li>
                        <li>Versió mòbil beta 0.1</li>
                        <li>Suport per jugar sense bandols</li>
                        <li>Llistat de mission de Clash of Spears</li>
                        <li>Doble puntuació pre confrontació</li>
                        <li>Poder repetir missions</li>
                    </ul>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child box has-text-left content">
                    <p class="title has-text-centered">Instruccións</p>
                    <p><em>Aquesta beta 2, encara sense ple suport pel mòbil, implementa unes millores per mirar d'adaptar-se a qualsevol format de campanya o aquesta és la idea. Per fer-ho possible afegeix una doble puntuació per cada confrontació, els punts de la batalla jugada i una segona puntuació de la batalla de cara a una lliga, després podrem escollir per quin dels dos valors s'ordena el llistat de generals. També podem crear campanyes sense bàndols i repetir missions dins de cada torn.</em></p>
                    <p>Els generals es gestionen globalment i s'escullen per cada campanya, si cal afegir algun general, hem d'anar a <strong>Gestionar generals</strong> per afegir-lo</p>
                    <p>Els passos per crear i portar una campanya serien:</p>
                    <ul>
                        <li>Anar a <strong>definir campanya</strong> on posarem el nom, els torns, obligatori, però orientatiu, el número de bàndols, <em>de moment poseu només 1 o 2</em>, quin joc és, si es poden repetir missions i els generals en els seu/s bàndol/s</li>
                        <li>Anar a la nova campanya, des de la home o el des del menú desplegable de <strong>Campanya</strong>
Aquí tenim tota la informació de la campanya, els punts per bàndol i per general, els torns i els resultats de les confrontacions, podem anar a les confrontacions de cada torn clicant al <strong>Torn n</strong> o generar un <strong>Nou Torn</strong></li>
                        <li>Dins de les confrontacions del torn és on arrossegant, decidim els emparellaments i les batalles a jugar, un cop l'emparellament està aparaulat s'ha de <strong>Tancar</strong>, clicant al botó, quan s'ha tancat ja no es pot moure, s'ha de jugar!</li>
                        <li>Quan tinguem el resultat de la batalla, hem d'emplenar les puntuacions i clicar a <strong>Final</strong></li>
                        <li>S'obrirà una segona caixa, els punts de la batalla apareixen al costat del nom i al botó hi posa <strong>Puntuació</strong>, omplim la puntuació de cara a una lliga i cliquem al botó a partir d'aquest moment ja apareixerà la informació a la campanya com a batalla jugada.</li>
                    </ul>
                    <p>Si després de fer-la servir una estona veieu coses estranyes, <strong>aneu a la Home i premeu F5 o Recargar</strong>, s'igualen la BBDD i l'aplicació i s'arreglen els desajustos.</p>
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
import {mapGetters, mapActions} from "vuex";

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
    methods: {
        ...mapActions({
            getCampanyesFromDB: 'getCampanyesFromDB'
        }),
    },
    mounted: function(){
        console.log("HOLA HOME");
        this.getCampanyesFromDB().then(() => {
            console.log("GET CAMPANYES FROM DB TROUGHT THE STORE");
            console.log(this.getCampanyes);
        });
    }
}
</script>

<style lang="scss">
@import "./../scss/estil.scss";

.titolot {
    font-size: 65px;
    color: $irrpb;
    @include mobile {
        font-size: 3em;
    }
}

</style>

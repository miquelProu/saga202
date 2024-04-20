<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://www.irregularesplanb.com/">
      <img src="~@/assets/logo_peque2.png" width="32" height="32">
    </a>

    <a role="button" class="navbar-burger burger" :class="{'is-active': burger}" @click="toggleBurger()" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu" :class="{'is-active': burger}">
    <div class="navbar-start">
      <a class="navbar-item" @click="closeBurger()">
        <router-link class="nav-link is-primary" active-class="a" to="/">Home</router-link>
      </a>
        <a class="navbar-item has-dropdown" :class="{'is-active': hover}" @click="campanya()">
            <a class="navbar-link">Campanya</a>
            <div class="navbar-dropdown">
                <div v-for="c in getCampanyes">
                    <router-link class="navbar-item" :to="{name: 'campanya', params: {id: c.id} }">{{c.nom}}</router-link>
                </div>
            </div>
        </a>
      <a class="navbar-item" @click="closeBurger()">
        <router-link to="/defineixCampanya">Defineix Campanya</router-link>
      </a>
      <a class="navbar-item" @click="closeBurger()">
        <router-link to="/afegeix">Gestionar Generals</router-link>
      </a>

      <!--div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div-->
    </div>

    <!--div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div-->
  </div>
</nav>
    <router-view/>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'


  export default {
    name: 'menudedalt',
    components: {
    },
    data(){
        return{
        campanyes: [],
        burger: false,
        hover: false,
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
        toggleBurger(){
          this.burger = !this.burger;
        },
        closeBurger(){
          this.burger = false;
        },
        campanya(){
          this.hover = !this.hover;
          this.closeBurger();
        }
    },
    mounted: function(){
        this.getCampanyesFromDB().then(() => {
            console.log("GET CAMPANYES FROM DB TROUGHT THE STORE");
            console.log(this.getCampanyes);
        });
    }
  };

</script>

<style lang="scss">
  @import "./scss/estil.scss";

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $irrpb;

    &.router-link-exact-active {
      //color: #42b983;
    }
  }
}
</style>

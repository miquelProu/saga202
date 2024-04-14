<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://https://www.irregularesplanb.com/">
      <img src="~@/assets/logo_invertit-menu.png" width="90" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link class="nav-link is-primary" active-class="a" to="/">Home</router-link>
      </a>
      <a class="navbar-item">
        <router-link to="/defineixCampanya">Defineix Campanya</router-link>
      </a>

      <a class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Campanya</a>
        <div class="navbar-dropdown">
          <div v-for="c in campanyes">
            <router-link class="navbar-item" :to="{name: 'campanya', params: {id: c.id} }">{{c.nom}}</router-link>
          </div>
        </div>
      </a>
      <a class="navbar-item">
        <router-link to="/afegeix">Generals</router-link>
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
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
      </div>
    </div>

    <div class="navbar-end">
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
    </div>
  </div>
</nav> 
    <router-view/>
  </div>
</template>


<script>
import axios from 'axios'


  export default {
    name: 'menudedalt',
    components: {
    },
    data(){
      return{
        campanyes: []
      };
    },
     async created() {
      let self = this;
      const posts = await axios.get(`https://historic.irregularesplanb.com/php/getCampanyes.php`)
      if (posts.data) {
        console.log(posts.data);
        for (const f of posts.data){
            self.campanyes.push(f);
        }
      }
    },
    mounted: function(){}
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

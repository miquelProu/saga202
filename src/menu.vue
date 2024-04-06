<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://versions.bulma.io/0.9.0">
      <img src="https://versions.bulma.io/0.9.0/images/bulma-logo.png" width="112" height="28">
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
        <router-link class="nav-link" to="/">Home</router-link>
      </a>
      <a class="navbar-item">
        <RouterLink to="/bando">Bando</RouterLink>
      </a>

      <a class="navbar-item">
        <RouterLink to="/campanya">Campanya</RouterLink>
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
      
</template>

<script>

export default {
    name: 'menumenu',
    components: {
    },
    data: function(){
        return{}
    },
    computed: {
        

    },
    methods: {},
    mounted: function(){
        console.log("MENU!!!")
    }
}
</script>

<style lang="scss">
@import "./scss/estil.scss";




</style>

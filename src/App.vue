<template>
  <div id="app">
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
        <router-link to="/defineixCampanya">Defineix Campanya</router-link>
      </a>

      <a class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Campanya</a>
        <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/campanya">Kill em all</router-link>
        </div>
      </a>
      <a class="navbar-item">
        <router-link to="/confrontacions">Confrontacions</router-link>
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

<style lang="scss">


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

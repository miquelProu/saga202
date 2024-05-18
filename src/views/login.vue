<template>
   <section class="home" style="text-align: center;">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="container login">

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" v-model="password" placeholder="mmmmhhhh...." @keyup.enter="submit()">
          </div>
        </div>
        <div class="control">
          <button class="button" @click="submit()">Guardar</button>
        </div>




          <div>
<div class="notification is-danger mt-6" v-if="showError" id="error">Se siente...</div>
          </div>
  </div>
      </div>
    </div>
      
</section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Md5 from 'js-md5'

export default {
  name: "Login",
  components: {},
  data() {
    return {
      password: "",
      showError: false
    };
  },
  computed: {
    ...mapGetters({
        isLogged: 'isLogged',
    }),
  }, 
  methods: {
    ...mapMutations({
      tryLogin: 'tryLogin' // map `this.add()` to `this.$store.commit('increment')`
    }),
    submit() {
        this.tryLogin(this.password);
        if (this.isLogged){
          this.$router.push("/");
          this.showError = false
        }
      else {
        this.showError = true
      }
    },
  },
  mounted: function(){
    console.log("LOGIN");
  }
};
</script>


<style lang="scss">
@import "../scss/estil.scss";


</style>
import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);
Vue.config.devtools = true;

/*
campanya: {
            id: false,
            nom: false,
            torns: 0
        },

user :{
    id: 0,
    nom: ''
}
*/


export default new Vuex.Store({
    state:{
        users: [],
        campanyes: [],
    },
    getters: {
        getUsers(state){
            return state.users;
        },
        getCampanyes(state) {                    // Get Campanyes
            return state.campanyes;
        },
        getLastCampanyaId(state){
            return Math.max(...state.campanyes.map(o => parseInt(o.id)));
        },
    },
    mutations:{
        populateUSers(state, users){
            state.users = users;
        },
        populateCampanyes(state, campanyes) {   //Mutation Campanyes
            state.campanyes = campanyes;
        },
        pushCampanya(state, campanya){
            state.campanyes.push(campanya);
        },
        pushUser(state, user){
            state.users.push(user);
        },
    },
    actions:{
        async saveUser({commit, state}, nom){
            const posts = await axios.get('https://historic.irregularesplanb.com/php/setUser.php?nom='+nom);
            if(posts.data){
                console.log("PUSH USER", {id: posts.data, name: nom});
                commit('pushUser', {id: posts.data, name: nom});
            }
        },
        async saveCampaya({commit, state}, campanya){
            let paramA = '';
            for (const f of campanya.bando_A){
                paramA = paramA + '&bandoA[]=' + f.id;
            }
            let paramB = '';
            for (const m of campanya.bando_B){
                paramB = paramB + '&bandoB[]=' + m.id;
            }
            console.log(campanya.bando_A, campanya.bando_B);
            console.log(paramA, paramB);

            const posts = await axios.get('https://historic.irregularesplanb.com/php/setCampanya.php?nom='+campanya.nom+'&torns='+campanya.nRondes+paramA+paramB);
            if(posts.data){
                console.log("PUSH CAMPANYA", {id: posts.data, nom: campanya.nom, torns: campanya.nRondes});
                commit('pushCampanya', {id: posts.data, nom: campanya.nom, torns: campanya.nRondes})
            }


        },
        async getCampanyesFromDB({commit, state}){
            if (state.campanyes.length == 0) {
                let temp = [];
                const posts = await axios.get(`https://historic.irregularesplanb.com/php/getCampanyes.php`)
                if (posts.data) {
                    console.log("CALL CAMPANYES AJAX", posts.data);
                    for (const f of posts.data) {
                        temp.push(f);
                    }
                    commit('populateCampanyes', temp);
                }
            }
        },
        async getUsersFromDB({commit, state}){
            if (state.users.length == 0) {
                let temp = [];
                const posts = await axios.get(`https://historic.irregularesplanb.com/php/users.php`)
                if (posts.data) {
                    console.log("CALL USERS AJAX", posts.data);
                    commit('populateUSers', posts.data);
                }
            }
        },
    }
});

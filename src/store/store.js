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

confrontacions Component: {
    bando_A:0,
    bando_B:3,
    batalla:4,
    idx:0,
    isFinal:false,
    punts_bando_A:null,
    punts_bando_B:null,
    torn:0
    }

Confrontacions Vuex: {
    bandoA: {
        id:"1"
        name:"Joan"
        punts:"15"
    }
    bandoB: {
        id:"1"
        name:"Joan"
        punts:"15"
    }
id:"4"
id_batalla:"4"
isFinal:"1"
torn:"2"
}

*/


export default new Vuex.Store({
    state:{
        users: [],
        campanyes: [],
        campanyaActual: {},
        confrontacions: [],
        confrontacioTorn: 0,
        campanyaActualUsers: [],
    },
    getters: {
        getUsers(state){
            return state.users;
        },
        getCampanyes(state) {                    // Get Campanyes
            return state.campanyes;
        },
        getConfrontacions(state){
            return state.confrontacions;
        },
        getCampanyaActual(state){
            return state.campanyaActual;
        },
        getConfrontacionsByTorn(state){
            return state.confrontacions.filter(obj => obj.torn === state.confrontacioTorn);
        },
        getUsersByCampanyaActual(state){
            return state.campanyaActualUsers;
        },
    },
    mutations:{
        populateUSers(state, users){
            state.users = users;
        },
        populateCampanyes(state, campanyes) {   //Mutation Campanyes
            state.campanyes = campanyes;
        },
        populateConfrontacions(state, confrontacions){
            state.confrontacions = confrontacions;
        },
        populateCampanyaUsers(state, users){
            state.campanyaActualUsers = users;
        },
        pushCampanya(state, campanya){
            state.campanyes.push(campanya);
        },
        pushUser(state, user){
            state.users.push(user);
        },
        pushConfrontacio(state, confrontacio){
            state.confrontacions.push(confrontacio);
        },
        setCampanyaActual(state, actual){
            state.campanyaActual = actual;
        },
        setConfrontacioTorn(state, torn){
            state.confrontacioTorn = torn;
        },
        finalizeConfrontacio(state, obj) {
            // Find index of the item to be updated
            const itemIndex = state.confrontacions.findIndex(x => x.id == obj.id);
            for (const f of state.confrontacions){
                console.log(f.id, obj.id);
                console.log(f.id == obj.id);
            }
            console.log(itemIndex);
            state.confrontacions[itemIndex]['isFinal'] = "1";
            state.confrontacions[itemIndex]['bandoA']['punts'] = obj.pA;
            state.confrontacions[itemIndex]['bandoB']['punts'] = obj.pB;
        }
    },
    actions:{
        pushConfrontacio({commit}, confrontacio){
            commit('pushConfrontacio', confrontacio);
        },
        setConfrontacioTorn({commit}, torn){
            commit('setConfrontacioTorn', torn);
        },
        finalizeConfrontacioById({commit}, obj){
            commit('finalizeConfrontacio', obj);
        },
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
        async getConfrontacionsByCampanyaIdFromDB({commit, state}, campanyaId){
            if (state.campanyaActual && campanyaId != state.campanyaActual.id){
                const posts = await axios.get(`https://historic.irregularesplanb.com/php/getControntacioByCampanyaId.php?id=` + campanyaId)
                if (posts.data) {
                    console.log("CALL AJAX CONFRONTACIONS BY CAMPANAYA ID", posts.data);
                    commit('populateConfrontacions', posts.data.confrontacions);
                    //commit('setCampanyaActual', {id: campanyaId, nom: posts.data.campanya});
                }
                let self = this;
                for (const f of state.campanyes){
                    if (f.id == campanyaId){
                        commit('setCampanyaActual', {id: f.id, nom: f.nom});
                    }
                }
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
        async getUsuarisByCampanyaIdFromDB({commit, state}, campanyaId){
            let temp = [];
            const posts = await axios.get(`https://historic.irregularesplanb.com/php/getUsuarisByCampanyaId.php?id=` + campanyaId);
            if (posts.data) {
                console.log("CALL USERS BY CAMPANYA AJAX", posts.data);
                commit('populateCampanyaUsers', posts.data);
            }
        },

    }
});

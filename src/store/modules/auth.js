const state = {
    auth:{ 
        firstname:localStorage.getItem('auth-first-name'), 
        lastname:localStorage.getItem('auth-last-name'), 
        email:localStorage.getItem('auth-email'), 
        token:localStorage.getItem('auth-token'), 
        logged:localStorage.getItem('auth-logged'), 
        accounttype:localStorage.getItem('auth-accounttype') 
    }
}
const actions = {
    setAuth: function({commit}, auth){
        commit('saveAuth', auth);
    },
    clearAuth:function({commit}, auth){
        commit('removeAuth', auth);
    }
}
const getters = {
    getAuth(state){
        return state.auth;
    },
    isAuth:function(state){
        return state.auth.logged;
    }
}

const mutations = {
    saveAuth:function(state, auth){
        state.auth = auth;
        localStorage.setItem('auth-first-name', auth.firstname ?? null);
        localStorage.setItem('auth-last-name', auth.lastname ?? null);
        localStorage.setItem('auth-email', auth.email ?? null);
        localStorage.setItem('auth-token', auth.token ?? null);
        localStorage.setItem('auth-logged', auth.logged ?? false);
        localStorage.setItem('auth-accounttype', auth.accounttype ?? null);
    },
    removeAuth:function(state){
       
        state.auth = {
            firstname:"", 
            lastname:"", 
            email:"", 
            token:"",
            logged:"", 
            accounttype:"" 
        }
        localStorage.clear();
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
}
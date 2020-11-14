const state = {
    students:[]
}
const actions = {
    fetchStudents:function({commit}){
        commit('fetchStudents');
    }
}
const getters = {
    getStudents:function(state){
        console.log(state)
        return state.students;
    },
}

const mutations = {
    fetchStudents:function(state){
        state.students = ["Anver Dole", "Dumitha udara"];
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
}
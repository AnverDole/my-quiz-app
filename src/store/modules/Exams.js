const state = {
    myexams:[],
}
const actions = {
    createNewExam:function({commit}, data){
      commit('newMyExam', data)
    },
    fetchMyExams:function({commit}){
        commit('fetchMyExams');
    }
}
const getters = {
    getMyExams:function(state){
        return state.myexams;
    },
}

const mutations = {
    fetchMyExams:function(state){
        state.myexams = ["Exam1", "Exam2"];
    },
    newMyExam:function(state, data){
        console.log(state,data);
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
}
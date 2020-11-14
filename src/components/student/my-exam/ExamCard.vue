<template>
  <div class="exam section-tile">
   <div class="container-row">
     <div class="left-col">
       <span class="exam-title">{{exam.title}}</span>
       <span class="subject-name">Com. maths</span>
       <span class="status">{{exam.status.status_string}}</span>
     </div>
     <div class="right-col">
       <span class="duration-label">{{exam.duration}}</span>
       <span class="question-count">{{exam.question_count}} questions</span>
       <span v-if="exam.status.is_finished" class="enrolled-date">{{exam.status.attempt_info.attempted_at}}</span>
     </div>
   </div>
   <div class="container-row">
       <span class="instructor-name">{{exam.instructor_name}}</span>
    </div>
   <div class="container-row">
    </div>
   <div v-if="exam.status.is_finished" class="container-row">
       <div class="marks-container">
         <span class="marks-label">Marks</span>
         <span class="marks-percentage">{{exam.status.attempt_info.marks}}%</span>
       </div>
    </div>
    
   <div class="container-row exam-options">
      <button-type2 v-if="exam.status.is_finished" @click="attemptSummery()">Summary</button-type2>
      <button-type2 v-if="exam.status.in_proggress" @click="attemptInfo()">Attempt info</button-type2>
    </div>
  </div>
</template>

<script>
import router from '../../../router';
import ButtonType2 from "../../HtmlComponents/ButtonType2";


export default {
  name: "ExamCard",
  components:{
      ButtonType2
  },
  props: {
    exam:{
      type:Object,
      default: () => { 
        return {
        }
      }
    }
  },
  methods: {
    attemptInfo: function(){
      router.push({name: "student-exam-info", params:{ examid:this.exam.id }});
    },
    attemptSummery: function(){
      router.push({name: "student-exam-attempt-summery", params:{ examid:this.exam.id }});
    }
  },
};
</script>

<style scoped>
.section-tile {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
}
.exam{
  display: flex;
  flex-direction: column;
  /* height: 200px;  */
 align-items: center;
}
.exam .container-row{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.exam .container-row .left-col,
.exam .container-row .right-col{
  display: flex;
  flex-direction: column;
}

.exam .container-row .left-col .exam-title{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}
.exam .container-row .left-col .subject-name{
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  margin-top: 5px;
}
.exam .container-row .left-col .status{
  font-family: Montserrat;
  font-size: 13px;
  color: #A7289E;
  margin-top: 10px;
}

.exam .container-row .right-col{
  align-items: flex-end;
}
.exam .container-row .right-col .duration-label,
.exam .container-row .right-col .question-count{
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  margin-top: 5px;
}
.exam .container-row .right-col .enrolled-date{
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  margin-top: 10px;
}

.exam .container-row .instructor-name{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  margin-top: 10px;
}

.exam .container-row .marks-container{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
.exam .container-row .marks-container .marks-label{
  font-family: Montserrat;
  font-size: 13px;
  color: #A7289E;
  margin-right: 10px;
}
.exam .container-row .marks-container .marks-percentage{
  font-family: Montserrat;
  font-size: 25px;
  color: #A7289E;
}
.exam .container-row.exam-options{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
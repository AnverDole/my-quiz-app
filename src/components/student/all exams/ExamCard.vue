<template>
  <div class="exam section-tile">
    <span class="examname">{{exam.title}}</span>
    <div class="enrolled-sutdent">
      <span class="count">{{exam.student_enrolled}}</span>
      <span class="label">Students enrolled</span>
    </div>
    <div class="examinformation">
       <span
        ><font-awesome-icon class="icon" :icon="['fas', 'cubes']" />{{exam.question_count}}
        questions</span
      >
      <span
        ><font-awesome-icon class="icon" :icon="['fas', 'hourglass-start']" />
        {{exam.duration}}</span
      >
    </div>
    <div class="instructor-name">
      <span class="label">Instructor</span>
      <span class="name">{{exam.instructor_name}}</span>
    </div>
    
     <div class="exam-option">
      <button-type2 v-if="exam.status.is_pending" @click="continueExam(exam.id)"
        >Continue Exam</button-type2>

      <button-type2 v-else-if="exam.status.is_finished" @click="attemptSummery(exam.id)"
        >Summery</button-type2>

      <button-type2 v-else @click="gotoExamDetails(exam.id)"
        >Take Exam</button-type2>
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
    gotoExamDetails: function(examid){
      router.push({name: "student-exam-info", params:{ examid:examid }});
    },
    continueExam: function(examid){
      router.push({name: "student-take-exam", params:{ examid:examid }});
    },
    attemptSummery: function(examid){
      router.push({name: "student-exam-attempt-summery", params:{ examid:examid }});
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
.exam .examname{
   font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}
.exam .enrolled-sutdent{
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 20px;
}
.exam .enrolled-sutdent .count{
  font-family: Montserrat;
  font-size: 20px;
  color: #eb1fdd;
}
.exam .enrolled-sutdent .label{
  font-family: Montserrat;
  font-size: 15px;
  color: #eb1fdd;
  margin-top: 10px;
}

.exam .examinformation{
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  grid-gap: 10px;
}
.exam .examinformation span{
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
}


.exam .instructor-name{
  display: grid;
  grid-template-rows: max-content max-content;
  grid-gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
.exam .instructor-name span.label{
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 500;
  text-align: center;
}
.exam .instructor-name span.name{
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
}
.exam .exam-option {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.icon{
  margin-right: 5px;
}
</style>
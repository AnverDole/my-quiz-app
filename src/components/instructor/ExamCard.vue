<template>
  <div class="exam section-tile">
    <span class="examname">{{exam.title}}</span>
    <div class="enrolled-count">
      <div>
        <span>{{exam.student_enrolled}}</span>
      </div>
      <span class="label">Students Enrolled</span>
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
    <div class="exam-option">
      <button-type2 @click="gotoExamDetails(exam.id)"
        ><font-awesome-icon :icon="['fas', 'info-circle']" />View</button-type2
      >
    </div>
  </div>
</template>

<script>
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import router from '../../router';

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
          // id:0,
        //   name: "hello",
        //   duration: "02:45",
        //   question_count: 10,
        //   student_enrolled: 100,
        }
      }
    }
  },
  methods: {
    gotoExamDetails:function(examid){
      router.push({ name:'instructor-view-exam', params: { 'examid': examid }})
    }
  },
};
</script>

<style>
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
.exam .enrolled-count{
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 20px;
}
.exam .enrolled-count div{
  width: 70px;
  height: 70px;
  background-color:#3f3d56;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exam .enrolled-count div span{
    font-family: Montserrat;
  font-size: 20px;
  color: white;
}

.exam .enrolled-count span.label{
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
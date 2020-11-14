<template>
  <div :class="{question:true, wrong:!question.status.is_correct, correct:question.status.is_correct, 'not-responded':question.status.is_not_responded}">
    <div class="question-header">
        <div class="question-no">
            <span>{{NumberString(questionindex + 1)}}</span>
        </div>
        <span class="question-title">Question</span>

        <div class="check-or-times-image">
          <div v-if="question.status.is_not_responded" class="not-responded"><span>NOT RESPONDED</span><img src="../../../../assets/warning.svg"></div>
          <div v-else-if="!question.status.is_correct" class="wrong"><span>WRONG</span><img src="../../../../assets/times.svg"></div>
          <div v-else-if="question.status.is_correct" class="correct"><span>CORRECT</span><img src="../../../../assets/check.svg"></div>
        </div>
    </div>

    <div class="question-body hide-scrollbar">
      <p class="question-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eum dolor est a porro sunt optio. Dolorem saepe ea consequuntur doloremque maxime quaerat rem, placeat quia fugit, molestiae laboriosam non.</p>
      <div class="answers">
        <!-- {{question}} -->
          <span class="answers-label">Your Response</span>
          <mcq-answer 
          v-for="(answer, key) in question.answers"
          v-bind:key="key" 
          v-bind:answer="answer"/>

          <span class="answers-label correct-answer">Correct Answer</span>
          <mcq-answer v-bind:answer="{id:question.correctanswer.id, answer:question.correctanswer.answer, is_choosed:true}"/>
      </div>
    </div>
  </div>
</template>

<script>
import McqAnswer from "../Mcq/mcq-answer"
export default {
  name:"Question",
  components:{
    McqAnswer
  },
  props:{
   question:Object,
   questionindex:Number,
  },
  methods:{
    NumberString: function(number){
      return String(number).padStart(2, "0");
    },
  }
}
</script>

<style scoped>
.question{
    width: 100%;
    display: grid;
    grid-template-rows: max-content auto;

    background-color: white;
  /* padding: 20px 30px; */
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
  overflow: hidden;
  /* min-height: 300px; */
  margin-top:  20px;
}

.question.wrong{
  border: 1px solid #CF3D3D;
}
.question.correct{
  border: 1px solid #009405;
}
.question.not-responded{
  border: 1px solid #ffae42;
}

.question .question-header{
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  grid-gap: 10px;
  border-bottom: 1px solid rgba(177, 177, 177, 0.315);
  padding: 20px 30px;
}
.question.wrong .question-header{
  border-bottom: 1px solid #CF3D3D;
}
.question.correct .question-header{
  border-bottom: 1px solid #009405;
}
.question.not-responded .question-header{
  border-bottom: 1px solid #ffae42;
}

.question .question-header .question-no{
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #3f3d56;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.question .question-header .question-no span{
    font-family: Montserrat;
  font-size: 14px;
  color: #3f3d56;
  font-weight: 500;
}


.question .question-header span.question-title{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
} 

.question .question-header .check-or-times-image{
  display: flex;
  justify-content: center;
  align-content: center;
}
.question .question-header .check-or-times-image div{
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
}
.question .question-header .check-or-times-image div img{
  width: 20px;
  display: grid;
  grid-template-columns: max-content max-content;
}
.question .question-header .check-or-times-image div span{
 font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
}



.question .question-header .check-or-times-image div.wrong span{
  color: #CF3D3D;
}
.question .question-header .check-or-times-image div.correct span{
  color: #009405;
}
.question .question-header .check-or-times-image div.not-responded span{
  color: #ffae42;
}

.question-body{
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 20px 30px;
}

.question-body p.question-content{
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  margin-top: 0;
}

.answers{
  display: flex;
  flex-direction: column;
}
.answers .answers-label{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}
.answers .answers-label.correct-answer{
  margin-top: 20px;
}

.hide-scrollbar{
   -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* padding: 20px 30px 20px 30px; */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
@media only screen and (max-width: 780px) {
  .section-tile {
    padding: 20px !important;
  }
}


@media only screen and (max-width: 480px) {
.question .question-header{
  padding: 20px;
}
.question-body{
  padding: 20px;
}
}
</style>
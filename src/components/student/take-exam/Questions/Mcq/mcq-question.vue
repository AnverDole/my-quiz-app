<template>
  <div class="question">
    <div class="question-header">
        <div class="question-no">
            <span>{{NumberString(questionNo)}}</span>
        </div>
    
        <span class="question-title">Question</span>
    </div>
    <div class="question-body hide-scrollbar">
      <p class="question-content">{{questionData.question}}</p>
      <div class="answers">
        <span class="answers-label">Choose one</span>
          <mcq-answer 
          v-for="answer in questionData.answers" 
          v-bind:key="'question' + questionNo + ' ' + answer.answer_id + 'answer'" 
          v-bind:answerData="answer"
          v-bind:response="response"
          @response-selected-event="responseChanged(arguments[0])"/>
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
  model:{
    prop:"response",
    event:"selected-answer-changed-event"
  },
  props:{
    questionData:Object,
    questionNo:Number,
    response:Object
  },
  methods:{
    NumberString: function(number){
      return String(number).padStart(2, "0");
    },
    responseChanged: function(selected_index){
      this.$emit('selected-answer-changed-event', { question_id: this.questionData.question_id, answer_id: selected_index });
      this.$emit('responed');
      // console.log();
    }
  }
}
</script>

<style scoped>
.question{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: max-content auto;
}

.question .question-header{
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  grid-gap: 10px;
  border-bottom: 1px solid rgba(177, 177, 177, 0.315);
  padding: 20px 30px;
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

.answers .answers-label{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
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
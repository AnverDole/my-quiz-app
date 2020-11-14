<template>
  <div class="question section-tile">
    <div class="question-header">
        <div class="question-no">
            <span>{{questionNo}}</span>
        </div>
        <span class="question-title">Question</span>
    </div>
    <div class="question-body">
      <p class="question-content">{{questionData.question}}</p>
      <div class="answers">
        <span class="answers-label">Choose one</span>
          <answer
          v-for="(answer, key) in questionData.answers"
          v-bind:key="key"
          v-bind:answerData="answer"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Answer from "../mcq/Answer"
export default {
  name:"Question",
  components:{
    Answer
  },
  model:{
    prop:"questionData",
    event:"change"
  },
  props:{
    questionData:Object,
    questionNo:Number
  }
}
</script>

<style>
.section-tile {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
}
.question{
    width: 100%;
    margin-top: 20px;
}

.question .question-header{
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  grid-gap: 10px;
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
.question .question-header span.question-title{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
} 

.question-body{
  display: flex;
  flex-direction: column;
}

.question-body p.question-content{
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
}

.answers .answers-label{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}

@media only screen and (max-width: 780px) {

  .section-tile {
    padding: 20px !important;
  }
}
</style>
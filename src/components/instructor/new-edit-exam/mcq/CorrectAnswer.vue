<template>
  <div class="correct-answer">
    <span class="answer-label">Correct answer</span>
    <drop-down :showerror="error.show" class="answer-dropdown" v-bind:selectedIndex="correctanswerkey" @selected-changed="correctAnswerChanged(arguments[0])" :items="formatedAnswers"/>
    <span v-bind:class="{'input-error':true, 'show':error.show}">{{error.message}}</span>
  </div>
</template>
<style scoped>
.correct-answer{
  display: grid;
  grid-template-rows: repeat(2, max-content);
  /* grid-gap: 10px; */
}

.correct-answer .answer-label{
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  margin-bottom: 10px;
}
.correct-answer .answer-dropdown{
  width: 100%;
}
.correct-answer  span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
.correct-answer  span.input-error.show {
  display: block;
}
@media only screen and (max-width: 480px) {
 
}
</style>
<script>
import DropDown from "../../../HtmlComponents/DropDown"
export default {
  name: "CorrectAnswer",
  model:{
    prop:"correctanswerid",
    event:"change"
  },
  props:{
   question:Object,
    error:{
      type:Object,
      default: () => { 
        return {
          message: "",
          show: false,
        } 
      }
    }
  },
  computed: {
    formatedAnswers: function(){
      let no = 1;
      return this.question.answers.map(function(){
        return `Answer - ${no++}`;
      });
    },
  },
  components: {
    DropDown
  },
  data: function () {
    return {
      correctanswerkey: this.getCorrectAnswerKey(),
    }
  },
  methods: {
    correctAnswerChanged(correctanswerkey){
      this.correctanswerkey = correctanswerkey;
      Array.from(this.question.answers).forEach(function(answer, key){
          answer.is_correct = (key == correctanswerkey) ? 1:0;
      });
    },
    getCorrectAnswerKey: function(){
      let filterdkeys = Array.from(this.question.answers).map(function(answer){
        return answer.is_correct;
      });
      return filterdkeys.indexOf(1);

    }
  },
};
</script>

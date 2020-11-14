<template>
  <div class="questions-status">
    <div class="questions-status-header">
      <span>Questions</span>
    </div>

    <div class="questions-status-body">
      <div class="question-status-container">
        <div
          v-for="(mcqquestion, key) in questions.mcqs"
          v-bind:key="mcqquestion.question_id"
          v-bind:ref="`question-status-${key}`"
          v-bind:class="{'question-status':true, 'current-question':(key == current_question_index), 'responded':isResponded(mcqquestion.question_id)}"
          @click="$emit('index-change-event', key)"
        >
          <span>{{ padLeft(key + 1) }}</span>
        </div>
        <div class="scroll-bottom-padding"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionStatus",
  model:{
    prop:"current_question_index",
    event: "index-change-event"
  },
  props: {
    questions: {
      type: Object,
      default: () => new Object(),
    },
    current_question_index:{
      type: Number,
      default: () => 0,
    },
    responses: {
      type: Object,
      default: () => new Object(),
    }
  },
  watch:{
    current_question_index: function(){
      this.scrollToCurrentQuestion();
    }
  },
  data: function () {
    return {};
  },
  methods: {
    padLeft: function (string) {
      return String(string).padStart(2, "0");
    },
    scrollToCurrentQuestion: function(){
      let self = this;
      self.$nextTick(function(){
        self.$refs[`question-status-${self.current_question_index}`][0].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
      });
    },
    isResponded: function(questionid){
      return this.responses.mcqs[questionid] != undefined;
    }
  },
};
</script>

<style scoped>

.questions-status {
  border-radius: 10px;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
}

.questions-status-header {
  display: flex;
  box-sizing: border-box;
  padding: 20px 30px 20px 30px;
  border-bottom: 1px solid rgba(177, 177, 177, 0.315);
}
.questions-status-header span {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}


.questions-status .questions-status-header {
  width: 100%;
  flex-grow: 0;
  flex-shrink: 0;
}


.questions-status .questions-status-body {
  display: flex;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.questions-status .questions-status-body::-webkit-scrollbar {
  display: none;
}


.questions-status .questions-status-body .question-status-container {
  display: grid;
  grid-template-columns: repeat(4, 39.5px);
  grid-gap: 10px;
  padding: 30px;
}
.questions-status .questions-status-body .question-status-container .scroll-bottom-padding {
  width: 100%;
  height: 30px;
}


.questions-status .questions-status-body .question-status-container .question-status {
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .25s;
  box-sizing: border-box;
  border: 1px solid transparent;
  padding: 2px;
}
.questions-status .questions-status-body .question-status-container .question-status span{
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  background-color: #863881;
  color: white;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  transition: .25s;
}

/* .questions-status .questions-status-body .question-status-container .question-status.responded {
 
} */
.questions-status .questions-status-body .question-status-container .question-status.responded span{
   background-color: #3f3d56;
}

.questions-status .questions-status-body .question-status-container .question-status:hover {
  border: 1px solid transparent;
}
.questions-status .questions-status-body .question-status-container .question-status:hover span{
  background-color: #c277bd;
  color: white;
}


.questions-status .questions-status-body .question-status-container .question-status.current-question {
  border: 1px solid #c277bd;
}
.questions-status .questions-status-body .question-status-container .question-status.current-question.responded {
  border: 1px solid #3f3d56;
}
/* .questions-status .questions-status-body .question-status-container .question-status.current-question span{
  background-color: #3f3d56; 
} */


@media only screen and (min-width: 700px) {
.questions-status {
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  border: 1px solid rgba(177, 177, 177, 0.315);
}

}

@media only screen and (max-width: 700px) {
  .questions-status-header {
  padding: 0 ;
  border-bottom: none;
}
.questions-status .questions-status-body .question-status-container {
    grid-template-columns: unset;
    grid-auto-flow: column;
    grid-auto-columns: 39.5px;
    padding: 10px 0 5px 0;
}
.questions-status .questions-status-body .question-status-container .scroll-bottom-padding {
 display: none;
}

}
@media only screen and (max-width: 480px) {
/* .questions-status-header {
  padding: 20px;
} */
/* .questions-status .questions-status-body .question-status-container {
  padding: 20px;
} */

}
</style>
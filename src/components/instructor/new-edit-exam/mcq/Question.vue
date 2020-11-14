<template>
  <div class="new-question section-tile">
    <div class="question-header">
      <div class="question-index-and-title">
        <div class="circuler-wrapper">
          <span>{{ questionindex + 1 }}</span>
        </div>
        <span class="label">Question</span>
      </div>
      <icon-button @click="$emit('remove-question', questionindex)"
        ><font-awesome-icon :icon="['fas', 'trash-alt']" size="lg"
      /></icon-button>
    </div>
    <div class="question-body">
      <text-aria
        v-model="question.question"
        :showerror="errors.show"
      ></text-aria>
      <span v-bind:class="{ show: errors.show, 'input-error': true }">{{
        errors.message
      }}</span>
      <div class="answers-section">
        <div class="answer-header">
          <span class="label">Answers</span>
          <icon-button @click="addanswer()"
            ><font-awesome-icon :icon="['fas', 'plus-circle']" size="lg"
          /></icon-button>
        </div>
        <div class="answer-body">
          <span
            v-bind:class="{
              show: errors.answererrors.show,
              'input-error': true,
            }"
            >{{ errors.answererrors.message }}</span
          >
          <answer
            v-for="(answer, index) in question.answers"
            v-bind:key="index + '-answer'"
            v-bind:answerindex="index"
            v-model="question.answers[index].answer"
            @remove-answer="removeanswer"
            v-bind:error="errors.answererrors[index]"
          >
          </answer>

          <correct-answer
            class="cor-answer"
            v-bind:question="question"
            :error="errors.correctanswererror"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.new-question {
  margin-top: 10px;
  border-top: 1px solid rgba(128, 128, 128, 0.329);
  padding: 30px !important;
  /* border-radius: 5px; */
}
.question-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.question-index-and-title {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 10px;
  align-items: center;
}
.circuler-wrapper {
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #3f3d56;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-index-and-title .label {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}

.question-body {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

div.question-body span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
div.question-body span.input-error.show {
  display: block;
}

.answers-section {
  display: flex;
  flex-direction: column;
}
.answers-section .answer-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.answers-section .answer-header .label {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}
.answers-section .answer-body {
  display: grid;
  grid-template-columns: 50% auto;
  grid-gap: 10px;
  border-top: 1px solid rgba(128, 128, 128, 0.164);
  padding-top: 10px;
  margin-top: 10px;
}

.answer-body span.input-error {
  grid-column: 1/-1;
  justify-content: left;
}

.cor-answer {
  grid-column: span 1/2;
}

@media only screen and (max-width: 680px) {
  .answer-width {
    width: 100%;
  }
  .answers-section .answer-body {
    grid-template-columns: auto;
  }
}
@media only screen and (max-width: 480px) {
  .new-question {
    padding: 20px !important;
  }
}
</style>
<script>
import Answer from "../mcq/Answer";
import TextAria from "../../../HtmlComponents/TextAria";
import IconButton from "../../../HtmlComponents/IconButton";
import CorrectAnswer from "../mcq/CorrectAnswer";
export default {
  name: "Question",
  props: {
    question: Object,
    questionindex: Number,
    errors: {
      type: Object,
      default: () => {
        return {
          message: "",
          show: false,
          answererrors: {
            // message:"this is whole answer error!",
            // show:true,
            // 0: {
            //   message: "this is answer 1 error!",
            //   show: true,
            // },
            // 1: {
            //   message: "this is answer 2 error!",
            //   show: true,
            // },
          },
        };
      },
    },
  },
  model: {
    prop: "question",
    event: "update",
  },
  components: {
    Answer,
    TextAria,
    IconButton,
    CorrectAnswer,
  },
  data: function () {
    return {};
  },
  methods: {
    removeanswer: function (answerindex) {
      let question = this.question;
      this.$delete(question.answers, answerindex);
      this.$emit("update", question);
    },
    addanswer: function () {
      let question = this.question;
      question.answers.push({
        answer: "",
        is_correct: 0,
      });
      this.$emit("update", question);
    },
  },
};
</script>

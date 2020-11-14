<template>
  <div class="new-questions">
    <div class="questions-section-header section-tile">
      <span class="new-questions-title">Questions</span>
    </div>

    <div class="questions-container">
      <span v-bind:class="{ 'show':errors.show, 'input-error':true }">{{errors.message}}</span>
      <question
        v-for="(mcqquestion, index) in questions.mcq"
        v-bind:key="index + 'question'"
        v-bind:questionindex="index"
        :ref="index + '-el'"
        v-model="questions.mcq[index]"
        @remove-question="removeQuestion"
        v-bind:errors="errors.mcq[index]"
      />
      <div class="new-question-option">
        <button-type3 @click="AddNewQuestion()">
            <font-awesome-icon :icon="['fas', 'plus-circle']" />New MCQ
          </button-type3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.new-questions {
  width: 100%;
  margin-top: 20px;
}
.questions-section-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-tile {
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
}
.new-questions-title {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.questions-container  span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
  margin-left: 20px;
}
.questions-container  span.input-error.show {
  display: block;
}

.new-question-option {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

@media only screen and (max-width: 480px) {
  .section-tile {
    padding: 20px;
  }
}
</style>
<script>
import ButtonType3 from "../../../HtmlComponents/ButtonType3";
import Question from "../mcq/Question";
export default {
  name: "Questions",
  components: {
    ButtonType3,
    Question,
  },
  props: {
    questions: {
      type: Object,
      default: () => {
        return {
          mcq: [],
        }
      },
    },
    errors: {
      type: Object,
      default: () => {
        return {
          0: {
            message: "",
            show: false,
            answererrors: {
              //  0: {
              //    message: "this is answer 1 error!",
              //    show: true,
              //  },
              //  2: {
              //    message: "this is answer 2 error!",
              //    show: true,
              //  },
            },
            correctanswererror: {
              message: "",
              show: false,
            },
          },
        };
      },
    },
  },
  created: function () {},
  methods: {
    removeQuestion: function (questionindex) {
      if(!Object.prototype.hasOwnProperty.call(this.questions, "removemcq")){
          this.questions.removemcq = [];
      }
      this.$delete(this.questions.mcq, questionindex);
    },
    AddNewQuestion: function () {
      this.questions.mcq.push({
        question: "Lorem ipsum drpis. Nam eget dui.",
        answers: [],
        correctanswerid: -1,
      });
      this.$nextTick(() => {
        this.$refs[`${this.questions.mcq.length - 1}-el`][0].$el.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      });
    },
  },
};
</script>

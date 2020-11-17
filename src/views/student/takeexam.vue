<template>
  <div class="take-exam">
    <simple-header />
    <div class="take-exam-body">
      <div v-show="!messagehandlerdata.show" class="left-col">
        <!-- @time-over-event="submit()" -->
        <duration-status
          ref="durationHandler"
        />
        <questions-status
          v-bind:questions="exam.questions"
          v-model="current_question_index"
          v-bind:responses="responses"
        />
      </div>

      <div v-if="!messagehandlerdata.show" class="main-col">
        <questions
          v-bind:questions="exam.questions"
          v-bind:current_question_index="current_question_index"
          v-bind:responses="responses"
          @responded-to-question="saveEam()"
        />
        <div class="exam-paginator">
          <button-type2 @click="cancel()">Cancel</button-type2>
          <div class="paginator">
            <button-type2
              v-bind:disabled="!isPrevQuestionAvailable()"
              @click="loadPrevQuestion()"
              ><font-awesome-icon
                :icon="['fas', 'caret-left']"
              />Previous</button-type2
            >
            <button-type2
              v-if="isNextQuestionAvailable()"
              @click="loadNextQuestion()"
              >Next <font-awesome-icon :icon="['fas', 'caret-right']"
            /></button-type2>
            <button-type2 v-else @click="finish()">Finish</button-type2>
          </div>
        </div>
      </div>

       <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="fetchexam()"
      />
    </div>
    <simple-footer />
  </div>
</template>

<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import QuestionsStatus from "../../components/student/take-exam/questions-status";
import DurationStatus from "../../components/student/take-exam/duration-status";
import Questions from "../../components/student/take-exam/Questions/Questions";
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import router from "../../router";
import myquizlib from "../../myquizlib/myquizlib";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
export default {
  components: {
    SimpleHeader,
    SimpleFooter,
    QuestionsStatus,
    DurationStatus,
    Questions,
    ButtonType2,
    RequestMessageHandler,
  },
  created: function () {
    this.fetchexam();
  },
  data: function () {
    return {
      messagehandlerdata: {
        show: true,
        mode: Views.loadingView,
        response: {
          message: "",
          can_retry: false,
          can_go_back: false,
          can_dissmiss: false,
        },
      },
      exam: {},
      responses: {
        mcqs: {},
      },
      current_question_index: 0,
    };
  },
  methods: {
    showRequestMessageHandlerErrorView: function (response) {
      this.messagehandlerdata.response = response;
      this.messagehandlerdata.mode = Views.errorView;
    },
    showRequestMessageHandler: function () {
      this.messagehandlerdata.show = true;
      this.messagehandlerdata.mode = Views.loadingView;
    },
    hideRequestMessageHandler: function () {
      this.messagehandlerdata.show = false;
    },
    hidePageLoad: function () {
      this.messagehandlerdata.show = false;
    },

    fetchexam: function () {
      let self = this;
      self.showRequestMessageHandler();
      let data = {
        examid: this.$route.params.examid,
      };
      let result = myquizlib.Students.takeExam(data);
      result.then(function (data) {
        self.$set(self, 'exam', data);
        if(data?.responses?.mcqs){
          self.$set(self.responses, 'mcqs', data.responses.mcqs);
        }
        
        self.startcountdown();
        self.hideRequestMessageHandler();
      });
      result.catch(function (response) {
        console.log(response);

        self.showRequestMessageHandlerErrorView(response);
      });
    },
    cancel: function () {
      router.push({
        name: "student-exam-info",
        params: { examid: this.$route.params.examid },
      });
    },
    loadPrevQuestion: function () {
      if (this.isPrevQuestionAvailable()) {
        this.current_question_index--;
      }
    },
    loadNextQuestion: function () {
      if (this.isNextQuestionAvailable()) {
        this.current_question_index++;
      }
    },
    getQuestionsCount: function () {
      return this.exam.questions.mcqs.length;
    },
    isNextQuestionAvailable: function () {
      return this.getQuestionsCount() > this.current_question_index + 1;
    },
    isPrevQuestionAvailable: function () {
      return this.current_question_index >= 1;
    },
    startcountdown: function () {
      this.$refs.durationHandler.startCountDown(this.exam.time_infomation);
    },
    saveEam: function(){
      let data = {
        exam_id: this.$route.params.examid,
        answer_sheet_id: this.exam.answer_sheet_id,
        responses:{ 
          mcqs: this.responses.mcqs,
        },
      };
      let resutls = myquizlib.Students.saveExam(data);
      resutls.then((data) => {
      console.log(data)
      });
    },
    finish: function(){
      router.push({ name:"student-finish-exam", params:{  examid: this.exam.exam_id, answersheetid: this.exam.answer_sheet_id  }});
    }
    
  },
  metaInfo: function () {
    return {
      title: "My Quiz | Take Exam",
    }
  }
};
</script>

<style scoped>
.take-exam {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100vh;
}
.take-exam-body {
  padding: 0 200px;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 250px auto;
  grid-gap: 20px;
  position: relative;
}
.left-col {
  height: calc(100vh - 80px - 60px);
  display: grid;
  grid-template-rows: max-content auto;
}
.main-col {
  display: grid;
  grid-template-rows: auto max-content;
  height: calc(100vh - 80px - 60px);
}

.exam-paginator {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
}
.exam-paginator .paginator {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 10px;
  align-items: center;
}

@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 1080px) {
  .take-exam-body {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .take-exam-body {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 780px) {
}
@media only screen and (min-width: 700px) {
  .left-col {
    min-height: 350px;
  }
}
@media only screen and (max-width: 700px) {
  .take-exam-body {
    grid-template-columns: none;
    grid-template-rows: max-content auto;
  }
  .left-col {
    height: unset;
  }
  .main-col {
    height: unset;
  }
}
@media only screen and (max-width: 600px) {
}
@media only screen and (max-width: 480px) {
  .take-exam-body {
    padding: 0 20px;
  }
  .exam-paginator {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .exam-paginator .paginator {
    margin-bottom: 20px;
  }
  .main-col {
    min-height: 700px;
  }
}
</style>
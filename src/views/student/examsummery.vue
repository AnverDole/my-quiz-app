<template>
  <div class="exam-summary">
    <simple-header class="header" />
    <navigation-bar />
    <div class="exam-summary-body">
      <div class="section-tile page-title">
        <span>Attempt summary</span>
        <button-type2 @click="goBack()">Back</button-type2>
      </div>

      <div class="section-tile info">
        <div class="left-col">
          <span class="exam-name">{{ summery.exam_name }}</span>
          <div class="subject-and-date">
            <span class="exam-subject">{{ summery.subject.name }}</span>
            <div class="dot"></div>
            <span class="exam-date">{{ summery.attempt_date }}</span>
          </div>
        </div>
        <div class="right-col">
          <span class="marks-label">Marks</span>
          <span class="marks-percentage">{{ summery.marks.value }}%</span>
        </div>
      </div>

      <questions
        v-if="!messagehandlerdata.show"
        v-bind:questions="summery.questions"
      />
      <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="fetchexamsummery()"
        @go-back-event="goBack()"
      />
    </div>
    <simple-footer />
  </div>
</template>

<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import NavigationBar from "../../components/student/NavigationBar";
// import ExamCard from "../../components/student/all exams/ExamCard";
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import myquizlib from "../../myquizlib/myquizlib";
import Questions from "../../components/student/exam-summary/Questions";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
import router from "../../router";
export default {
  name:"ExamSummery",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    RequestMessageHandler,
    ButtonType2,
    Questions,
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
      summery: {
        exam_name: "",
        attempt_date: "",
        subject: {
          id: null,
          name: "",
        },
        marks: {
          totalmcqcount: 0,
          correctmcqcount: 0,
          totalmarks: 0,
          value: 0,
        },
        questions: {
          mcqs: [
            {
              question: "",
              answers: [
                // {
                //   id: 0,
                //   answer: "sdsdsdsd",
                //   is_choosed: false,
                // },
              ],
              correctanswer: 0,
              is_correct: false,
              is_wrong: false,
              is_not_responded: true,
            },
          ],
        },
      },
      paginator: {
        current_page: 1,
        per_page: 4,
        total_pages: 0,
        is_next_page_exists: false,
        is_prev_page_exists: false,
      },
    };
  },
  created: function () {
    this.fetchexamsummery();
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
    fetchexamsummery: function () {
      let self = this;
      self.showRequestMessageHandler();

      let data = {
        examid: this.$route.params.examid,
      };
      let result = myquizlib.Students.getAttemptSummery(data);
      result.then(function (data) {
        self.summery = data;
        console.log(data);
        self.hideRequestMessageHandler();
      });
      result.catch(function (response) {
        console.log(response);

        self.showRequestMessageHandlerErrorView(response);
      });
    },
    goBack: function () {
      router.push({
        name: "student-my-exams",
        params: { examid: this.$route.params.examid },
      });
    },
  },
};
</script>

<style scoped>
.exam-summary {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.exam-summary-body {
  padding: 0 200px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: relative;
}
.header {
  background-color: white;
  z-index: 1;
}
.nav-bar {
  z-index: 0;
}
.section-tile {
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
}
.page-title {
  box-sizing: border-box;
  width: 100%;
  /* height: 50px; */
  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-title span {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}

.exam-summary-body .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.exam-summary-body .info .left-col {
  display: flex;
  flex-direction: column;
}
.exam-summary-body .info .left-col .exam-name {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}

.exam-summary-body .info .left-col .subject-and-date {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: max-content max-content max-content;
  align-items: center;
}
.exam-summary-body .info .left-col .dot {
  width: 3px;
  height: 3px;
  background-color: #3f3d56;
  border-radius: 100%;
}

.exam-summary-body .info .left-col .subject-and-date .exam-subject,
.exam-summary-body .info .left-col .subject-and-date .exam-date {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
}

.exam-summary-body .info .right-col {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.exam-summary-body .info .right-col .marks-label {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 500;
  margin-right: 10px;
}
.exam-summary-body .info .right-col .marks-percentage {
  font-family: Montserrat;
  font-size: 20px;
  color: #3f3d56;
  font-weight: 400;
}

@media only screen and (max-width: 1080px) {
  .exam-summary-body {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .exam-summary-body {
    padding: 0 50px;
  }
}

@media only screen and (max-width: 480px) {
  .exam-summary-body {
    padding: 0 20px;
  }
}
</style>
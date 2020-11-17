<template>
  <div class="exam-info-component">
    <simple-header class="header" />
    <navigation-bar />
    <div class="exam-info-component-body">
      <div class="section-tile page-title">
        <span>Exam info</span>
      </div>
      <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="fetchexaminfo()"
      />

      <div class="info-container">
        <div class="info section-tile">
          <span class="info-label">SUBJECT</span>
          <span class="info-content">{{ info.subject }}</span>
        </div>
        <div class="info section-tile">
          <span class="info-label">INSTRUCTOR</span>
          <span class="info-content">{{ info.instructor }}</span>
        </div>
        <div class="info section-tile">
          <span class="info-label">QUESTIONS</span>
          <span class="info-content">{{ info.questions.mcq }}mcqs</span>
        </div>
        <div class="info section-tile info-duration">
          <span class="info-label">DURATION</span>
          <span class="info-content">{{ info.duration }}</span>
        </div>
      </div>
      <div class="info-option">
        <button-type2 v-if="isPending()" @click="continueExam(info.id)"
          >Continue exam</button-type2
        >
        <button-type2 v-else-if="isTimeOver()" @click="finishExam(info.id)"
          >Finish exam</button-type2
        >
        <button-type2 v-else @click="takeexam()">Take exam</button-type2>
        <button-type2 @click="goBack()">Back</button-type2>
      </div>
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
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
import router from "../../router";
export default {
  name: "ExamInfo",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    RequestMessageHandler,
    ButtonType2,
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
      info: {
        id: null,
        subject: "",
        instructor: "",
        questions: {
          mcq: 0,
        },
        duration: "",
        status: {
          is_finished: false,
          in_proggress: false,
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
    this.fetchexaminfo();
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
      this.pageloading.show = false;
    },

    fetchexaminfo: function () {
      let self = this;
      self.showRequestMessageHandler();

      let data = {
        examid: this.$route.params.examid,
      };
      let result = myquizlib.Students.getExamInfo(data);
      result.then(function (data) {
        self.info.id = data.examinfo.id;
        self.info.subject = data.examinfo.subject;
        self.info.instructor = data.examinfo.instructor;
        self.info.questions.mcq = data.examinfo.questions.mcq;
        self.info.duration = data.examinfo.duration;
        self.info.status = data.examinfo.status;

        console.log(data);
        self.hideRequestMessageHandler();
      });
      result.catch(function (response) {
        console.log(response);

        self.showRequestMessageHandlerErrorView(response);
      });
    },
    goBack: function () {
      if (this.info.status.in_proggress) {
        router.push({
          name: "student-my-exams",
          params: { examid: this.$route.params.examid },
        });
      } else {
        router.push({ name: "student-all-exams" });
      }
    },
    takeexam: function () {
      router.push({
        name: "student-take-exam",
        params: { examid: this.$route.params.examid },
      });
    },
    continueExam: function (examid) {
      router.push({ name: "student-take-exam", params: { examid: examid } });
    },
    finishExam: function (examid) {
      router.push({
        name: "student-finish-exam",
        params: {
          examid: examid,
          answersheetid: this.info.status.answer_sheet_id,
        },
      });
    },
    isTimeOver: function () {
      return this.info.status.time_info?.available_time?.minitues < 1;
    },
    isPending: function () {
      return (
        this.info.status.in_proggress &&
        this.info.status.time_info?.available_time?.minitues > 0
      );
    },
  },
  metaInfo: function () {
    return {
      title: "My Quiz | Exam Info",
    }
  }
};
</script>

<style scoped>
.exam-info-component {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.exam-info-component-body {
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

.exam-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
  filter: drop-shadow(0 0 10px rgba(148, 148, 148, 0.227));
  flex-grow: 1;
  flex-shrink: 0;
}

.exam-paginator {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: 20px;
}
.exam-paginator .paginator {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 10px;
  align-items: center;
}
.exam-paginator .paginator span {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}

.info-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
}
.info-container .info {
  /* width: 10; */
  /* height: 80px; */
  display: flex;
  flex-direction: column;
}
.info-container .info .info-label {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  color: #3f3d56;
}
.info-container .info .info-content {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  margin-top: 8px;
}
.info-container .info.info-duration {
  grid-column-start: 2;
  grid-column-end: 2;
}
.info-container .info.info-duration .info-content {
  font-family: Montserrat;
  font-size: 20px;
  color: #3f3d56;
  margin-top: 8px;
}

.info-option {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-gap: 10px;
  justify-content: center;

  margin-top: 30px;
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 1080px) {
  .exam-info-component-body {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .exam-info-component-body {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 780px) {
}
@media only screen and (max-width: 700px) {
  .info-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 600px) {
  .info-container {
    grid-template-columns: max-content;
    grid-template-rows: repeat(4, max-content);
  }
}
@media only screen and (max-width: 480px) {
  .exam-info-component-body {
    padding: 0 20px;
  }
  .info-container {
    /* display: flex;
  flex-direction: column; */
    width: 100%;
  }
  .info-option {
    grid-template-columns: repeat(1, 150px);
  }
}
</style>
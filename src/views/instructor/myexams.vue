<template>
  <div class="dashboard-component">
    <simple-header class="header" />
    <navigation-bar class="nav-bar" />
    <div class="dashboard-body">
      <div class="section-tile page-title">
        <span>My exams</span>
        <button-type2 @click="newExam()">
          <font-awesome-icon
            :icon="['fas', 'plus-circle']"
          />&nbsp;New</button-type2
        >
      </div>
      <div class="my-exams">
        <div v-if="!messagehandlerdata.show" class="exam-container">
          <exam-card
            v-for="exam in exams"
            v-bind:key="exam.id"
            v-bind:exam="exam"
          />
        </div>

        <div v-if="exams.length < 1" class="no-exam-message">
          <svg class="info-icon" viewBox="0 0 512 512">
            <path
              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            />
          </svg>
          <span>You don't have any exams to show.</span>
        </div>

        <div class="exam-paginator" v-if="exams.length > 0">
          <div class="paginator">
            <button-type2
              @click="gotoPrevPage()"
              v-bind:disabled="!paginator.is_prev_page_exists"
              ><font-awesome-icon
                :icon="['fas', 'caret-left']"
              />Back</button-type2
            >
            <span
              >Page {{ paginator.current_page }} of
              {{ paginator.total_pages }}</span
            >
            <button-type2
              @click="gotoNextPage()"
              v-bind:disabled="!paginator.is_next_page_exists"
              >Next <font-awesome-icon :icon="['fas', 'caret-right']"
            /></button-type2>
          </div>
        </div>

        <request-message-handler
          v-bind:show="messagehandlerdata.show"
          v-bind:mode="messagehandlerdata.mode"
          v-bind:response="messagehandlerdata.response"
          @try-again-event="fetchExams(0)"
        />
      </div>
    </div>

    <simple-footer />
  </div>
</template>
<style scoped>
.dashboard-component {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.dashboard-body {
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

.my-exams-component {
  z-index: 0;
}

.exam-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
  filter: drop-shadow(0 0 10px rgba(148, 148, 148, 0.227));
}

.my-exams {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
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

.no-exam-message {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.no-exam-message .info-icon {
  width: 70px;
  fill: #3f3d56;
}
.no-exam-message span {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  margin-top: 20px;
  font-weight: 400;
}

@media only screen and (max-width: 1200px) {
  .exam-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 1080px) {
  .dashboard-body {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .dashboard-body {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 780px) {
}
@media only screen and (max-width: 700px) {
  .exam-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media only screen and (max-width: 600px) {
  .exam-container {
    grid-template-columns: 1fr;
  }
}
@media only screen and (max-width: 480px) {
  .dashboard-body {
    padding: 0 20px;
  }
}
</style>
<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import NavigationBar from "../../components/instructor/NavigationBar";
import myquizlib from "../../myquizlib/myquizlib";
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
import ExamCard from "../../components/instructor/ExamCard";
import Router from "../../router";
export default {
  name: "MyExams",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    ButtonType2,
    RequestMessageHandler,
    ExamCard,
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
      paginator: {
        current_page: 1,
        per_page: 4,
        total_pages: 0,
        is_next_page_exists: false,
        is_prev_page_exists: false,
      },
      exams: [
        // {
        //   id:0,
        //   name: "hello",
        //   duration: "02:45",
        //   question_count: 10,
        //   student_enrolled: 100,
        // },
      ],
    };
  },
  created: function () {
    this.fetchExams(0);
  },
  methods: {
    newExam: function () {
      Router.push({ name: "instructor-new-exam" });
    },
    fetchExams: function (offset) {
      let self = this;
      self.showRequestMessageHandler();
      let data = {
        current_page: self.paginator.current_page + offset,
        per_page: self.paginator.per_page,
      };
      let result = myquizlib.Instructor.getMyExams(data);
      result.then(function (data) {
        console.log(data);
        self.exams = Array.from(data.exams);
        self.paginator.current_page = data.paginator.current_page;
        self.paginator.total_pages = data.paginator.total_pages;
        self.paginator.is_next_page_exists = data.paginator.is_next_page_exists;
        self.paginator.is_prev_page_exists = data.paginator.is_prev_page_exists;
        self.hideRequestMessageHandler();
      });
      result.catch(function (response) {
        console.log(response);
        self.showRequestMessageHandlerErrorView(response);
      });
    },
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

    gotoNextPage: function () {
      if (this.paginator.is_next_page_exists) {
        this.fetchExams(1);
      }
    },
    gotoPrevPage: function () {
      if (this.paginator.is_prev_page_exists) {
        this.fetchExams(-1);
      }
    },
  },
};
</script>

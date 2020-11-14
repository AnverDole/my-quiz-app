<template>
  <div class="dashboard-component">
    <simple-header class="header" />
    <navigation-bar class="nav-bar" />
    <div class="dashboard-body">
      <div class="section-tile page-title">
        <div class="exam-info">
          <span>{{exam.title}}</span>
          <div class="exam-subject-and-duration">
            <span>{{exam.subject.name}}</span>
            <div class="title-dot-subject"></div>
            <span>{{exam.duration}}</span>
          </div>
        </div>
        <div class="page-options">
          <button-type2 @click="editExam()"
            ><font-awesome-icon
              :icon="['fas', 'edit']"
            />&nbsp;Edit</button-type2
          >
          <button-type2 @click="ShowDeleteModal()"
            ><font-awesome-icon
              :icon="['fas', 'trash']"
            />&nbsp;Delete</button-type2
          >
          <button-type2 @click="goBack()"
            ><font-awesome-icon
              :icon="['fas', 'arrow-alt-circle-left']"
            />&nbsp;Back</button-type2
          >
        </div>
      </div>
      <div class="question-container">
        <question
          v-for="(question, key) in exam.questions.mcq"
          v-bind:questionData="exam.questions.mcq[key]"
          :questionNo="key + 1"
          v-bind:key="key"
        />
      </div>

       <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="fetchExam()"
        @go-back-event="goBack()"
      />
    </div>
    <simple-footer />
    <delete-question-modal v-model="deletemodal.show" v-bind:exam="exam" @exam-deleted-event="goBack()" />
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
  padding: 30px;
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
  padding: 20px 30px;
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
.page-options {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 10px;
}
.page-title .exam-subject-and-duration{
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-gap: 5px;
  align-items: center;
   margin-top: 5px;
}
.page-title .exam-subject-and-duration span{
  font-family: Montserrat;
  font-size: 12px;
  color: #3f3d56;
  font-weight: 400;
 
}
.page-title .exam-subject-and-duration .title-dot-subject{
  width: 2px;
  height: 2px;
  background-color: #3f3d56;
  border-radius: 10px;
}
.my-exams-component {
  z-index: -1;
}

.new-exam-option {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  margin: 50px 0;
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
  .page-title {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .page-options {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: 10px;
    margin-top: 20px;
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
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import Router from "../../router";
import Question from "../../components/instructor/view-exam/mcq/Question";
import DeleteQuestionModal from "../../components/instructor/view-exam/DeleteQuestionModal";
import myquizlib from "../../myquizlib/myquizlib";

import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
export default {
  name: "dashboard",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    ButtonType2,
    Question,
    DeleteQuestionModal,
    RequestMessageHandler
  },
  created: function () {
    let self = this;
    self.fetchExam();
  },
  data: function () {
    return {
      deletemodal: {
        show: false,
      },
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
      exam: {
        title: "",
        subject: -1,
        duration: "",
        questions: {
          mcq: [
            // {
            //   question: "sdsdsd",
            //   answers: [
            //     {
            //       answer: "Sdsdsd",
            //       is_correct: true,
            //     },
            //     {
            //       answer: "Sdsdsd",
            //       is_correct: false,
            //     },
            //     {
            //       answer: "Sdsdsd",
            //       is_correct: false,
            //     },
            //     {
            //       answer: "Sdsdsd",
            //       is_correct: false,
            //     },
            //   ],
            // },
          ],
        },
      },
    };
  },
  methods: {
    goBack: function () {
      Router.push({ name: "instructor-my-exams" });
    },
    editExam: function () {
      Router.push({ name: "instructor-edit-exam" });
    },
    ShowDeleteModal: function () {
      this.deletemodal.show = true;
    },
    fetchExam: function () {
      let self = this;
       self.showRequestMessageHandler();
      let result = myquizlib.Instructor.getMyExam(self.$route.params.examid);
      result.then(function (exam) {
        self.exam = exam;
        self.hideRequestMessageHandler();
      });
      result.catch(function (response) {
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
  },
};
</script>

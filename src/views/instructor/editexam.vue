<template>
  <div class="dashboard-component">
    <simple-header class="header" />
    <navigation-bar class="nav-bar" />
    <div class="dashboard-body">
      <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="loadData()"
      />
      <div class="section-tile page-title">
        <span>Edit exam</span>
        <button-type2 @click="goBack()">
          <font-awesome-icon
            :icon="['fas', 'arrow-alt-circle-left']"
          />&nbsp;Back</button-type2
        >
      </div>

      <exam-info-input
        v-if="!messagehandlerdata.show"
        :subjects="subjects"
        v-bind:subject="exam.subject.id"
        @subject-selected="subjectSelected"
        :duration="exam.duration"
        @duration-changed="durationChanged"
        :title="exam.title"
        @title-changed="titleChanged"
        v-bind:errors="errors.infoerrors"
      />

      <questions
        v-if="!messagehandlerdata.show"
        v-bind:errors="errors.questionerrors"
        v-bind:questions="exam.questions"
      />

      <save-edited-exam-modal
        v-model="showsubmitmodal"
        v-bind:exam="exam"
        @submit-error-event="setexamerrors(arguments[0])"
        @dissmiss-event="hideSubmitModal()"
      />
      <div class="new-exam-option">
        <button-type2 @click="showUpdateModal()">Update</button-type2>
      </div>
    </div>
    <div></div>
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
  .page-title {
    box-sizing: border-box;
    margin-top: 20px;
    padding: 20px;
  }
  .new-exam-option {
    margin: 20px 0;
  }
}
</style>
<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import NavigationBar from "../../components/instructor/NavigationBar";
import myquizlib from "../../myquizlib/myquizlib";
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import ExamInfoInput from "../../components/instructor/new-edit-exam/ExamInfoInput";
import Questions from "../../components/instructor/new-edit-exam/mcq/Questions";
import Router from "../../router";
import SaveEditedExamModal from "../../components/instructor/new-edit-exam/SaveEditedExamModal";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
export default {
  name: "EditExam",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    ButtonType2,
    ExamInfoInput,
    Questions,
    SaveEditedExamModal,
    RequestMessageHandler,
  },
  created: function () {
    let self = this;
    let l = setInterval(() => {
      self.loadData();
      clearInterval(l);
    }, 6000);
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
      subjects: [],
      exam: {
        title: "",
        subject: 2,
        duration: "",
        questions: {
          mcq: [
            {
              question: "",
              answers: [
                {
                  answer: "",
                  is_correct: 0,
                },
              ],
              correctanswerid: -1,
            },
          ],
        },
      },
      errors: {
        infoerrors: {
          titleerror: {
            message: "",
            show: false,
          },
          durationerror: {
            message: "",
            show: false,
          },
          subjecterror: {
            message: "",
            show: false,
          },
        },
        questionerrors: {
          message: "",
          show: false,
          mcq: {
            // 0: {
            //   message: "",
            //   show: false,
            //   answererrors: {
            //     message: "",
            //     show: false,
            //     0: {
            //       message: "",
            //       show: false,
            //     },
            //     1: {
            //       message: "",
            //       show: false,
            //     },
            //   },
            //   correctanswererror: {
            //     message: "",
            //     show: false,
            //   },
            // },
          },
        },
      },
      showsubmitmodal: false,
    };
  },
  watch: {
    errors: function (newval) {
      this.errors = newval;
    },
  },
  methods: {
    goBack: function () {
      Router.push({
        name: "instructor-view-exam",
        params: { examid: this.exam.id },
      });
    },
    subjectSelected: function (subjectid) {
      this.exam.subject.id = subjectid;
    },
    durationChanged: function (duration) {
      this.exam.duration = duration;
    },
    titleChanged: function (title) {
      this.exam.title = title;
    },
    setexamerrors: function (response) {
      this.clearexamerrors();
      if ("errors" in response) {
        this.setExamInfoErrors(response);
        this.setQuestionsErrors(response);
        this.hideSubmitModal();
      }
    },
    setExamInfoErrors(response) {
      // console.log(response.errors);
      if ("titleerror" in response.errors) {
        this.errors.infoerrors.titleerror.message = Array.from(
          response.errors.titleerror
        ).join(" ");
        this.errors.infoerrors.titleerror.show = true;
      }

      if ("subjecterror" in response.errors) {
        this.errors.infoerrors.subjecterror.message = Array.from(
          response.errors.subjecterror
        ).join(" ");
        this.errors.infoerrors.subjecterror.show = true;
      }

      if ("durationerror" in response.errors) {
        this.errors.infoerrors.durationerror.message = Array.from(
          response.errors.durationerror
        ).join(" ");
        this.errors.infoerrors.durationerror.show = true;
      }
    },
    setQuestionsErrors(response) {
      if ("questionerrors" in response.errors) {
        this.setQuestionsError(response.errors.questionerrors);
        this.setMcqErrors(response.errors.questionerrors);
      }
    },
    setQuestionsError: function (errors) {
      if ("message" in errors) {
        this.errors.questionerrors.message = Array.from(errors.message).join(
          " "
        );
        this.errors.questionerrors.show = true;
      }
    },
    setMcqErrors: function (errors) {
      if (!("questions" in errors)) {
        return;
      }
      if ("mcq" in errors.questions) {
        let errors_ = {};
        Object.values(errors.questions.mcq).forEach(function (question) {
          errors_[question.id] = {
            message: "",
            show: false,
            answererrors: {
              message: "",
              show: false,
            },
            correctanswererror: {
              message: "",
              show: false,
            },
          };

          if ("message" in question) {
            errors_[question.id]["message"] = Array.from(question.message).join(
              " "
            );
            errors_[question.id]["show"] = true;
          }

          if ("answererrors" in question) {
            if ("message" in question.answererrors) {
              errors_[question.id].answererrors.message = Array.from(
                question.answererrors.message
              ).join(" ");
              errors_[question.id].answererrors.show = true;
            }

            if ("answers" in question.answererrors) {
              Array.from(question.answererrors.answers).forEach(function (
                answer
              ) {
                errors_[question.id].answererrors[answer.id] = {
                  message: Array.from(answer.message).join(" "),
                  show: true,
                };
              });
            }
          }

          if ("correctanswerid" in question) {
            errors_[question.id].correctanswererror.message = Array.from(
              question.correctanswerid
            ).join(" ");
            errors_[question.id].correctanswererror.show = true;
          }
        });

        this.errors.questionerrors.mcq = Object.assign(
          {},
          this.errors.questionerrors,
          errors_
        );
      }
    },

    clearexamerrors: function () {
      this.errors.infoerrors.titleerror.message = "";
      this.errors.infoerrors.titleerror.show = false;

      this.errors.infoerrors.subjecterror.message = "";
      this.errors.infoerrors.subjecterror.show = false;

      this.errors.infoerrors.durationerror.message = "";
      this.errors.infoerrors.durationerror.show = false;

      this.errors.questionerrors.message = "";
      this.errors.questionerrors.show = false;

      this.errors.questionerrors.mcq = {};
    },
    showUpdateModal: function () {
      this.showsubmitmodal = true;
    },
    hideSubmitModal: function () {
      this.showsubmitmodal = false;
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
    loadData: function () {
      let self = this;

      self.showRequestMessageHandler();

      let fetchsubject = myquizlib.Subjects.getAllSubjects();
      let fetchexam = myquizlib.Instructor.getMyExam(self.$route.params.examid);

      Promise.all([fetchsubject, fetchexam])
        .then(function ([subjectdata, examdata]) {
          self.subjects = subjectdata.subjects;
          self.exam = examdata;
          console.log(self.subjects, self.exam);
          self.hideRequestMessageHandler();
        })
        .catch(function (response) {
          console.log(response);
          self.showRequestMessageHandlerErrorView(response);
        });
    },
  },
  
  metaInfo: function () {
    return {
      title: "My Quiz | Edit Exam",
    }
  }
};
</script>

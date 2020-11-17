<template>
  <div class="dashboard-component">
    <simple-header class="header" />
    <navigation-bar class="nav-bar" />
    <div class="dashboard-body">
      <div class="section-tile page-title">
        <span>Dashboard</span>
      </div>

      <request-message-handler
        v-bind:show="messagehandlerdata.show"
        v-bind:mode="messagehandlerdata.mode"
        v-bind:response="messagehandlerdata.response"
        @try-again-event="fetchExams()"
      />

      <div class="summery-container">
        <div class="left-col">
          <div class="exam-card section-tile">
            <div class="icon">
              <div class="circle-wrapper">
                <img src="../../assets/book-open.svg" alt="" srcset="" />
              </div>
            </div>
            <div class="data">
              <span class="label">Exams</span>
              <span class="count">{{ examscount }}</span>
            </div>
          </div>
        </div>
        <div class="right-col">
          <img
            class="dashboard-illustration"
            src="../../assets/dashboard-illustration.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>

    <simple-footer />
    <img v-if="!messagehandlerdata.show" class="background-curve" src="../../assets/background-curve.svg" />
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
  padding: 20px;
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
}
.page-title span {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
  /* margin: 20px; */
}

.summery-container {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-col {
  margin-right: 50px;
}
.right-col {
  margin-left: 50px;
}
.exam-card {
  width: 250px;
  display: grid;
  grid-template-columns: min-content auto;
  margin-bottom: 10px;
}
.exam-card .icon .circle-wrapper {
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  background-color: #3f3d56;
  border-radius: 100%;
  padding: 14px;
}
.exam-card .icon .circle-wrapper img {
  width: 100%;
  height: 100%;
}
.exam-card .data {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.exam-card .data .label {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
}
.exam-card .data .count {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
}

.students-card {
  width: 250px;
  display: grid;
  grid-template-columns: min-content auto;
}

.students-card .icon .circle-wrapper {
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  background-color: #3f3d56;
  border-radius: 100%;
  padding: 10px;
}
.students-card .icon .circle-wrapper img {
  width: 100%;
  height: 100%;
}
.students-card .data {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.students-card .data .label {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
}
.students-card .data .count {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
}

.dashboard-illustration {
  width: 250px;
}

.background-curve {
  position: absolute;
  left: 0;
  bottom: -30%;
  z-index: -2;
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

  .background-curve {
    bottom: -25%;
  }
}
@media only screen and (max-width: 780px) {
  .background-curve {
    bottom: -20%;
  }
}
@media only screen and (max-width: 700px) {
  .left-col {
    margin-right: 20px;
  }
  .right-col-col {
    margin-left: 20px;
  }
  .dashboard-illustration {
    width: 200px;
  }
  .background-curve {
    bottom: -10%;
  }
}
@media only screen and (max-width: 600px) {
  .summery-container {
    grid-template-columns: 1fr;
  }
  .left-col {
    margin-right: 0;
    width: 100%;
  }
  .exam-card,
  .students-card {
    width: 100%;
  }
  .right-col {
    display: none;
  }
}
@media only screen and (max-width: 480px) {
  .dashboard-body {
    padding: 0 20px;
  }
  .background-curve {
    bottom: -0%;
  }
}
</style>
<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import NavigationBar from "../../components/instructor/NavigationBar";
import myquizlib from "../../myquizlib/myquizlib";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
// import myquizlib from '../../myquizlib/myquizlib';
// import MyQuizLib from "../myquizlib/myquizlib";
// import VueRouter from "vue-router"

export default {
  name: "dashboard",
  components: {
    SimpleHeader,
    SimpleFooter,
    NavigationBar,
    RequestMessageHandler,
  },
  data: function () {
    return {
      examscount: 0,
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
    };
  },
  created: function () {
    this.fetchExams();
  },
  methods: {
    fetchExams: function () {
      let self = this;
      self.showRequestMessageHandler();
      let data = {
        current_page: 1,
        per_page: 1,
      };
      let result = myquizlib.Instructor.getMyExams(data);
      result.then(function (data) {
        console.log(data);
        self.examscount = String(data.paginator.total_exams).padStart(2, "0");
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
  },
  
  metaInfo: function () {
    return {
      title: "My Quiz | Dashboard",
    }
  }
};
</script>

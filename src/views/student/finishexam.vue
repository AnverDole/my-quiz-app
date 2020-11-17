<template>
  <div class="finish-exam">
    <simple-header />
    <div class="finish-exam-body">
        <span class="page-label">FINISH ATTEMPT</span>
        <div class="duration">
          <span class="duration-label">AVAILABLE TIME</span>
          <span class="duration-span">{{AvailableTimeString()}}</span>
        </div>
        <div class="options">
          <button-type2 @click="gotoexam()">Goto exam</button-type2>
          <button-type2 @click="submit()">Finish</button-type2>
        </div>
    </div>
    <simple-footer />

      <request-message-handler
        v-bind:show="messagehandlerdata1.show"
        v-bind:mode="messagehandlerdata1.mode"
        v-bind:response="messagehandlerdata1.response"
        @try-again-event="fetchexamattemptinfo()"
        @dissmiss-event="hideRequestMessageHandler1()"
        @go-back-event="gotoexam()"
      />
      <request-message-handler
        v-bind:show="messagehandlerdata2.show"
        v-bind:mode="messagehandlerdata2.mode"
        v-bind:response="messagehandlerdata2.response"
        @try-again-event="submit()"
        @dissmiss-event="hideRequestMessageHandler2()"
      />
  </div>
</template>

<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
import ButtonType2 from "../../components/HtmlComponents/ButtonType2";
import router from "../../router";
import myquizlib from "../../myquizlib/myquizlib";
import RequestMessageHandler, {
  Views,
} from "../../components/RequestMessageHandler";
export default {
  name:"FinishExam",
  components: {
    SimpleHeader,
    SimpleFooter,
    ButtonType2,
    RequestMessageHandler
  },
  created: function () {
    this.fetchexamattemptinfo();
  },
  data: function () {
    return {
      messagehandlerdata1: {
        show: true,
        mode: Views.loadingView,
        response: {
          message: "",
          can_retry: false,
          can_go_back: false,
          can_dissmiss: false,
        },
      },
      messagehandlerdata2: {
        show: false,
        mode: Views.loadingView,
        response: {
          message: "",
          can_retry: false,
          can_go_back: false,
          can_dissmiss: false,
        },
      },
      attemptinfo: {},
      available_millis:0
    };
  },
  methods: {
    showRequestMessageHandlerErrorView1: function (response) {
      this.messagehandlerdata1.response = response;
      this.messagehandlerdata1.mode = Views.errorView;
    },
    showRequestMessageHandler1: function () {
      this.messagehandlerdata1.show = true;
      this.messagehandlerdata1.mode = Views.loadingView;
    },
    hideRequestMessageHandler1: function () {
      this.messagehandlerdata1.show = false;
    },
    fetchexamattemptinfo: function () {
      let self = this;
      self.showRequestMessageHandler1();
      let data = {
         exam_id: this.$route.params.examid,
        answer_sheet_id: this.$route.params.answersheetid,
      };
      console.log(data);
      let result = myquizlib.Students.atteptInfo(data);
      result.then(function (data) {
        self.attemptinfo = data;
        self.hideRequestMessageHandler1();
        self.startCountDown();
      });
      result.catch(function (response) {
        console.log(response);
        self.showRequestMessageHandlerErrorView1(response);
      });
    },
    gotoexam: function () {
      router.push({
        name: "student-take-exam",
        params: { examid: this.attemptinfo.exam_id },
      });
    },
    showRequestMessageHandlerErrorView2: function (response) {
      this.messagehandlerdata2.response = response;
      this.messagehandlerdata2.mode = Views.errorView;
    },
    showRequestMessageHandler2: function () {
      this.messagehandlerdata2.show = true;
      this.messagehandlerdata2.mode = Views.loadingView;
    },
    hideRequestMessageHandler2: function () {
      this.messagehandlerdata2.show = false;
    },
    submit: function () {
      let self = this;
        self.showRequestMessageHandler2();
       let data = {
        exam_id: this.attemptinfo.exam_id,
        answer_sheet_id:  this.attemptinfo.answer_sheet_id,
      };
      let resutls = myquizlib.Students.submitExam(data);
      resutls.catch(function (response) {
        console.log(response);
       
        self.showRequestMessageHandlerErrorView2(response);
      });
      resutls.then((data) => {
      console.log(data)
       self.gotoSummary();
      });
    }, 
    AvailableTimeString: function () {
      return this.millisecondsToTimeString(this.available_millis);
    },
    millisecondsToTimeString: function (milliseconds) {
      let hours = parseInt(milliseconds / (60 * 60 * 1000));
      let minitues = parseInt((milliseconds - hours * 60 * 60 * 1000) / (60 * 1000));
      let seconds = parseInt((milliseconds - hours * 60 * 60 * 1000 - minitues * 60 * 1000) / 1000);

      let hoursString = String(hours).padStart(2, "0");
      let minituesString = String(minitues).padStart(2, "0");
      let secondsString = String(seconds).padStart(2, "0");
      return `${hoursString}h : ${minituesString}m :${secondsString} s`;
    },
    mmToMillis: function (mm) {
      return mm * 60 * 1000;
    },
    startCountDown: function(){
      this.available_millis = this.mmToMillis(this.attemptinfo.time_info.available_time.minitues);
      this.interval_id = setInterval(() => {
        if(this.available_millis > 1000){
          this.available_millis-=1000;
        }else{
          this.$emit('time-over-event');
          this.stopCountDown();
        }
      }, 1000);
    },
    stopCountDown: function(){
      clearInterval(this.interval_id);
    },
    gotoSummary: function(){
      router.push({ name:"student-exam-attempt-summery", params:{examid:this.attemptinfo.exam_id}});
    }
  },
  
  metaInfo: function () {
    return {
      title: "My Quiz | Finish Attempt",
    }
  }
};
</script>
<style scoped>
.finish-exam {
  width: 100%;
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-rows: max-content auto max-content;
}
.finish-exam-body{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.finish-exam-body .page-label{
  font-family: Montserrat;
  font-size: 20px;
  color: #3f3d56;
  font-weight: 500;
}
.finish-exam-body .duration{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.finish-exam-body .duration .duration-label{
  font-family: Montserrat;
  font-size: 17px;
  color: #3f3d56;
  font-weight: 500;
}
.finish-exam-body .duration .duration-span{
  font-family: Montserrat;
  font-size: 24px;
  color: #3f3d56;
  font-weight: 500;
  margin-top: 10px;
}
.finish-exam-body .options{
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 10px;
  margin-top: 20px;
}
</style>

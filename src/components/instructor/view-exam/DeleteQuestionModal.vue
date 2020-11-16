<template>
  <transition name="zoom-in-out" mode="in-out">
    <div v-if="show" class="delete-exam-modal">
      <div v-if="!showrequestmessagehandler" class="modal-base">
        <div class="modal-header">
          <span class="modal-title">Delete exam!</span>
          <icon-button @click="$emit('togglemodal', false)"
            ><font-awesome-icon :icon="['fas', 'times-circle']" size="2x"
          /></icon-button>
        </div>
        <div class="modal-body">
          <p class="main-massage">
            Are you shure you wants to delete this exam?
          </p>
          <p class="sub-massage">This action cannot be undone. <br/>This will delete all the students responses.</p>
        </div>
        <div class="modal-footer">
          <button-type2 @click="DeleteExam()">Delete</button-type2>
          <button-type2 @click="$emit('togglemodal', false)"
            >Cancel</button-type2
          >
        </div>
      </div>
      <div v-if="showrequestmessagehandler" class="delete-animation">
        <request-message-handler
          v-bind:show="messagehandlerdata.show"
          v-bind:mode="messagehandlerdata.mode"
          v-bind:response="messagehandlerdata.response"
          @try-again-event="DeleteExam()"
          @dissmiss-event="HideModal()"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonType2 from "../../HtmlComponents/ButtonType2";
import IconButton from "../../HtmlComponents/IconButton";
import myquizlib from "../../../myquizlib/myquizlib";
import RequestMessageHandler, { Views } from "../../RequestMessageHandler";
export default {
  name: "DeleteQuestionModal",
  components: {
    IconButton,
    ButtonType2,
    RequestMessageHandler,
  },
  model: {
    event: "togglemodal",
    prop: "show",
  },
  props: {
    show: Boolean,
    exam: Object,
  },
  data: function () {
    return {
      showrequestmessagehandler: true,
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
  watch: {
    show: function (value) {
      if (value) {
        this.showrequestmessagehandler = false;
      }
    },
  },
  methods: {
    HideModal: function () {
      this.$emit("togglemodal", false);
    },
    DeleteExam: function () {
      let self = this;
      self.showRequestMessageHandler();
      let result = myquizlib.Instructor.deleteMyExam(this.exam.id);

      result.catch(function (data) {
        self.showRequestMessageHandlerErrorView(data);
        self.messagehandlerdata.mode = Views.errorView;
      });

      result.then(function () {
        self.$emit("togglemodal", false);
        self.$emit("exam-deleted-event");
        self.showrequestmessagehandler = true;
      });
    },
    showRequestMessageHandlerErrorView: function (response) {
      this.messagehandlerdata.response = response;
      this.messagehandlerdata.mode = Views.errorView;
      this.showrequestmessagehandler = true;
    },
    showRequestMessageHandler: function () {
      this.messagehandlerdata.show = true;
      this.messagehandlerdata.mode = Views.loadingView;
      this.showrequestmessagehandler = true;
    },
    hideRequestMessageHandler: function () {
      this.messagehandlerdata.show = false;
      this.showrequestmessagehandler = false;
    },
  },
};
</script>
<style scoped>
@import url("../../../assets/css/animations.css");
.delete-exam-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-exam-modal .modal-base {
  width: 500px;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 0 0 50px 20px rgba(170, 170, 170, 0.527);
  display: flex;
  flex-direction: column;
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.delete-exam-modal .modal-base .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(177, 177, 177, 0.315);
  padding: 10px 20px;
  flex-grow: 0;
  flex-shrink: 0;
}
.delete-exam-modal .modal-base .modal-header .modal-title {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  font-weight: 500;
}

.delete-exam-modal .modal-base .modal-body {
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  width: 100%;
  height: auto;
  flex-direction: column;
  padding: 10px 20px;
  box-sizing: border-box;
}

.delete-exam-modal .modal-base .modal-body .main-massage {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 10px;
}
.delete-exam-modal .modal-base .modal-body .sub-massage {
  font-family: Montserrat;
  font-size: 12px;
  color: #3f3d56;
  font-weight: 500;
  margin-top: 0;
}

.delete-exam-modal .modal-base .modal-footer {
  flex-shrink: 0;
  flex-grow: 0;
  padding: 20px;
  display: grid;
  grid-template-columns: 100px 100px;
  grid-gap: 10px;
  justify-content: right;
}

.delete-exam-modal .delete-animation {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.delete-exam-modal .delete-animation .animation-title {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 20px;
}
.delete-exam-modal .delete-animation .animation-massage {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
  margin-top: 20px;
}

.zoom-in-out-enter-active,
.zoom-in-out-leave-active {
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.zoom-in-out-enter {
  opacity: 0;
}
.zoom-in-out-enter .modal-base {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-in-out-enter-to {
  opacity: 1;
}
.zoom-in-out-enter-to .modal-base {
  opacity: 1;
  transform: scale(1);
}

.zoom-in-out-leave {
  opacity: 1;
}
.zoom-in-out-leave .modal-base {
  opacity: 1;
  transform: scale(1);
}

.zoom-in-out-leave-to {
  opacity: 0;
}
.zoom-in-out-leave-to .modal-base {
  opacity: 0;
  transform: scale(0.9);
}

@media only screen and (max-width: 480px) {
  .delete-exam-modal .modal-base .modal-footer {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<template>
  <div v-if="show" class="request-message-handler">
    <div v-if="mode == views.loadingView" class="animation-box">
      <span class="animation-title">Loading..</span>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span class="animation-massage">Wait a seconds..</span>
    </div>

    <div v-if="mode == views.errorView" class="error-box">
      <span class="error-title">Hmmmm..</span>
      <svg class="error-image" viewBox="0 0 576 512">
        <path
          d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
        />
      </svg>
      <span class="error-message">{{ response.message }}</span>
      <div class="error-options">
        <button-type-2
        v-if="response.can_retry" @click="$emit('try-again-event')">Try again</button-type-2>
        <button-type-2
        v-if="response.can_dissmiss" @click="$emit('dissmiss-event')">Dissmiss</button-type-2>
        <button-type-2
        v-if="response.can_go_back" @click="$emit('go-back-event')">Go Back</button-type-2>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonType2 from "../components/HtmlComponents/ButtonType2";
class Views {
  static loadingView = 0;
  static errorView  = 1;
}

export {Views};
export default {
  name: "RequestMessageHandler",
  components: {
    ButtonType2,
  },
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    mode: {
      type:Number,
      default: ()=>Views.loadingView
    },
    response: {
      type: Object,
      default: () => {
        return {
          message: "Somthing was wrong!",
          can_retry: true,
          can_go_back: false,
          can_dissmiss: false,
        };
      },
    },
  },
 
  data: function () {
    return {
      views: Views
    };
  },
   watch:{
    response: function(){
      this.view = Views.errorView;
    },
    show: function(){
      this.view = Views.loadingView;
    }
  },
};
</script>

<style>
@import url("../assets/css/animations.css");
.request-message-handler {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  align-items: center;
  left: 0;
  top: 0;
  padding: 50px 20px;
  box-sizing: border-box;
  overflow: hidden;
}

div.animation-box {
  display: grid;
  grid-template-rows: repeat(3, max-content);
}

.request-message-handler .animation-title {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}
.request-message-handler .lds-ellipsis {
  margin: 0 auto;
}
.request-message-handler .animation-massage {
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
}

.error-box {
  display: grid;
  grid-template-rows: repeat(3, max-content);
}
.error-box .error-title {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
}
.error-box .error-image {
  fill: #3f3d56;
  width: 70px;
  margin: 0 auto;
  margin-top: 20px;
}

.error-box .error-message {
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
}
.error-box .error-options {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
}
.error-box .error-options :nth-child(n) {
  margin: 5px;
}
</style>
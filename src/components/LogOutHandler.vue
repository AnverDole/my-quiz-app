<template>
    <div v-if="show" class="loading-animation">
      <div v-if="PageMode.mode == PageModes.animation" class="animation-box">
          <span class="animation-title">Loggin out..</span>
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <span class="animation-massage">Wait a seconds..</span>
      </div>
      <div v-if="PageMode.mode == PageModes.error" class="error-massage">
          <span class="animation-title">Hmmmm..</span>
          <svg class="error-image" viewBox="0 0 576 512"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>
          <span class="animation-massage">Somthing went wrong!</span>
          <span v-if="errorText != null" class="error-message-text">{{errorText}}</span>
          <div class="option-btn-container">
          <button-type-2 @click="Logout()">Try again</button-type-2>
          <button-type-2 @click="hideLogoutHandler()">Cancel</button-type-2>
          </div>
      </div>
    </div>
</template>

<script>
import ButtonType2 from "../components/HtmlComponents/ButtonType2"
import myquizlib from "../myquizlib/myquizlib"
import router from "../router"
class PageModes{
  static animation = 0;
  static error = 1;
  mode = 0;
}
export default {
  name: "LogOutHandler",
  components:{
    ButtonType2
  },
  props:{
   
  },
  data:function(){
    return{
      show: false,
      PageModes: PageModes,
      PageMode: new PageModes(),
      errorText:""
    }
  },
  methods:{
    Logout: function () {
      let self = this;
      self.show = true;
      self.PageMode.mode = PageModes.animation;
      let results = myquizlib.Auth.Logout();
      results.catch(function(response){
        console.log(response);
        self.showErrorPage(response);
      });
      results.then(function(){
        router.push({ name: "login" });
      });
    },
    showErrorPage: function(response){
      this.PageMode.mode = PageModes.error;
      this.errorText = response.statusText;
    },
    showAnimationPage: function(){
      this.PageMode = PageModes.animation;
    },
    hideLogoutHandler(){
      this.show = false;
    }
  }
}
</script>

<style scoped>
@import url("../assets/css/animations.css");
.loading-animation {
  position: fixed;
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 100000;
  align-items: center;
  left: 0;
  top: 0;
}



div.animation-box{
  display: grid;
  grid-template-rows: repeat(3, max-content);
}

.loading-animation .animation-title{
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}
.loading-animation .lds-ellipsis{
  margin: 0 auto;
}
.loading-animation .animation-massage{
  font-family: Montserrat;
  font-size: 15px;
  color: #3f3d56;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
}

.error-massage{
  display: grid;
  grid-template-rows: repeat(3, max-content);
}
.error-massage .animation-title{
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
}
.error-massage .error-image{
  fill: #3f3d56;
  width: 70px;
  margin: 0 auto;
  margin-top: 20px;
}

.error-massage .animation-massage{
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
}

.error-massage .error-message-text{
  font-family: Montserrat;
  font-size: 13px;
  color: #3f3d56;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 20px;
}
.error-massage .option-btn-container{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
}

</style>
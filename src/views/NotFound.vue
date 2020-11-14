<template>
  <div class="page-not-found">
    <simple-header />
    <instructor-navigation-bar v-if="isInstructor"/>
    <student-navigation-bar v-if="isStudent"/>
    <div class="error-box">
      <img class="not-found-image" src="../assets/page-not-found.svg" alt="" />
      <h1 class="error-text">Page not found</h1>
    </div>
    <simple-footer />
  </div>
</template>
<script>
import SimpleHeader from "../components/SimpleHeader";
import simpleFooter from "../components/SimpleFooter";
import InstructorNavigationBar from "../components/instructor/NavigationBar"
import StudentNavigationBar from "../components/student/NavigationBar"
import myquizlib from "../myquizlib/myquizlib"
export default {
  components: {
    SimpleHeader,
    simpleFooter,
    InstructorNavigationBar,
    StudentNavigationBar
  },
  data:function(){
    return {
      isInstructor:myquizlib.Auth.isInstructor(),
      isStudent:myquizlib.Auth.isStudent()
    }
  }
};
</script>
<style scoped>
.page-not-found {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}
.page-not-found .error-box {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.page-not-found .error-box .not-found-image {
  width: 300px;
}
.page-not-found .error-box .error-text {
   font-family: Montserrat;
  font-size: 20px;
  color: #ac29a3;
  margin-top: 20px;
}

@media only screen and (max-width: 420px) {
  .page-not-found .error-box .not-found-image {
  width: 100px;
}
.page-not-found .error-box .error-text {
  font-size: 15px;
}

}
</style>
<template>
  <div class="dashboard-component">
    <simple-header />
      <div class="dashboard-body">

      </div>
    <simple-footer />
    <div class="back-circle"></div>
  </div>
</template>
<style scoped>
.dashboard-component{
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.dashboard-body{
  padding: 0 200px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}
@media only screen and (max-width: 1080px) {
  .sign-up-section {
   padding: 0 100px;
 }
}
@media only screen and (max-width: 900px) {
  .sign-up-section {
   padding: 0 50px;
 }
}
@media only screen and (max-width: 780px) {
}
@media only screen and (max-width: 700px) {
}
@media only screen and (max-width: 480px) {
  .sign-up-section {
    padding: 20px;
  }
}
</style>
<script>
import SimpleHeader from "../../components/SimpleHeader";
import SimpleFooter from "../../components/SimpleFooter";
// import MyQuizLib from "../myquizlib/myquizlib";
// import VueRouter from "vue-router"


export default {
  name: "dashboard",
  components: {
    SimpleHeader,
    SimpleFooter,
  },
  data: function () {
    return {
    };
  },
  created:function(){
   
  },
  methods: {

  },
};
</script>

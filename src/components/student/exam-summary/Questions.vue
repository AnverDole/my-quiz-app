<template>
  <div class="questions-container">
    
      <mcq-question 
      v-for="(mcq, key) in questions.mcqs" 
      v-bind:key="key"
      v-bind:question="mcq"
      v-bind:questionindex="key"/>
    
  </div>
</template>

<script>
import McqQuestion from "../exam-summary/Mcq/mcq-question"
export default {
  props:{
    questions:{
      type:Object,
      default: () => new Object(),
    },
  },
  components:{
    McqQuestion,
  }
}
</script>

<style scoped>
.questions-container{
 /* background-color: white; */
  /* padding: 20px 30px; */
  /* border-radius: 10px; */
  /* box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227); */
  box-sizing: border-box;
  /* border: 1px solid rgba(177, 177, 177, 0.315); */
  /* overflow: hidden; */
  /* min-height: 300px; */
}
</style>
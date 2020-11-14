<template>
  <div class="questions-container">
    <template v-for="(mcq, key) in questions.mcqs">
      <mcq-question
        v-if="key == current_question_index"
        v-bind:questionData="mcq"
        v-bind:questionNo="key + 1"
        v-bind:key="mcq.question_id"
        v-model="responses.mcqs[mcq.question_id]"
        @responed="$emit('responded-to-question')"
      />
    </template>
  </div>
</template>

<script>
import McqQuestion from "../../take-exam/Questions/Mcq/mcq-question"
export default {
  props:{
    questions:{
      type:Object,
      default: () => new Object(),
    },
    current_question_index: {
      type: Number,
      default: () => 0,
    },
    responses:{
      type:Object,
      default: () => new Object,
    }
  },
  components:{
    McqQuestion,
  }
}
</script>

<style scoped>
.questions-container{
 background-color: white;
  /* padding: 20px 30px; */
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  box-sizing: border-box;
  border: 1px solid rgba(177, 177, 177, 0.315);
  overflow: hidden;
  min-height: 300px;
}
</style>
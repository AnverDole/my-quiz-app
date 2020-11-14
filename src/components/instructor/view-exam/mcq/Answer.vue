<template>
  <div class="answer">
    <input type="radio" :checked="answerData.is_correct" onclick="return false;"/>
    <p class="answer">{{ answerData.answer }}</p>
  </div>
</template>

<script>
export default {
  name: "Answers",
  props: {
    answerData: Object,
  },
};
</script>

<style>
.answer {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.answer .answer {
  font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
  margin-left: 10px;
}
</style>
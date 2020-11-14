<template>
  <div class="answer">
    <input :checked="isSelected()" @click="$emit('response-selected-event', answerData.answer_id)" type="radio"/>
    <p class="answer">{{answerData.answer}}</p>
  </div>
</template>

<script>
export default {
  name: "Answers",
  props: {
    answerData: Object,
    response: Object,
  },
  methods:{
    isSelected: function(){
      return this.response?.answer_id == this.answerData.answer_id;
    }
  }
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
  font-size: 14px;
  color: #3f3d56;
  padding: 0;
  margin: 10px 0 0 10px;
}
</style>
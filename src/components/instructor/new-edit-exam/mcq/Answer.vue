<template>
  <div class="answer">
     <div class="answer-header">
       <span class="answer-label">Answer {{answerindex+1}}</span>
       <icon-button @click="$emit('remove-answer', answerindex)"><font-awesome-icon :icon="['fas', 'minus-circle']" size="lg"/></icon-button>
     </div>
     
     <div class="answer-body">
       <text-aria v-bind:showerror="error.show" v-bind:text="answer" v-on:change="$emit('change', arguments[0])"  class="answer-text"/>
       <span v-bind:class="{ 'input-error':true, 'show':error.show }">{{error.message}}</span>
     </div>
  </div>
</template>
<style scoped>
.answer{
   display: flex;
   flex-direction: column;
  /* border:1px solid rgba(128, 128, 128, 0.164); */
  margin-top: 10px;
  padding: 0;
  border-radius: 5px;
}
.answer .answer-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px 0;
  width: 100%;
}
.answer .answer-header .answer-label{
   font-family: Montserrat;
  font-size: 16px;
  color: #3f3d56;
}

.answer .answer-body{
  /* padding: 10px; */
  margin-bottom: 10px;
  width: 100%;
}
.answer .answer-body .answer-text{
  width: 100%;
}

.answer .answer-body  span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
.answer .answer-body  span.input-error.show {
  display: block;
}
@media only screen and (max-width: 480px) {
 
}
</style>
<script>
import TextAria from "../../../HtmlComponents/TextAria"
import IconButton from "../../../HtmlComponents/IconButton"
export default {
  name: "Answer",
  model:{
    prop:"answer",
    event:"change"
  },
  props:{
    answer:{
      type: String,
      default:() => ""
    },
    answerindex:{
      type:Number,
      default: 0,
    },
    error:{
      type:Object,
      default: () => { 
        return {
          message:"",
          show: false
        }
      }
    }
  },
  components: {
    TextAria,
    IconButton
  },
  data: function () {
    return {
    }
  },
  created: function () {},
  methods: {
  },
};
</script>

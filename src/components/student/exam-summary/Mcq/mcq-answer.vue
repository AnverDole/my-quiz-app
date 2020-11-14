<template>
  <div class="answer">
    <input :checked="answer.is_choosed" type="radio" @click="preventInput"/>
    <p class="answer">{{ answer.answer }}</p>
  </div>
</template>

<script>
export default {
  name: "Answers",
  props: {
    answer: {
      type: Object,
      default: () => {
        return {
          id: null,
          answer: "",
          is_choosed: false,
        };
      },
    },
  },
  methods: {
    preventInput: function(){
      event.preventDefault();
    }
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
  font-size: 14px;
  color: #3f3d56;
  padding: 0;
  margin: 10px 0 0 10px;
}
</style>
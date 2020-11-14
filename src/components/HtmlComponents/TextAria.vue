<template>
     <textarea class="text-aria" v-bind:value="text" v-bind:class="{ 'show-error':showerror }"  @input="$emit('change', $event.target.value)" v-bind:placeholder="placeholder"></textarea>
</template>

<script>
export default {
  name: 'TextAria',
  model:{
    prop:"text",
    event:"change",
  },
  props: {
    placeholder: String,
    text: String,
    showerror:Boolean,
  },
  data:function(){
    return {
      text_:this.text,
    }
  },
}
</script>

<style scoped>
  textarea.text-aria {
    width: 100%;
    height: 100px;
    margin: 0;
    padding: 10px;
    border: 1px solid #ac29a3;
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;

    background-color: white;
    color: #3F3D56;
    /* box-shadow: 0 0 3px 1px rgba(172, 41, 163, 0.227); */
    
    font-family: Montserrat;
    font-weight: 500;
    font-size: 15px;

    transition: .25s;
    resize: vertical;
  }
 
  textarea.text-aria:focus{
     box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
  }
  textarea.text-aria:hover{
     background-color: rgba(233, 233, 233, 0.253);
  }
  textarea.text-aria.show-error {
  border: 1px solid rgba(218, 2, 2, 1);
  box-shadow: 0 0 3px 1px rgba(218, 2, 2, 0.227);
}

</style>

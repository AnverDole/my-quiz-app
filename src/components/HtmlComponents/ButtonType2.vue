<template>
    <button :disabled="disabled" @click="$emit('click')" class="button-type-2"><slot></slot></button>
</template>

<script>
export default {
  name: 'ButtonType1',
  props: {
    disabled:{
      type: Boolean,
      default: ()=> false,
    }
  },
  methods:{
  }
}
</script>
<style scoped>
  .button-type-2{
    
    padding: 8px 15px;
    margin: 0;
    border: 0;
    color: white;
    background-color: #ac29a3;
    border-radius: 20px;
    transition: .25s;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 15px;
    /* box-shadow: 0 0 3px 1px rgba(172, 41, 163, 0.227); */


    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .button-type-2:hover{
    background-color: #eb1fdd;
    color: white;
  }
  .button-type-2:focus{
     box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
  }

/* button icon */
   .button-type-2 svg{
     margin: 0 5px !important;
   }

  .button-type-2:disabled{
    background-color: #863881 !important;
    cursor: default !important;
  }
</style>

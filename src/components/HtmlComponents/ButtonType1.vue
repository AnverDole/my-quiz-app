<template>
    <button @click="$emit('click')" class="button-type-1"><slot></slot></button>
</template>

<script>
export default {
  name: 'ButtonType1',
  props: {},
  methods:{
  }
}
</script>
<style scoped>
  .button-type-1{
    padding: 8px 15px;
    margin: 0;
    border: 1px solid #ac29a3;
    color: #ac29a3;
    background-color: white;
    border-radius: 5px;
    transition: .25s;
    outline: 0;
    cursor: pointer;

    font-family: Montserrat;
    font-weight: 500;
    font-size: 15px;

     /* box-shadow: 0 0 3px 1px rgba(172, 41, 163, 0.227); */
  }
  .button-type-1:hover{
    background-color: #ac29a3;
    color: white;
  }
  .button-type-1:focus{
     box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
  }
</style>

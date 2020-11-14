<template>
    <button @click="$emit('click')" class="button-type-3"><slot></slot></button>
</template>

<script>
export default {
  name: 'ButtonType3',
  props: {},
  methods:{
  }
}
</script>
<style scoped>
  .button-type-3{
    padding: 8px 15px;
    margin: 0;
    border: none;
    background-color: transparent;
    color: #3f3d56;
    border-radius: 5px;
    transition: .25s;
    /* outline: 0; */
    cursor: pointer;
    border-radius: 50px;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 15px;

    

  }
  .button-type-3:hover{
    background-color: #3f3d56;
    color: white;
    box-shadow: 0 0 3px 1px rgba(172, 41, 163, 0.227);
  }
  .button-type-3:focus{
  }

  
/* button icon */
   .button-type-3 svg:first-child{
     margin-right: 5px;
   }
   .button-type-3 svg:last-child{
     margin-left: 5px;
   }

</style>

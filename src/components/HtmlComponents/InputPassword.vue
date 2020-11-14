<template>
     <input class="input-password" v-bind:class="{ 'show-error':showerror }"  @input="$emit('input', $event.target.value)" type="password" v-bind:placeholder="placeholder">
</template>

<script>
export default {
  name: 'InputEmail',
  props: {
    placeholder: String,
    password: String,
    showerror:Boolean,
  }
}
</script>

<style scoped>
  input.input-password {
    width: 400px;
    height: 40px;
    margin: 0;
    padding: 0 10px;
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
  }
 
  input.input-password:focus{
     box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
  }
  input.input-password:hover{
     background-color: rgba(233, 233, 233, 0.253);
  }
  input.input-password.show-error {
  border: 1px solid rgba(218, 2, 2, 1);
  box-shadow: 0 0 3px 1px rgba(218, 2, 2, 0.227);
}

</style>

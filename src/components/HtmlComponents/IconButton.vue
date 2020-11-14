<template>
    <button @click="$emit('click')" class="icon-button"><slot></slot></button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {},
  methods:{
  }
}
</script>
<style scoped>
  .icon-button{
    padding: 0;
    margin: 0;
    border: none;
    color: #3f3d56;
    background-color: transparent;
    transition: .25s;
    cursor: pointer;
    outline: none;
    border-radius: 100%;
  }
  .icon-button:hover{
    color: #514c91;
  }
  .icon-button:focus{
    box-shadow: 0 0 3px 1px rgba(81, 76, 145, 0.418);
  }
</style>

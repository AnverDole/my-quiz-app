<template>
  <div class="simple-footer">
     <span>Copyright&nbsp;&#169;&nbsp;2020 M.A. Dole</span>
  </div>
</template>

<script>
export default {
  name: 'SimpleFooter',
  props: {}
}
</script>

<style scoped>
  .simple-footer{
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 200px;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
  }
  
  .simple-footer span{
    font-family: Montserrat;
    font-size: 16px;
    color: #3F3D56;
  }

   @media only screen and (max-width: 1080px) {
    .simple-footer{
      padding: 0 100px;
    }
  }
  @media only screen and (max-width: 900px) {
    .simple-footer{
      padding: 0 50px;
    }
  }
  @media only screen and (max-width: 480px) {
    .simple-footer{
      padding: 0 20px;
      justify-content: center;
    }
  }
</style>

<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

  html, body{
    padding: 0;
    margin: 0;
  }
  body{
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #app{
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    width: 100%;
    min-height: 100%;
  }


.component-fade-enter-active, .component-fade-leave-active {
  transition:  .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* v-enter-active */
.component-fade-enter{
  transform: translateY(-5px) scale(1.01);
  /* opacity: 0; */
}
.component-fade-enter-to{
  transform: translateY(0) scale(1);
  opacity: 1;
}


/* v-leave-active */
.component-fade-leave{
  transform: translateY(0);
  opacity: 1;
}
.component-fade-leave-to{
  transform: translateY(5px);
  opacity: 0;
}

</style>
<script>
</script>

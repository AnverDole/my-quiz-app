<template>
  <div class="navigation-bar">
      <ul class="navigation-links">
        <li><router-link :to="{name:'instructor-dashboard'}">Dashboard</router-link></li>
        <li><router-link :to="{name:'instructor-my-exams'}">My exams</router-link></li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "NavigationBar",
  components: {},
  props: {},
  data: function () {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>
  .navigation-bar{
    width: 100%;
    height: 50px;
    background-color: #A7289E;
    padding: 0 200px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    overflow-x: auto;
    box-shadow: 0 0 20px 1px rgba(148, 148, 148, 0.227);
  }


  
ul.navigation-links {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
}
ul.navigation-links li {
  list-style: none;
  float: left;
  
  height: 100%;
  position: relative;
}
ul.navigation-links li a {
  display: flex;
  font-family: Montserrat;
  font-size: 16px;
  text-decoration: none;
  transition: 0.25s;
  line-height: 100%;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  white-space: nowrap;
  color: white;
}
ul.navigation-links li a.router-link-active {
  font-weight: 500;
  
}
/* ul.navigation-links li a.router-link-exact-active {
} */

ul.navigation-links li a:not(.router-link-exact-active):hover {
  background-color: #0000001c;
}

ul.navigation-links li a.router-link-active::before{
  position: absolute;
  content: "";
  background-color: white;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 1px;
  transition: .25s;
  border-radius: 5px;
}


@media only screen and (max-width: 1080px) {
 .navigation-bar{
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
   .navigation-bar{
    padding: 0 50px;
  }
}
@media only screen and (max-width: 480px) {
   .navigation-bar{
    padding: 0 20px;
  }
}
</style>

<template>
  <div class="simple-header">
    <img src="../assets/logo.svg" class="header-logo" />

    <div class="navigation-collapser">
      <div class="line first"></div>
      <div class="line second"></div>
      <div class="line therd"></div>

      <div class="navigation-links">
        <ul>
          <li v-if="!Auth.CheckAuth()">
            <router-link :to="{ name: 'login' }">LOGIN</router-link>
          </li>
          <li v-if="!Auth.CheckAuth()">
            <router-link :to="{ name: 'sign-up' }">SIGN UP</router-link>
          </li>
          <li v-if="Auth.CheckAuth()">
            <span>WELCOME {{ firstname }}!</span>
          </li>
          <li v-if="Auth.CheckAuth()">
            <a href="javascript:void(0)" @click="Logout()">LOGOUT</a>
          </li>
        </ul>
      </div>
    </div>

    <log-out-handler
      ref="logouthandler"/>
  </div>
</template>

<script>
import myquizlib from "../myquizlib/myquizlib";
import LogOutHandler from "../components/LogOutHandler"


export default {
  name: "SimpleHeader",
  components: {
    LogOutHandler,
  },
  props: {},
  data: function () {
    return {
      Auth:myquizlib.Auth,
      firstname:String(myquizlib.Auth.GetAuth().firstname),
    };
  },
  computed: {
  },
  methods: {
      Logout: function(){
        this.$refs.logouthandler.Logout();
      }
  },
};
</script>
<style scoped>
.simple-header {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 0 200px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header-logo {
  width: 100px;
}

.navigation-collapser {
  position: relative;
  border-radius: 5px;

  height: 100%;
  display: flex;
  align-items: center;
}
.navigation-collapser .line {
  display: none;
  position: absolute;
  width: 80%;
  height: 4px;
  background-color: #3f3d56;
  transform: translateY(-50%);
  left: 10%;
  border-radius: 5px;
  transition: 0.25s;
}
.navigation-collapser .line.first {
  top: 20%;
}
.navigation-collapser .line.second {
  top: 50%;
}
.navigation-collapser .line.therd {
  top: 80%;
}
.navigation-collapser:hover .line.first {
  top: 50%;
  transform: rotate(-45deg);
}
.navigation-collapser:hover .line.second {
  opacity: 0;
}
.navigation-collapser:hover .line.therd {
  top: 50%;
  transform: rotate(45deg);
}

.navigation-links {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.navigation-links ul {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}
.navigation-links ul li {
  list-style: none;
  float: left;
  margin-left: 20px;
}
.navigation-links ul li:first-child {
  margin-left: 0;
}
.navigation-links ul li a,
.navigation-links ul li span {
  display: block;
  font-family: Montserrat;
  font-size: 16px;
  text-decoration: none;
  transition: 0.25s;
  color: #3f3d56;
  white-space: nowrap;
}

.navigation-links ul li a.router-link-active {
  color: #3f3d56;
}
.navigation-links ul li a.router-link-exact-active {
  font-weight: 500;
}
.navigation-links ul li a:hover,
.navigation-links ul li a.router-link-active:hover {
  transform: translateY(3px);
}
.navigation-links ul li a.router-link-exact-active:hover {
  transform: none;
}

@media only screen and (max-width: 1080px) {
  .simple-header {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .simple-header {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 480px) {
  .simple-header {
    padding: 0 20px;
    position: relative;
  }

  .navigation-collapser {
    display: block;
    width: 30px;
    height: 30px;
  }
  .navigation-collapser .line {
    display: block;
  }
  .navigation-links {
    opacity: 0;
    transition: 0.25s;
    position: absolute;
    transform: translateY(0) scale(0);
    right: 0;
    top: 100%;
    background: white;
    box-shadow: 0 0 3px 1px rgba(153, 153, 153, 0.227);
    border: 1px solid rgba(128, 128, 128, 0.541);
    border-radius: 5px;
    transform-origin: right top;
  }
  .navigation-collapser:hover .navigation-links {
    opacity: 1;
    transform: translateY(5px) scale(1);
  }

  .navigation-links ul {
    margin: 0;
    display: inline-block;
    align-items: left;
    width: 100%;
    padding: 10px 0;
  }
  .navigation-links ul li {
    display: flex;
    float: none;
    margin-left: 0;
    padding: 0;
  }
  .navigation-links ul li span,
  .navigation-links ul li a {
    display: flex;
    transform: none !important;
    padding: 10px 20px;
    width: 100%;
  }
  .navigation-links ul li:hover a {
    background-color: rgb(233, 233, 233);
  }
}
</style>

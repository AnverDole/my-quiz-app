<template>
  <div class="login-component">
    <simple-header />
    <div class="login-section">
      <div class="first-col">
        <img
          src="../assets/login-illustration.svg"
          class="login-illustration"
        />
      </div>
      <div class="second-col">
        <div v-if="LoginForm.show" class="login-card">
          <span class="title">LOGIN</span>
          <span
            class="form-error"
            v-bind:class="{ show: LoginForm.error.iserror }"
            >{{ LoginForm.error.massage }}</span
          >
          <div class="input-row">
            <span class="label">Email</span>
            <input-email
              class="input-stretch"
              :showerror="emailInput.error.iserror"
              v-model="emailInput.email"
              :placeholder="emailInput.placeholder"
            />
            <span
              class="input-error"
              v-bind:class="{ show: emailInput.error.iserror }"
              >{{ emailInput.error.massage }}</span
            >
          </div>
          <div class="input-row">
            <span class="label">Password</span>
            <input-password
              class="input-stretch"
              :showerror="passwordInput.error.iserror"
              v-model="passwordInput.password"
              :placeholder="passwordInput.placeholder"
            />
            <span
              class="input-error"
              v-bind:class="{ show: passwordInput.error.iserror }"
              >{{ passwordInput.error.massage }}</span
            >
          </div>
          <div class="right-aligned-row">
            <button-type1
              @click="LoginButtonClickEventHandler()"
              class="login-button"
              >Login</button-type1
            >
          </div>
        </div>
        <div
          v-if="!LoginForm.show"
          class="login-animation-card"
          key="login-up-animation"
        >
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span class="wait-massage">Wait a second.</span>
        </div>
      </div>
    </div>
    <simple-footer />
    <div class="back-circle"></div>
  </div>
</template>
<style scoped>
@import url("../assets/css/animations.css");
.login-component {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.login-section {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 200px;
}
.back-circle {
  width: 100vw;
  height: 100vw;
  border-radius: 100%;
  background-color: #ac29a3;
  position: absolute;
  left: 0;
  top: 50%;
  opacity: 0.1;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}

.first-col {
  width: 300px;
}
.login-illustration {
  width: 100%;
}
.second-col {
  width: 350px;
}

.login-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-card span.title {
  font-family: Montserrat;
  font-size: 25px;
  color: #ac29a3;
  text-align: center;
  margin-bottom: 20px;
}

.login-card span.form-error {
  font-family: Montserrat;
  font-size: 15px;
  color: rgba(218, 2, 2, 1);
  margin-bottom: 10px;
  text-align: left;
  font-weight: 400;
  display: none;
}
.login-card span.form-error.show {
  display: block;
}

.input-stretch {
  width: 100% !important;
}
.login-card div.input-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.login-card div.input-row span.label {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  margin-bottom: 5px;
  font-weight: 400;
}
.login-card div.input-row span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
.login-card div.input-row span.input-error.show {
  display: block;
}
.login-card div.auto-max-column {
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
  margin-top: 10px;
}

.login-button {
  padding: 10px 20px;
}

.right-aligned-row {
  display: flex;
  justify-content: flex-end;
}
.frogot-password-link {
  text-decoration: none;
  color: #3f3d56;
  font-size: 15px;
  font-family: Montserrat;
  transition: 0.25s;
  font-weight: 400;
}
.frogot-password-link:hover {
  color: #ac29a3;
}

.login-animation-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-animation-card span.wait-massage {
  font-family: Montserrat;
  font-size: 25px;
  color: #ac29a3;
}
@media only screen and (max-width: 1080px) {
  .login-section {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .login-section {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 780px) {
  .first-col {
    display: none;
  }
  .login-section {
    justify-content: center;
  }
  .back-circle {
    display: none;
  }
}
@media only screen and (max-width: 700px) {
  .back-circle {
    display: none;
  }
  .first-col {
    display: none;
  }
}
@media only screen and (max-width: 480px) {
  .back-circle {
    display: none;
  }
  .first-col {
    display: none;
  }
  .login-section {
    padding: 20px;
  }
  .second-col {
    width: 100%;
  }
}
</style>
<script>
import SimpleHeader from "../components/SimpleHeader";
import SimpleFooter from "../components/SimpleFooter";
import InputEmail from "../components/HtmlComponents/InputEmail";
import InputPassword from "../components/HtmlComponents/InputPassword";
import ButtonType1 from "../components/HtmlComponents/ButtonType1";
import MyQuizLib from "../myquizlib/myquizlib";
import router from "../router";
export default {
  name: "Login",
  components: {
    SimpleHeader,
    SimpleFooter,
    InputEmail,
    InputPassword,
    ButtonType1,
  },
  data: function () {
    return {
      /**
       * init email input's object
       */
      emailInput: {
        email: "",
        placeholder: "Example@gmail.com",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * init password input's objetct
       */
      passwordInput: {
        password: "",
        placeholder: "Password",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * init login form's error message object.
       */
      LoginForm: {
        show: true,
        error: {
          iserror: false,
          massage: "",
        },
      },
    };
  },
  methods: {
    /**
     * handle login button click
     * @returns {void}
     */
    LoginButtonClickEventHandler: function () {
      this.Login(this.emailInput.email, this.passwordInput.password);
    },
    /**
     * Loggin user.
     * @param {string} email
     * @param {string} password
     */
    Login: function (email, password) {
      let self = this;
      //show the login animation.
      self.showLoginAnimation();

      //request login.
      let results = MyQuizLib.Auth.Login(email, password);

      //user is successfully logged.
      results.then(function (response) {
        if (response.accounttype == "INSTRUCTOR") {
          self.RedirectToInstructorDashboard();
        } else {
          self.RedirectToStudentDashboard();
        }
      });
      //error logging user.
      results.catch(function (errors) {
        //set the loggin form errors.
        self.SetLoginFormErrors(errors);
        self.ShowLoginForm();
      });
    },
    /**
     * show login animation.
     * this will hide the login form.
     * @returns {void}
     */
    showLoginAnimation: function () {
      this.LoginForm.show = false;
    },
    /**
     * show login form.
     * this will hide the login animation.
     * @returns {void}
     */
    ShowLoginForm: function () {
      this.LoginForm.show = true;
    },
    /**
     * set loggin form errors.
     * @param {object} response
     * @returns {void}
     */
    SetLoginFormErrors(response) {
      if ("errors" in response) {
        //#region
        if ("email" in response.errors) {
          //set the email field's error message if present.
          this.emailInput.error.massage = Array.from(
            response.errors.email ?? []
          ).join(" ");
          this.emailInput.error.iserror = true;
        } else {
          //clear the previous error.
          this.emailInput.error.massage = null;
          this.emailInput.error.iserror = false;
        }
        //#endregion

        //#region
        if ("password" in response.errors) {
          //set the password field's error if present.
          this.passwordInput.error.massage = Array.from(
            response.errors.password
          ).join(" ");
          this.passwordInput.error.iserror = true;
        } else {
          //clear the previous error.
          this.passwordInput.error.massage = null;
          this.passwordInput.error.iserror = false;
        }
        //#endregion
      }

      //#region
      if ("message" in response) {
        //set the login form error message if present.
        this.LoginForm.error.massage = response.message;
        this.LoginForm.error.iserror = true;
      } else {
        //clear the previous login form error message.
        this.LoginForm.error.massage = null;
        this.LoginForm.error.iserror = false;
      }
      //#endregion
    },
    /**
     * Clear all form errors.
     * @returns {void}
     */
    ClearALlErrors() {
      this.SetLoginFormErrors();
    },
    /**
     * Redirect to the instructor dashboard.
     * @returns {void}
     */
    RedirectToInstructorDashboard() {
      router.push({ name: "instructor-dashboard" });
    },
    /**
     * Redirect to the student dashboard.
     * In this case student will redirect to the myexams page.
     * @returns {void}
     */
    RedirectToStudentDashboard() {
      router.push({ name: "student-my-exams" });
    },
  },
};
</script>

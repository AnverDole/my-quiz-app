<template>
  <div class="sign-up-component">
    <simple-header />
    <div class="sign-up-section">
      <div class="first-col">
        <div v-if="signUpForm.show" class="sign-up-card" key="sign-up-form">
          <span class="title">SIGN UP</span>
          <span
            class="form-error"
            v-bind:class="{ show: signUpForm.error.iserror }"
            >{{ signUpForm.error.massage }}</span
          >

          <div class="input-row">
            <span class="label">Email</span>
            <input-email
              :showerror="emailInput.error.iserror"
              v-model="emailInput.email"
              class="input-stretch"
              :placeholder="emailInput.placeholder"
            />
            <span
              ref="emailErrorSpan"
              class="input-error"
              v-bind:class="{ show: emailInput.error.iserror }"
              >{{ emailInput.error.massage }}</span
            >
          </div>
          <div class="input-row">
            <span class="label">Firstname</span>
            <input-text
              :showerror="firstnameInput.error.iserror"
              v-model="firstnameInput.firstname"
              class="input-stretch"
              :placeholder="firstnameInput.placeholder"
            />
            <span
              ref="emailErrorSpan"
              class="input-error"
              v-bind:class="{ show: emailInput.error.iserror }"
              >{{ emailInput.error.massage }}</span
            >
          </div>
          <div class="input-row">
            <span class="label">Lastname</span>
            <input-text
              :showerror="lastnameInput.error.iserror"
              v-model="lastnameInput.lastname"
              class="input-stretch"
              :placeholder="lastnameInput.placeholder"
            />
            <span
              ref="emailErrorSpan"
              class="input-error"
              v-bind:class="{ show: emailInput.error.iserror }"
              >{{ emailInput.error.massage }}</span
            >
          </div>
          <div class="input-row">
            <div class="type-sign-up">
              <span
                tabindex="0"
                :class="{
                  choice: true,
                  selected: choice == AccountTypes.student,
                }"
                @click="choice = AccountTypes.student"
              >
                I'am student</span
              >
              <span
                tabindex="0"
                :class="{
                  choice: true,
                  selected: choice == AccountTypes.instructor,
                }"
                @click="choice = AccountTypes.instructor"
              >
                I'am instructor</span
              >
            </div>
          </div>

          <div class="input-row">
            <span class="label">Password</span>
            <input-password
              :showerror="passwordInput.error.iserror"
              v-model="passwordInput.password"
              class="input-stretch"
              placeholder="Password"
            />
            <span
              ref="passwordErrorSpan"
              class="input-error"
              v-bind:class="{ show: passwordInput.error.iserror }"
              >{{ passwordInput.error.massage }}</span
            >
          </div>

          <div class="input-row">
            <span class="label">Confirm password</span>
            <input-password
              :showerror="confirmPasswordInput.error.iserror"
              v-model="confirmPasswordInput.password"
              class="input-stretch"
              placeholder="Confirm password"
            />
            <span
              ref="ConfirmPasswordErrorSpan"
              class="input-error"
              v-bind:class="{ show: confirmPasswordInput.error.iserror }"
              >{{ confirmPasswordInput.error.massage }}</span
            >
          </div>

          <div class="auto-max-column">
            <span class="have-account-link"
              >Already have account?&nbsp;<router-link
                class="goto-login-link"
                :to="{ name: 'login' }"
                >Login</router-link
              ></span
            >
            <button-type1
              @click="SignUpButtonClickEventHandler()"
              class="sign-up-button"
              >Signup</button-type1
            >
          </div>
        </div>
        <div
          v-if="!signUpForm.show"
          class="sign-animation-card"
          key="sign-up-animation"
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
      <div class="second-col">
        <img
          v-if="choice == AccountTypes.student"
          src="../assets/student-illustration.svg"
          class="student-illustration"
        />
        <img
          v-if="choice == AccountTypes.instructor"
          src="../assets/instructor-illustration.svg"
          class="instructor-illustration"
        />
      </div>
    </div>
    <simple-footer />
    <div class="back-circle"></div>
  </div>
</template>
<style scoped>
@import url("../assets/css/animations.css");
.sign-up-component {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
/* .second-col{} */
.sign-up-section {
  padding: 0 200px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}
.back-circle {
  width: 100vw;
  height: 100vw;
  border-radius: 100%;
  background-color: #ac29a3;
  position: absolute;
  right: 0;
  top: 50%;
  opacity: 0.1;
  transform: translateX(50%) translateY(-50%);
  z-index: -1;
}

.first-col {
  width: 350px;
}
.second-col {
  width: 300px;
}
.instructor-illustration,
.student-illustration {
  width: 100%;
}

.sign-up-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sign-up-card div.type-sign-up {
  display: grid;
  grid-template-columns: 50% auto;
  grid-gap: 10px;
}
.sign-up-card div.type-sign-up span.choice {
  display: flex;
  align-items: baseline;
  font-family: Montserrat;
  font-size: 18px;
  color: #ac29a3;
  border: 1px solid #ac29a3;
  border-radius: 5px;
  padding: 20px 10px;
  cursor: pointer;
  transition: 0.25s;
  justify-content: center;
  outline: none;
}
.sign-up-card div.type-sign-up span.choice:hover {
  background-color: rgba(233, 233, 233, 0.253);
}
.sign-up-card div.type-sign-up span.choice:focus {
  box-shadow: 0 0 0px 3px rgba(172, 41, 163, 0.227);
}
.sign-up-card div.type-sign-up span.choice.selected {
  color: white;
  background-color: #ac29a3;
}
.sign-up-card div.type-sign-up span.choice input[type="radio"] {
  margin-right: 5px;
}
.sign-up-card span.title {
  font-family: Montserrat;
  font-size: 25px;
  color: #ac29a3;
  text-align: center;
  margin-bottom: 20px;
}
.input-stretch {
  width: 100% !important;
}

.sign-up-card span.form-error {
  font-family: Montserrat;
  font-size: 15px;
  color: rgba(218, 2, 2, 1);
  margin-bottom: 10px;
  text-align: left;
  font-weight: 400;
  display: none;
}
.sign-up-card span.form-error.show {
  display: block;
}

.sign-up-card div.input-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.sign-up-card div.input-row span.label {
  font-family: Montserrat;
  font-size: 18px;
  color: #3f3d56;
  margin-bottom: 5px;
  font-weight: 400;
}
.sign-up-card div.input-row span.input-error {
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(218, 2, 2, 1);
  margin-top: 5px;
  font-weight: 400;
  display: none;
}
.sign-up-card div.input-row span.input-error.show {
  display: block;
}
.sign-up-card div.auto-max-column {
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
  margin-top: 10px;
}

.sign-up-button {
  padding: 10px 20px;
  /* font-size: 18px; */
}

.have-account-link {
  color: #3f3d56;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: 400;
}
.goto-login-link {
  text-decoration: none;
  color: #3f3d56;
  font-size: 15px;
  font-family: Montserrat;
  transition: 0.25s;
  font-weight: 400;
}
.goto-login-link:hover {
  color: #ac29a3;
}

.sign-animation-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sign-animation-card span.wait-massage {
  font-family: Montserrat;
  font-size: 25px;
  color: #ac29a3;
}

@media only screen and (max-width: 1080px) {
  .sign-up-section {
    padding: 0 100px;
  }
}
@media only screen and (max-width: 900px) {
  .sign-up-section {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 780px) {
  .second-col {
    display: none;
  }
  .sign-up-section {
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
  .second-col {
    display: none;
  }
}
@media only screen and (max-width: 480px) {
  .back-circle {
    display: none;
  }
  .second-col {
    display: none;
  }
  .sign-up-section {
    padding: 20px;
  }
  .first-col {
    width: 100%;
  }
  div.type-sign-up {
    /* display: grid;
    grid-template-columns: max-content !important;
    grid-gap: 10px;
    justify-content: left !important; */
    /* margin: 10px 0; */
  }
}
</style>
<script>
import SimpleHeader from "../components/SimpleHeader";
import SimpleFooter from "../components/SimpleFooter";
import InputEmail from "../components/HtmlComponents/InputEmail";
import InputText from "../components/HtmlComponents/InputText";
import InputPassword from "../components/HtmlComponents/InputPassword";
import ButtonType1 from "../components/HtmlComponents/ButtonType1";
import MyQuizLib from "../myquizlib/myquizlib";
import Router from "../router";

export default {
  name: "StudentSignUp",
  components: {
    SimpleHeader,
    SimpleFooter,
    InputEmail,
    InputPassword,
    ButtonType1,
    InputText,
  },
  data: function () {
    return {
      /**
       * set the initial signup account type.
       */
      choice: MyQuizLib.AccountTypes.student,
      /**
       * set the email input's initial object.
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
       * set the first name input's initial object.
       */
      firstnameInput: {
        firstname: "",
        placeholder: "First name",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * set the last name input's initial object.
       */
      lastnameInput: {
        lastname: "",
        placeholder: "Last name",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * set the password input's initial object.
       */
      passwordInput: {
        password: "",
        placeholder: "Password...",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * set the confirm password input's initial object.
       */
      confirmPasswordInput: {
        password: "",
        placeholder: "Confirm password...",
        error: {
          iserror: false,
          massage: "",
        },
      },
      /**
       * set the signup form's initial object.
       */
      signUpForm: {
        show: true,
        error: {
          iserror: false,
          massage: "",
        },
      },
    };
  },
  created: function () {
    this.AccountTypes = MyQuizLib.AccountTypes;
  },
  methods: {
    /**
     * Handle the signup button click.
     * @returns {void}
     */
    SignUpButtonClickEventHandler: function () {
      console.log(this.firstnameInput.firstname);
      this.SignUp(
        this.emailInput.email,
        this.firstnameInput.firstname,
        this.lastnameInput.lastname,
        this.passwordInput.password,
        this.confirmPasswordInput.password,
        this.choice
      );
    },
    /**
     * Sign up user.
     * @param {string} email
     * @param {string} firstname
     * @param {string} lastname
     * @param {string} password
     * @param {string} confirm_password
     * @param {string} account_type
     * @returns {void}
     */
    SignUp(email, firstname, lastname, password, confirmpassword, accounttype) {
      let self = this;
      //hide the sign up form and show the signup animation.
      self.ShowSignUpAnimation();
      //send signup request.
      let results = MyQuizLib.Auth.SignUp(
        email,
        firstname,
        lastname,
        password,
        confirmpassword,
        accounttype
      );
      //user was successfully signed up.
      results.then(function (response) {
        console.log(response);

        //redirect the user to main page.
        if (response.accounttype == "INSTRUCTOR") {
          self.RedirectToInstructorDashboard();
        } else {
          self.RedirectToStudentDashboard();
        }
      });
      //error sign up the user.
      results.catch(function (errors) {
        self.SetSignUpFormErrors(errors);
        self.ShowSignUpForm();
      });
    },
    /**
     * Show the sign up form.
     * This will hide the sign up animation.
     * @returns {void}
     */
    ShowSignUpForm() {
      this.signUpForm.show = true;
    },
    /**
     * Show the sign up form animation.
     * This will hide the sign up form.
     * @returns {void}
     */
    ShowSignUpAnimation() {
      this.signUpForm.show = false;
    },

    /**
     * Show the form errors.
     * @param {object} response
     * @returns {void}
     */
    SetSignUpFormErrors(response) {
      //check the errors property exists in the response object.
      if ("errors" in response) {
        //#region
        if ("email" in response.errors) {
          //show email errors when email property exists in the response object.
          this.emailInput.error.massage = Array.from(
            response.errors.email
          ).join(" ");
          this.emailInput.error.iserror = true;
        } else {
          // clear the previous error message if exists.
          this.emailInput.error.massage = null;
          this.emailInput.error.iserror = false;
        }
        //#endregion

        //#region
        if ("password" in response.errors) {
          //show passwors errors when passwors property exists in the response object.
          this.passwordInput.error.massage = Array.from(
            response.errors.password
          ).join(" ");
          this.passwordInput.error.iserror = true;
        } else {
          // clear the previous error message if exists.
          this.passwordInput.error.massage = null;
          this.passwordInput.error.iserror = false;
        }
        //#endregion

        //#region
        if ("password_confirmation" in response.errors) {
          //show password_conformation errors when password_conformation property exists in the response object.
          this.confirmPasswordInput.error.massage = Array.from(
            response.errors.password_confirmation
          ).join(" ");
          this.confirmPasswordInput.error.iserror = true;
        } else {
          // clear the previous error message if exists.
          this.confirmPasswordInput.error.massage = null;
          this.confirmPasswordInput.error.iserror = false;
        }
        //#endregion
      }

      //#region
      if ("message" in response) {
        //show form error messages when message property exists in the response object.
        this.signUpForm.error.massage = response.message;
        this.signUpForm.error.iserror = true;
      } else {
        // clear the previous error message if exists.
        this.signUpForm.error.massage = null;
        this.signUpForm.error.iserror = false;
      }
      //#endregion
    },
    /**
     * Clear all the form errors.
     * @returns {void}
     */
    ClearALlErrors() {
      this.SetSignUpFormErrors();
    },
    /**
     * Redirect to the instructor dashboard.
     * @returns {void}
     */
    RedirectToInstructorDashboard() {
      Router.push({ name: "instructor-dashboard" });
    },
    /**
     * Redirect to the student dashboard.
     * In this case student will redirect to the myexams page.
     * @returns {void}
     */
    RedirectToStudentDashboard() {
      Router.push({ name: "student-my-exams" });
    },
  },
};
</script>

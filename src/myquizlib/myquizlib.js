import store from '../store'
import Axios from 'axios';
import router from '../router'

let myquizlibData = {
   /**
    * @constant endpoints is store the api endpoint urls. 
    */
   endpoints: {
      login: "https://my-quiz-api.herokuapp.com/api/login",
      register: "https://my-quiz-api.herokuapp.com/api/register",
      logout: "https://my-quiz-api.herokuapp.com/api/logout",
      subjects: "https://my-quiz-api.herokuapp.com/api/subjects",
      instructor: {
         exam: "https://my-quiz-api.herokuapp.com/api/instructor/exams/exam",
         deleteexam: "https://my-quiz-api.herokuapp.com/api/instructor/exam/delete",
         newexam: "https://my-quiz-api.herokuapp.com/api/instructor/exams/new-exam",
         editexam: "https://my-quiz-api.herokuapp.com/api/instructor/exams/edit-exam",
         exams: "https://my-quiz-api.herokuapp.com/api/instructor/exams",
      },
      student: {
         takeexam: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/take",
         saveexam: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/take/save",
         examattemptinfo: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/take/info",
         examattemptsummery: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/take/summery",
         submitexam: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/take/submit",
         examinfo: "https://my-quiz-api.herokuapp.com/api/student/exams/exam/info",
         exams: "https://my-quiz-api.herokuapp.com/api/student/exams",
         finishedexams: "https://my-quiz-api.herokuapp.com/api/student/exams/finished",
      },
   },
   /**
    * @constant config this object will attach to all axious requests. 
    */
   config: {
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
      }
   },
   /**
    * this template is use for the request error message handler. 
    * @see \Components\RequestMessageHandler.vue
    */
   errortemplate: {
      message: "",
      can_retry: false,
      can_go_back: false,
      can_dissmiss: false,
   },
   /**
    * @constant storagekeys key for the localStorage Auth
    */
   storagekeys: { authkey: "my-quiz-auth" },
   /**
    * @constant accounttypes User types. 
    */
   accounttypes: { student: 'STUDENT', instructor: 'INSTRUCTOR' },
   /**
    * this object has all the function assosiated with auth. 
    */
   auth: {
      /**
       * check the user is authenticated. 
       * this will only check only the client side. 
       * @returns {boolean}
       */
      CheckAuth: function () {
         let auth = store.getters['getAuth'];
         return auth.logged;
      },
      /**
       * clear the auth data from client side. 
       * @returns {void}
       */
      clearAuth: function () {
         store.dispatch('clearAuth');
         router.push({ name: "login" });
      },
      /**
       * get the authentication data
       * @returns {object}
       */
      GetAuth: function () {
         let auth = store.getters['getAuth'];
         return {
            email: auth.email,
            firstname: auth.firstname,
            lastname: auth.lastname,
            token: auth.token,
            accounttype: auth.accounttype,
         }
      },
      /**
       * send the signup request.
       * @param {string} email 
       * @param {string} firstname 
       * @param {string} lastname 
       * @param {string} password 
       * @param {string} password_confirmation 
       * @param {string} accounttype 
       * @returns {Promise}
       */
      SignUp: function (email, firstname, lastname, password, password_confirmation, accounttype) {
         return new Promise(function (resolve, reject) {
            let data = {
               email: email,
               firstname: firstname,
               lastname: lastname,
               password: password,
               password_confirmation: password_confirmation,
               account_type: accounttype,
            };

            //send request
            let results = Axios.post(myquizlibData.endpoints.register, data, myquizlibData.config);
            //signup successfull.
            results.then(function (response) {
               let data = response.data;
               console.log(data);
               store.dispatch('setAuth', {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email,
                  token: data.accessToken,
                  accounttype: data.account_type,
                  logged: true
               });

               resolve({
                  success: true,
                  email: email,
                  firstname: firstname,
                  lastname: lastname,
                  token: data.accessToken,
                  account_type: data.account_type,
               });

            });

            //error signup.
            results.catch(function (result) {
               let errordata = result.response.data;
               if ("errors" in errordata) {
                  reject({
                     success: false,
                     errors: errordata.errors,
                     message: errordata.message
                  });
               } else {
                  reject({
                     success: false,
                     message: "Somthing was wrong! please try again."
                  });
               }
            });
         })
      },
      /**
       * send the login request. 
       * @param {string} email 
       * @param {string} password 
       * @returns {Promise}
       */
      Login: function (email, password) {
         return new Promise(function (resolve, reject) {
            let data = {
               email: email,
               password: password
            };

            //send the request. 
            let results = Axios.post(myquizlibData.endpoints.login, data, myquizlibData.config);
            //user is successfully logged. 
            results.then(function (response) {
               console.log(response)
               let data = response.data;

               store.dispatch('setAuth', {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email,
                  token: data.accessToken,
                  accounttype: data.account_type,
                  logged: true
               });

               resolve({
                  success: true,
                  email: email,
                  token: data.accessToken,
                  accounttype: data.account_type,
                  password: password
               });

            });

            //error login.
            results.catch(function (error) {
               console.log(error.response);
               let errordata = error.response.data;
               if ("errors" in errordata) {
                  reject({
                     success: false,
                     errors: errordata.errors,
                     message: errordata.message
                  });
               } else {
                  reject({
                     success: false,
                     message: "Somthing was wrong! please try again."
                  });
               }
            });
         })
      },
      /**
       * Logout the user. 
       * @returns {Promise}
       */
      Logout: function () {
         return new Promise(function (resolve, reject) {
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;

            let results = Axios.post(myquizlibData.endpoints.logout, {}, autherisedheader);

            results.then(function () {
               store.dispatch("clearAuth");
               localStorage.clear();
               resolve();
            });

            results.catch(function (result) {
               reject(result.response);
            });
         });
      },
      /**
       * Check the current user is instructor. 
       * @returns {boolean}
       */
      isInstructor: function () {
         let auth = store.getters['getAuth'];
         return auth.accounttype == myquizlibData.accounttypes.instructor;
      },
      /**
       * check the current user is student. 
       * @returns {boolean}
       */
      isStudent: function () {
         let auth = store.getters['getAuth'];
         return auth.accounttype == myquizlibData.accounttypes.student;
      },
   },
   /**
    * this object contains all the function that assosiated with student. 
    */
   students: {
      /**
       * get the exam info. 
       * @param {object} data 
       * @returns {Promise}
       */
      getExamInfo: function (data) {
         return new Promise(function (resolve, reject) {
            //attach the autherization header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;

            //send request. 
            let results = Axios.post(myquizlibData.endpoints.student.examinfo, data, autherisedheader);
            ///request was successfull.
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * get the exam attempt summery.
       * @param {object} data 
       * @returns {Promise}
       */
      getAttemptSummery: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autherization header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request. 
            let results = Axios.post(myquizlibData.endpoints.student.examattemptsummery, data, autherisedheader);
            //request was successfull. 
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               errordata.can_go_back = true;
               reject(errordata);
            });
         })
      },
      /**
       * get all the exams. 
       * @param {string} data 
       * @returns {Promise}
       */
      getMyExams: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autherisation header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request.
            let results = Axios.post(myquizlibData.endpoints.student.exams, data, autherisedheader);
            //request was successfull. 
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * get the finished/inproggress exams. 
       * @param {string} data 
       * @returns {Promise}
       */
      getFinishedExams: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autherization header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send requesst header.
            let results = Axios.post(myquizlibData.endpoints.student.finishedexams, data, autherisedheader);
            //request was successfull. 
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * take the exam.
       * @param {object} data 
       * @returns {Promise}
       */
      takeExam: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autheriztion  header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request. 
            let results = Axios.post(myquizlibData.endpoints.student.takeexam, data, autherisedheader);
            //request was successfull. 
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * save the in proggress exam. 
       * this will only save the exam not submit. 
       * @param {object} data
       * @returns {Promise} 
       */
      saveExam: function (data) {
         return new Promise(function (resolve, reject) {
            //attach the autherization header.
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;

            //send the requset. 
            let results = Axios.post(myquizlibData.endpoints.student.saveexam, data, autherisedheader);
            //request is successfull.
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild. 
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * get the exam attempt info. 
       * this will get the inproggress exam's info(duration...).
       * @param {object} data 
       * @returns {object}
       */
      atteptInfo: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autherization header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //request header. 
            let results = Axios.post(myquizlibData.endpoints.student.examattemptinfo, data, autherisedheader);
            //request was successfull. 
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               errordata.can_go_back = true;
               reject(errordata);
            });
         })
      },
      /**
       * submit the inproggress exam. 
       * @param {object} data 
       * @return {Promise}
       */
      submitExam: function (data) {
         return new Promise(function (resolve, reject) {
            //attach the autherization header.
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //request was successfull.
            let results = Axios.post(myquizlibData.endpoints.student.submitexam, data, autherisedheader);
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               errordata.can_dissmiss = true;
               reject(errordata);
            });
         })
      },
   },
   /**
    * this object has all functions assosiated with instructor.
    */
   instructor: {
      /**
       * get the (currently logged)instructor created exams. 
       * @param {object} data
       * @return {Promise}
       */
      getMyExams: function (data) {
         return new Promise(function (resolve, reject) {
            //attach autherization header. 
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request. 
            let results = Axios.post(myquizlibData.endpoints.instructor.exams, data, autherisedheader);
            //request was successfull.
            results.then(function (response) {
               resolve(response.data);
            });
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error
               }

               errordata.message = "Somthing was wrong!";
               errordata.can_retry = true;
               reject(errordata);
            });
         })
      },
      /**
       * get the spesific exam. 
       * can only request (currently logged)instructor created exam. 
       * @param {object} examid 
       * @returns {Promise}
       */
      getMyExam: function (examid) {
         return new Promise(function (resolve, reject) {
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;

            let results = Axios.post(myquizlibData.endpoints.instructor.exam, { exam: examid }, autherisedheader);
            results.then(function (response) {
               console.log(response.data);
               resolve(response.data);

            });
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) { myquizlibData.auth.clearAuth(); }
                  else if (error.response?.status == 422) {
                     if (error?.response?.data?.errors.exam.length > 0) {
                        errordata.message = Array.from(error?.response?.data?.errors.exam).join(" ");
                     } else {
                        errordata.message = "Somthing was wrong!";
                     }
                     errordata.can_retry = true;
                     errordata.can_go_back = true;
                     reject(errordata);
                     return;
                  }


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error

               }

               errordata.message = "Unknown error occured!";
               errordata.can_retry = true;
               errordata.can_dissmiss = false;
               errordata.can_go_back = true;
               reject(errordata);
            });
         })
      },
      /**
       * delete spesific exam. 
       * this can only delete the (currently logged)instructor created exam
       * @param {object} examid 
       */
      deleteMyExam: function (examid) {
         return new Promise(function (resolve, reject) {
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;

            let results = Axios.post(myquizlibData.endpoints.instructor.deleteexam, { exam: examid }, autherisedheader);
            results.then(function (response) {
               console.log(response.data);
               resolve(response.data);

            });
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();

               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error

               }

               errordata.message = "Unknown error occured!";
               errordata.can_retry = true;
               errordata.can_dissmiss = true;
               reject(errordata);
            });
         })
      },
      /**
       * create new exam.
       * @param {object} exam 
       * @return {Promise}
       */
      newExam: function (exam) {
         return new Promise(function (resolve, reject) {
            //attach autherization header.
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request. 
            let results = Axios.post(myquizlibData.endpoints.instructor.newexam, exam, autherisedheader);
            //requset was faild.
            results.catch(function (error) {
               console.log(error);
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();

                  errordata.message = "Somthing was wrong!";
                  let data = error.response.data;
                  if ("errors" in data) {
                     errordata.validationerrors = {
                        success: false,
                        errors: data.errors,
                        message: data.message,
                     };
                     reject(errordata);
                     return;
                  }


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error

               }

               errordata.message = "Unknown error occured!";
               errordata.can_retry = true;
               errordata.can_dissmiss = true;
               reject(errordata);
            });
            // request was success.
            results.then(function (response) {
               console.log(response);
               let data = response.data;
               resolve({
                  data: data,
               });
            });


         })
      },
      /**
       * edit (currently logged)instructor's spesific exam. 
       * @param {object} exam 
       * @return {param}
       */
      editExam: function (exam) {
         return new Promise(function (resolve, reject) {
            //attach autherization header.
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send request header.
            let results = Axios.post(myquizlibData.endpoints.instructor.editexam, exam, autherisedheader);
            //request was successfull.
            results.then(function (response) {
               let data = response.data;
               resolve({
                  data: data,
               });
            });
            //request was faild.
            results.catch(function (error) {


               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();

                  errordata.message = "Somthing was wrong!";
                  let data = error.response.data;
                  if ("errors" in data) {
                     errordata.validationerrors = {
                        success: false,
                        errors: data.errors,
                        message: data.message,
                     };
                     reject(errordata);
                     return;
                  }


               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error

               }

               errordata.message = "Unknown error occured!";
               errordata.can_retry = true;
               errordata.can_dissmiss = true;
               reject(errordata);
            });
         })
      },
   },
   /**
    * this object has all functions assosiate with subjects.
    */
   subjects: {
      /**
       * get all subjects.
       * @return {Promise} 
       */
      getAllSubjects: function () {
         return new Promise(function (resolve, reject) {
            //attach autherization header.
            let autherisedheader = myquizlibData.config;
            autherisedheader.headers.Authorization = `Bearer ${store.getters['getAuth'].token}`;
            //send requset
            let results = Axios.post(myquizlibData.endpoints.subjects, {}, autherisedheader);
            //request was faild.
            results.catch(function (error) {
               let errordata = Object.create(myquizlibData.errortemplate);
               if (error.response) {
                  // The request was made and the server responded with a status code

                  //check autherization error.
                  if (error.response?.status == 401) myquizlibData.auth.clearAuth();
               } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

               } else {
                  // Something happened in setting up the request that triggered an Error

               }

               errordata.message = "Unknown error occured!";
               errordata.can_retry = true;
               errordata.can_dissmiss = false;
               reject(errordata);
            });
            //request was successfull.
            results.then(function (response) {
               console.log(response.data.subjects);
               resolve(response.data);
            });
         })
      }
   },
};
export default {
   AccountTypes: myquizlibData.accounttypes,
   Auth: myquizlibData.auth,
   Students: myquizlibData.students,
   Instructor: myquizlibData.instructor,
   Exams: myquizlibData.exams,
   Subjects: myquizlibData.subjects,
}

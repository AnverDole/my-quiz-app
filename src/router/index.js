import Vue from 'vue'
import VueRouter from 'vue-router'
import myquizlib from "../myquizlib/myquizlib"
Vue.use(VueRouter)
const allroutenames = {
  authroutes: [
    { name: "login" },
    { name: "sign-up" },
  ],
  studentroutes: [
    { name: "student-all-exams" },
    { name: "student-my-exams" },
    { name: "student-exam-info" },
    { name: "student-take-exam" },
    { name: "student-finish-exam" },
    { name: "student-exam-attempt-summery" },
  ],
  instructorroutes: [
    { name: "instructor-dashboard" },
    { name: "instructor-my-exams" },
    { name: "instructor-view-exam" },
    { name: "instructor-edit-exam" },
    { name: "instructor-new-exam" },
  ],
};
const routes = [
  //#region  authentication routes. 
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  //#endregion

  //#region instructors routes. 
  {
    path: '/instructor/dashboard',
    name: 'instructor-dashboard',
    component: () => import('../views/instructor/dashboard.vue')
  },
  {
    path: '/instructor/my-exams',
    name: 'instructor-my-exams',
    component: () => import('../views/instructor/myexams.vue')
  },
  {
    path: '/instructor/my-exams/:examid/view',
    name: 'instructor-view-exam',
    component: () => import('../views/instructor/viewexam.vue')
  },
  {
    path: '/instructor/my-exams/:examid/edit',
    name: 'instructor-edit-exam',
    component: () => import('../views/instructor/editexam.vue')
  },
  {
    path: '/instructor/my-exams/new',
    name: 'instructor-new-exam',
    component: () => import('../views/instructor/newexam.vue')
  },
  //#endregion

  //#region  students routes 
  {
    path: '/student/all-exams',
    name: 'student-all-exams',
    component: () => import('../views/student/allexams.vue')

  },
  {
    path: '/student/my-exams',
    name: 'student-my-exams',
    component: () => import('../views/student/myexams.vue')
  },
  {
    path: '/student/my-exams/:examid/info',
    name: 'student-exam-info',
    component: () => import('../views/student/examinfo.vue')
  },
  {
    path: '/student/my-exams/:examid/face',
    name: 'student-take-exam',
    component: () => import('../views/student/takeexam.vue')
  },
  {
    path: '/student/my-exams/:examid/face/attempt/:answersheetid/finish',
    name: 'student-finish-exam',
    component: () => import('../views/student/finishexam.vue')
  },
  {
    path: '/student/my-exams/:examid/face/attempt/summery',
    name: 'student-exam-attempt-summery',
    component: () => import('../views/student/examsummery.vue')
  },
  //#endregion
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/NotFound.vue")
  }
]



const router = new VueRouter({
  routes
})

/**
 * define the route middleweres.
 */
router.beforeEach((to, from, next) => {
  if (isAuthenticationRoute(to.name)) {//the requested route is authentication route. 

    if (authed()) gotoUsersMainPage(next); //if the user is already logged rediret to the main page.
    else next();

  } else if (isInstructorRoute(to.name)) { //the requested route is instructors route. 

    if (!authed()) gotoLogin(next); //if user not logged redirect to the login page. 
    else if (!myquizlib.Auth.isInstructor()) gotoUsersMainPage(next); // if the user is not a instructor then redirect to the correct main page. 
    else next();

  } else if (isStudentRoute(to.name)) { //the requested route is student route. 

    if (!authed()) gotoLogin(next); //if the user not logged then redirect to the login page. 
    else if (!myquizlib.Auth.isStudent()) gotoUsersMainPage(next); // if the user is not student redirect to the correct main page. 
    else next();

  } else if (to.path == "/") {
    if (authed()) gotoUsersMainPage(next); // if user alredy logged then redirect to the main page. 
    else gotoLogin(next); //else goto login page.
  }
  else next();
})

/**
 * check the user is alredy logged. 
 * @returns {boolean}
 */
function authed() {
  return myquizlib.Auth.CheckAuth();
}
/**
 * check the user is student. 
 * @returns {boolean}
 */
function checkAuthStudent() {
  return myquizlib.Auth.isStudent();
}

/**
 * check the user is instructor. 
 * @returns {void}
 */
function checkAuthInstructor() {
  return myquizlib.Auth.isInstructor();
}
/**
 * goto login page. 
 * @param {CallableFunction} next 
 * @returns {void}
 */
function gotoLogin(next) {
  next({ name: "login" });
}
/**
 * goto users main page. 
 * if the user is instructor the main page is "instructor's dashboard". 
 * if the user is strudent the main page is student's "my exams" page
 * @param {CallableFunction} next 
 */
function gotoUsersMainPage(next) {
  if (checkAuthStudent()) {
    next({ name: "student-my-exams" });
  } else if (checkAuthInstructor()) {
    next({ name: "instructor-dashboard" });
  }
}

/**
 * check the given route is authentication route.
 * eg: signup, login..
 * @param {string} routename 
 * @returns {boolean}
 */
function isAuthenticationRoute(routename) {
  let isauthroute = false;
  allroutenames.authroutes.forEach(route => {
    isauthroute |= route.name == routename;
  });
  return isauthroute;
}
/**
 * check the given route is student page route. 
 * @param {string} routename 
 * @returns {boolean}
 */
function isStudentRoute(routename) {
  let isstudentroute = false;
  allroutenames.studentroutes.forEach(route => {
    isstudentroute |= route.name == routename;
  });
  return isstudentroute;
}

/**
 * check the given route is instructor page route. 
 * @param {string} routename 
 * @returns {boolean}
 */
function isInstructorRoute(routename) {
  let isinstructorroute = false;
  allroutenames.instructorroutes.forEach(route => {
    isinstructorroute |= route.name == routename;
  });
  return isinstructorroute;
}


export default router

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MainApp from './MainApp'
import router from './router'

import { getUser } from './utilities/DatabaseUtilities'

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

Vue.config.productionTip = false

let app; 
window.StasheApp = {};

// Initialize Firebase
// TODO place in a dedicated config file on production
var firebaseConfig = {
  apiKey: "AIzaSyDFggnFDSb1eeliaV1n2W9leKFfVR4P-D4",
  authDomain: "stashe-app.firebaseapp.com",
  databaseURL: "https://stashe-app.firebaseio.com",
  projectId: "stashe-app",
  storageBucket: "stashe-app.appspot.com",
  messagingSenderId: "49563228206"
};
firebase.initializeApp(firebaseConfig);


// Do some validation before each navigation, 
// like ensuring the user is logged in on any protected webpages
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => { return route.meta.requiresAuth });
  const currentUser = firebase.auth().currentUser;

  // TODO consider redirecting case when route is login, 
  // but user is already logged in
  if(requiresAuth && !currentUser) {
    next('login');
  } else if(requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});


function startApp() {
  return new Vue({
    el: '#stashe-web-app',
    router,
    components: { MainApp },
    template: '<MainApp/>'
  })
}

/* eslint-disable no-new */
// ensure that the user object is properly set before starting the app
firebase.auth().onAuthStateChanged( function(authenticatedUser) {
  
  if (authenticatedUser) {

    getUser(authenticatedUser.uid, false)
      .then(currentUser => { 

        window.StasheApp.CurrentUser = currentUser;
        if (!app) { app = startApp() }
      });

  } else {

    window.StasheApp.CurrentUser = undefined;
    if (!app) { app = startApp() }
  }
  
});

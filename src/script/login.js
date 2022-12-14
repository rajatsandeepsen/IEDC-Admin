import {allOptions} from "./options.js";
import {closeLoading,OpenLoading,clearValue} from "./main.js";
//firebase init
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
                apiKey: "AIzaSyCNbmkHVo6YAOk69h9OgMGbQJBUlW5xz4c",
                authDomain: "iedc-admin.firebaseapp.com",
                projectId: "iedc-admin",
                // databaseURL: "https://DATABASE_NAME.firebaseio.com",
                storageBucket: "iedc-admin.appspot.com",
                messagingSenderId: "200933316108",
                appId: "1:200933316108:web:8b5d08b6295d0962ec8029"
            };
initializeApp(firebaseConfig);


import { getFirestore } from "firebase/firestore";
export const DB  = getFirestore();
 
import { getStorage } from "firebase/storage";
export const storage = getStorage();

// firebase auth
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const auth = getAuth();

// firebase auth init
export function authINIT(){
    onAuthStateChanged(auth, user => {
        if (user) {
        console.log('user logged in: ', user.email);

        OpenLoading();
        $("#app").load( "forms/options.html", ()=> {

          allOptions();//dont touch anything here
          closeLoading();
        });

      }
      else {
        console.log('user logged out or no user at all');
        loadLoginPage();
      }
    });
}


export function authLogout(){
  signOut(auth).then(() => {
      console.log('user signed out')
      alert("user signed out");
      loadLoginPage();
    })
    .catch(err => {
      console.log(err.message)
      alert(err.message);
    })
}


// login page load
function loadLoginPage(){
    OpenLoading();
    $("#app").load( "forms/login.html", ()=> {

          console.log("login page loaded");
          const loginForm = document.getElementById("loginform");
          loginForm.addEventListener('submit',e => {

              e.preventDefault();
              console.log("pre auth");

              // get user info
              const email = loginForm.email.value;
              const password = loginForm.password.value;
              console.log(password);

              // log the user in
              signInWithEmailAndPassword(auth, email, password).then((cred) => {
                  console.log('user logined in:', cred.user);
                  loginForm.reset();
                  $("#app").load( "forms/options.html", ()=> {
                    allOptions();//dont touch anything here
                  });
              })
              .catch((err) => {
                  console.log("auth is not done brww, just try again");
                  console.log(err);
                  clearValue("password");
              })

          })
          closeLoading();
    });
}
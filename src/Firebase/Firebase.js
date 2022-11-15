 
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';

import firebase from "firebase";
import 'firebase/auth' 
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBZ8MKM9GDtBfNHURODmQhLk13k9u51J8Q",
    authDomain: "fir-278af.firebaseapp.com",
    projectId: "fir-278af",
    storageBucket: "fir-278af.appspot.com",
    messagingSenderId: "633315159669",
    appId: "1:633315159669:web:166f029356d0b1566b523c",
    measurementId: "G-LWBQT3WG8Y"
  };

  

  export  default firebase.initializeApp(firebaseConfig)
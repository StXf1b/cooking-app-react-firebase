import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDlYGfV4Uz1hFIWp3AknrqLaIhGM0mZDRc",
    authDomain: "cooking-ninja-project-1.firebaseapp.com",
    projectId: "cooking-ninja-project-1",
    storageBucket: "cooking-ninja-project-1.appspot.com",
    messagingSenderId: "644188372085",
    appId: "1:644188372085:web:0d004a590e6db71016cc3c"
};

// init firebase app
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();

export { projectFirestore };

import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; //authentication

//CRUD ACTIONS
const firebaseConfig = {
    apiKey: "AIzaSyCM2qJR3NEizMfm6SxYFzq5Y4ykNyyD9HM",
    authDomain: "crwn-clothing-db-ac844.firebaseapp.com",
    projectId: "crwn-clothing-db-ac844",
    storageBucket: "crwn-clothing-db-ac844.appspot.com",
    messagingSenderId: "916332419009",
    appId: "1:916332419009:web:fcf81b23e3647d6209c140"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account" // everytime user signs in, have to select an account

  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
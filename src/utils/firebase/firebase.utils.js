//diff services
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; //authentication
//doc: get doc instance, getDoc/setDoc: get/set doc data
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account" // everytime user signs in, have to select an account

  })


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore(); //get firestore database

  export const createUserDocumentFromAuth = async(userAuth) => {
    //ref: a special object firestore uses when talking about instance of a document model
    const userDocRef = doc(db, 'users', userAuth.uid);
    //                      user collection   unique identifier

    //snapshot: data
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try {
        await setDoc(userDocRef, {displayName, email, createAt});
      } catch (error) {
        console.log("error creating the user", error.message);

      }
    }
    return userDocRef;
  } 
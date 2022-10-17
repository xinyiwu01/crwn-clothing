// isolate our app with 3rd party implementation, like google firestore
//diff services
import {initializeApp} from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'; //authentication
//doc: get doc instance, getDoc/setDoc: get/set doc data
import {
  getFirestore,
  doc,
  getDoc,
  setDoc, 
  collection, 
  writeBatch,
  query,
  getDocs
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
                                           // eg. user as key, store user info
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd /*, fieldValue)*/ ) => {
                                                                                  ///fieldValue="title"
    const collectionRef = collection(db, collectionKey);
    // shop data
    /**
     * like bank transaction: use batch in firestore to implement
     * unit of work: both work, account1 -100, account2 +100
     */
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {  //object[fieldValue].toLowerCase
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object); // set object to reference of docRef, works even ref doesn't exist
    })
    await batch.commit();
    console.log("done");
  }
   
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
         // snapshpt: actual data
    const querySnapShot = await getDocs(q);
                                  //.docs: diff documents
                                  return querySnapShot.docs.map(docSnapShot => docSnapShot.data());
    // const categoryMap = querySnapShot.docs

    // .reduce((acc, docSnapShot) => {
    //   const {title, items} = docSnapShot.data(); // object
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {})
    //const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    // return categoryMap;
  }

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if (!userAuth) return;
    //ref: a special object firestore uses when talking about instance of a document model, MongoDB collections(contain multiple document units)
    const userDocRef = doc(db, 'users', userAuth.uid);
    //                      user collection   unique identifier

    //snapshot: data
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try {
        await setDoc(userDocRef, {displayName, email, createAt, ...additionalInformation = {}});
      } catch (error) {
        console.log("error creating the user", error.message);

      }
    }
    return userDocRef;
  } 

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 
  // if auth changes, trigger callback function
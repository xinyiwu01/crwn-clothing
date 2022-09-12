import { 
    auth, 
    signInWithGooglePopup, 
    //signInWithGoogleRedirect, 
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.components';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
//redirect to a new page/domain, can't track user data

const SignIn = () => {
    /*
    useEffect(async() => {
        const response = await getRedirectResult(auth);//auth:keep track of all authentication states, memory
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);
    */


    //access database: async
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
            <SignUpForm />
        </div>
    );
}

export default SignIn;
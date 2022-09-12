
import SignUpForm from '../../components/sign-up-form/sign-up-form.components';
import SignInForm from '../../components/sign-in-form/sign-in-form.components';
import './authentication.styles.scss';
//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';
//redirect to a new page/domain, can't track user data

const Authentication = () => {
    /*
    useEffect(async() => {
        const response = await getRedirectResult(auth);//auth:keep track of all authentication states, memory
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);
    */


    //access database: async
    /*
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }
    */


    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;
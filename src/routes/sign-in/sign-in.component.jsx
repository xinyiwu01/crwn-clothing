import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    //access database: async
const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
}

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
}

export default SignIn;
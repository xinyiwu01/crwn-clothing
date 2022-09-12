import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.components";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confrimPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("password do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert("Can't create user, email alreay in use");
            } else {
                console.log("user creation encountered an error", error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and passward</span>
            <form onSubmit={handleSubmit}>
                                                                             {/*value: what users see, controlled by state*/ }
                <FormInput label="Display Name" type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password'value={password} />
                <FormInput label="Confrom Password" type='password' required onChange={handleChange} name='confirmPassword'value={confirmPassword} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
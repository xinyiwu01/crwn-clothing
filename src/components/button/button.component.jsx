/*
button:
1.interted 

2.default

3.google sign in
*/
import './button.styles.scss';

const BUTTON_TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buutonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASS[buutonType]}`} {...otherProps}>{children}</button>
    )
}

export default Button;
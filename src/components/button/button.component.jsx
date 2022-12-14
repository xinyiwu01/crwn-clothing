/*
button:
1.interted 

2.default

3.google sign in
*/
import './button.styles.scss';

export const BUTTON_TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttontype, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASS[buttontype]}`} {...otherProps}>{children}</button>
    )
}

export default Button;
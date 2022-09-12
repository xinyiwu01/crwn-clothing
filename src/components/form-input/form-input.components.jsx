import './form-input.styles.scss';
const FormInput = ({label, ...otherProps}) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps}/>
            {label && ( //if label exists, render this
                <label className={`${otherProps && otherProps.value && otherProps.value.length ? 'shrink': ""} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

export default FormInput;
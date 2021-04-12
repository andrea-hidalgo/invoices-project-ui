import React from 'react';
import {Field, ErrorMessage} from 'formik'

export default function InputField({placeholder, label, type, name, className}) {
    return (
        <div className="input-field-container">
            <label className="body1" htmlFor={name}>{label}</label>
            <ErrorMessage component="div" name={name} className="error-message"/>
            <Field type={type} placeholder={placeholder} name={name} className={className}/>
        </div>
    )
}
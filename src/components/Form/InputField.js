import React from 'react';
import {Field, ErrorMessage} from 'formik'

export default function InputField({placeholder, label, type, name}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Field type={type} placeholder={placeholder} name={name}/>
            <ErrorMessage component="div" name={name} />
            </>
    )
}
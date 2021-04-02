import React,  { useEffect } from 'react';
import { Formik, Field, Form, FieldArray, useFormikContext, useField, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core';

import * as yup from  'yup';
import Item from './Item';

export default function NewInvoice(props) {

    const validationSchema = yup.object({
        description: yup.string().required()
    })

    const InputField = ({ placeholder, label, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        return (
            <TextField {...field} placeholder={placeholder} helperText={errorText} label={label} error={!!errorText} variant="outlined"/>
        )
    }

    
    return (
        <div className="newInvoice">
            <Formik 
                initialValues={{ 
                    description: '',
                    paymentTerms: "1",
                    items: [{name: '', quantity: 1, price: 0, total: 0},]
                }}
                validationSchema={validationSchema}
                // validate={(values) => {
                //     const errors = {};

                //     if (values.description.includes("bob")) {
                //         errors.description  = "no bob";
                //     }

                //     return errors;
                // }}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    //make async call 
                    // setSubmitting will make something happen (or not happen) while the form is in the process of being submitted
                    // in this case, while the async post request is happening, we could disable the submit button, so the form can't be submitted twice by mistake
                    console.log('submit: ', data)
                    setSubmitting(false);
                }}
            >
                {({ values, errors, isSubmitting, touched })=>(
                <Form>
                    <InputField name="clientName" label="Client Name" type="input"/>
                    <InputField name="description" label="Description" type="input"/>
                    <Field as="select" name="paymentTerms">
                        <option value={1}>Net 1 Day</option>
                        <option value={7}>Net 7 Days</option>
                        <option value={14}>Net 14 Days</option>
                        <option value={30}>Net 30 Days</option>
                    </Field>
                    <FieldArray name="items">
                        {({remove, push})=> (
                            <div>
                                {values.items.map((item, index) => {
                                    return (
                                        <Item key={index} index={index} item={item} remove={remove} values={values}/>
                                    );
                                })}
                                <button type="button" onClick={() => push({name: '', quantity: 1, price: 0, total: 0})}>Add New Item</button> 
                            </div>
                        )}
                    </FieldArray>
                    <input disabled={ isSubmitting } type="submit"/>
                    <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>
                </Form>
            )}</Formik>
        </div>
    )
}
import React,  { useEffect } from 'react';
import { Formik, Field, Form, FieldArray, useFormikContext, useField, ErrorMessage } from 'formik';
import * as yup from  'yup';
import Item from './Item';

export default function NewInvoice(props) {

    const validationSchema = yup.object({
        description: yup.string().required().max(10)
    })


    
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
                    
                    <label htmlFor="description">Description:</label>
                    <Field name="description" type="input" required/>
                    {/* {errors.description && touched.description ? (<div className="error">{errors.description}</div>) : null} */}
                    <ErrorMessage name="description" component="div" />
                    <Field as="select" name="paymentTerms" >
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
import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as yup from  'yup';

export default function NewInvoice(props) {

    const validationSchema = yup.object({
        description: yup.string().required().max(10)
    })
    
    return (
        <div className="newInvoice">
            <Formik 
                initialValues={{ 
                    description: '',
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
                {({ values, errors, isSubmitting })=>(
                <Form>
                    <label htmlFor="description">Description:</label>
                    <Field name="description" type="input" required/>
            
                    <FieldArray name="items">
                        {(arrayHelpers)=> (
                            <div>
                                {values.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <label htmlFor={`items.${index}.name`}>Name</label>
                                            <Field name={`items.${index}.name`} placeholder="Service rendered" type="text"/>
                                            <label htmlFor={`items.${index}.quantity`}>Quantity</label>
                                            <Field name={`items.${index}.quantity`} placeholder="1" type="number"/>
                                            <label htmlFor={`items.${index}.price`}>Price</label>
                                            <Field name={`items.${index}.price`} placeholder="0" type="number"/>
                                            <label htmlFor={`items.${index}.total`}>Total</label>
                                            <Field name={`items.${index}.total`} placeholder="0" type="number" disabled faded/>
                                        </div>
                                    );
                                })}
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
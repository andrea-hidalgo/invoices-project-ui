import React, { useEffect } from 'react';
import { Formik, Field, Form, FieldArray, useField, useFormikContext } from 'formik';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';

import * as yup from  'yup';
import Item from './Item';

export default function NewInvoice(props) {

    const calculateTotal = async (values) => {
        let total= 0;
        const calculateItemTotal = values.items.map((item, index) => {
            if (typeof(values.items[index].total) == "number") {
                total += values.items[index].total
            }
        })
        console.log(total)
        return total;
    }

    const validationSchema = yup.object({
        description: yup.string().required()
    })

    const InputField = ({ placeholder, label, type, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        return (
            <TextField {...field} type={type} placeholder={placeholder} helperText={errorText} label={label} error={!!errorText} variant="outlined"/>
        )
    }

    // const SelectField = ({labelId, value, label, menuItem, ...props}) => {
    //     const [field]=useField(props);
    //     return(
    //         <>
    //         <InputLabel id={labelId}>{label}</InputLabel>
    //         <Select {...field} labelId={labelId} variant="outlined">{menuItem}</Select>
    //         </>
    //     )
    // }


    return (
        <div className="new-invoice-container">
            <h1 className="">New Invoice</h1>
            <Formik 
                initialValues={{ 
                    senderAddress: {street: '', city:'', zipCode:'',country:''},
                    clientName: '',
                    clientEmail: '',
                    clientAddress: {street: '', city:'', zipCode:'',country:''},
                    createdAt:'',
                    paymentTerms: 1,
                    description: '',
                    items: [{name: '', quantity: 1, price: 0, total: 0},]
                }}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    calculateTotal(data);
                    //make async call 
                    // setSubmitting will make something happen (or not happen) while the form is in the process of being submitted
                    // in this case, while the async post request is happening, we could disable the submit button, so the form can't be submitted twice by mistake
                    console.log('submit: ', data)
                    setSubmitting(false);
                }}
            >
                {({ values, errors, isSubmitting, touched })=>(
                <Form>
                    <div className="bill-form-container address-top">
                        <h3>Bill From</h3>
                        <InputField name="senderAddress.street" type="input" label="Street Address"/>
                        <div className="address-bottom">
                            <InputField name="senderAddress.city" type="input" label="City"/>
                            <InputField name="senderAddress.zipCode" type="input" label="Zip Code"/>
                            <InputField name="senderAddress.country" type="input" label="Country"/>
                        </div>
                    </div>
                    <div className="bill-to container">
                        <h3>Bill To</h3>
                        <InputField name="clientName" label="Client Name" type="input"/>
                        <InputField name="clientEmail" label="Client Email" type="email"/>
                        <div className="address-top">
                            <InputField name="clientAddress.street" type="input" label="Street Address"/>
                        </div>
                        <div className="address-bottom">
                            <InputField name="clientAddress.city" type="input" label="City"/>
                            <InputField name="clientAddress.zipCode" type="input" label="Zip Code"/>
                            <InputField name="clientAddress.country" type="input" label="Country"/>
                        </div>
                    </div>

                    <div className="invoice-payments">
                        <InputField name="createdAt" type="date" label="Invoice Date"/>
                        <Field as={Select} name="paymentTerms" variant="outlined" defaultValue={1}>
                            <option value={1}>Net 1 Day</option>
                            <option value={7}>Net 7 Days</option>
                            <option value={14}>Net 14 Days</option>
                            <option value={30}>Net 30 Days</option>
                        </Field>
                    </div>

                    <InputField name="description" label="Project Description" type="input" placeholder="e.g Graphic Design Service"/>
                    <div className="items-form-container">
                        <h2>Item List</h2>
                        <FieldArray name="items">
                            {({remove, push})=> (
                                <div>
                                    {values.items.map((item, index) => {
                                        return (
                                            <Item key={index} index={index} item={item} remove={remove} values={values} InputField={InputField} />
                                        );
                                    })}
                                    <button type="button" onClick={() => push({name: '', quantity: 1, price: 0, total: 0})}>+ Add New Item</button> 
                                </div>
                            )}
                        </FieldArray>
                    </div>
                    <input disabled={ isSubmitting } type="submit"/>
                    <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>
                </Form>
            )}</Formik>
        </div>
    )
}
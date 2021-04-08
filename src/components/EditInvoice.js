import React from 'react';
import { Formik, Field, Form, FieldArray, useField } from 'formik';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';

import * as yup from  'yup';
import Item from './Item';

export default function EditInvoice (props) {

    const inv = props.invoice;
    const dbID = props.invoice._id;

    const calculateTotal = (values) => {
        let total= 0;
        values.items.map((item, index) => {
            if (typeof(values.items[index].total) == "number") {
                total += values.items[index].total
            }
        })
        return total;
    }

    const calculateDueDate = (values) => {
        const createdAt = new Date(values.createdAt);
        const paymentTerms = values.paymentTerms;
        const formatDate = new Date(Number(createdAt));
        formatDate.setDate(createdAt.getDate() + paymentTerms);
        return formatDate;
    }

    const validationSchema = yup.object({
        description: yup.string().required(),
        clientName: yup.string().required(),
        clientEmail: yup.string().email().required()
    })

    const InputField = ({ placeholder, label, type, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        return (
            <TextField {...field} type={type} placeholder={placeholder} helperText={errorText} label={label} error={!!errorText} variant="outlined"/>
        )
    }

    const initialItemValues = () => {
        const initialValues = []
        inv.items.forEach((item, index) => {
            let n = new Object ()
            n.name = inv.items[index].name;
            n.quantity = inv.items[index].quantity;
            n.price = inv.items[index].price;
            n.total = inv.items[index].total;
            initialValues.push(n)
        }) 
        console.log(initialValues)
        return initialValues;
    } 

    return (
        <div className="new-invoice-container">
            <h1 className="">Edit <span>#</span>{props.invoice.invoiceId}</h1>
            <Formik 
                initialValues={{ 
                    senderAddress: {street: inv.senderAddress.street, city: inv.senderAddress.city, state: inv.senderAddress.state, zipCode:inv.senderAddress.zipCode, country:inv.senderAddress.country},
                    clientName: inv.clientName,
                    clientEmail: inv.clientEmail,
                    clientAddress: {street: inv.clientAddress.street, city: inv.clientAddress.city, state: inv.clientAddress.state, zipCode: inv.clientAddress.zipCode, country: inv.clientAddress.country},
                    createdAt: inv.createdAt,
                    paymentTerms: inv.paymentTerms,
                    description: inv.description,
                    items: initialItemValues(),
                    total: inv.total,
                    status: inv.status
                }}
                validationSchema={validationSchema}
                onSubmit={ async (data, {setSubmitting}) => {
                    setSubmitting(true);
                    const itemTotal= calculateTotal(data);
                    const dueDate = calculateDueDate(data);
                    const body = JSON.stringify({...data, total: itemTotal, paymentDue: dueDate})
                    try {
                        const response = await fetch(`/api/invoices/${dbID}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: body
                        })
                        const submittedData = await response.json();
                        props.setInvoice(submittedData)
                        props.toggleEditHide()
                    } catch(error) {
                        console.error(error);
                    }
                    //make async call 
                    // setSubmitting will make something happen (or not happen) while the form is in the process of being submitted
                    // in this case, while the async post request is happening, we could disable the submit button, so the form can't be submitted twice by mistake
                    console.log('submit: ', data)
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, errors })=>(
                <Form>
                    <div className="bill-form-container address-top">
                        <h3>Bill From</h3>
                        <InputField name="senderAddress.street" type="input" label="Street Address"/>
                        <div className="address-bottom">
                            <InputField name="senderAddress.city" type="input" label="City"/>
                            <InputField name="senderAddress.state" type="input" label="State"/>
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
                            <InputField name="clientAddress.state" type="input" label="State"/>
                            <InputField name="clientAddress.zipCode" type="input" label="Zip Code"/>
                            <InputField name="clientAddress.country" type="input" label="Country"/>
                        </div>
                    </div>

                    <div className="invoice-payments">
                        <InputField name="createdAt" type="date" label="Invoice Date"/>
                        <Field as={Select} name="paymentTerms" variant="outlined">
                            <MenuItem value={1}>Net 1 Day</MenuItem>
                            <MenuItem value={7}>Net 7 Days</MenuItem>
                            <MenuItem value={14}>Net 14 Days</MenuItem>
                            <MenuItem value={30}>Net 30 Days</MenuItem>
                        </Field>
                    </div>

                    <InputField name="description" label="Project Description" type="input" placeholder="e.g Graphic Design Service"/>
                    <div className="items-form-container">
                        <h2>Item List</h2>
                        <FieldArray name="items">
                            {({remove, push})=> (
                                <div>
                                    {
                                    values.items.map((item, index) => {
                                        return (
                                            <Item key={index} index={index} item={item} remove={remove} values={values} InputField={InputField} />
                                        );
                                    })
                                    }
                                    <button type="button" onClick={() => push({name: '', quantity: 1, price: 0, total: 0})}>+ Add New Item</button> 
                                </div>
                            )}
                        </FieldArray>
                    </div>
                    <button onClick={()=>props.toggleEditHide()}>Cancel</button>
                    <input disabled={ isSubmitting } type="submit"/>
                    {/* <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>  */}
                </Form>
            )}</Formik>
        </div>
    )
}
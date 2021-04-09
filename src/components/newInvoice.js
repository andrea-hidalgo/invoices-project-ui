import React from 'react';
import { Formik, Form } from 'formik';
import FormFields from './Form/FormFields'

import * as yup from  'yup';
import Item from './Form/Item';

export default function NewInvoice(props) {

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

    const generateId = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letter1 = alphabet[Math.floor(Math.random() * alphabet.length)];
        const letter2 = alphabet[Math.floor(Math.random() * alphabet.length)];
        const letters = letter1 + letter2;
        const numbers = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const id = letters + numbers;
        return id; 
    }

    const validationSchema = yup.object({
        description: yup.string().required(),
        clientName: yup.string().required(),
        clientEmail: yup.string().email().required()
    })

    return (
        <div className="new-invoice-container">
            <h1 className="">New Invoice</h1>
            <Formik 
                initialValues={{ 
                    senderAddress: {street: '', city:'', state: '', zipCode:'',country:''},
                    clientName: '',
                    clientEmail: '',
                    clientAddress: {street: '', city:'', state: '', zipCode:'',country:''},
                    createdAt:'',
                    paymentTerms: 1,
                    description: '',
                    items: [{name: '', quantity: 1, price: 0, total: 0},],
                    total: 0,
                    status: 'pending'
                }}
                validationSchema={validationSchema}
                onSubmit={ async (data, {setSubmitting}) => {
                    setSubmitting(true);
                    const itemTotal= calculateTotal(data);
                    const dueDate = calculateDueDate(data);
                    const invoiceId = generateId();
                    const body = JSON.stringify({...data, total: itemTotal, paymentDue: dueDate, invoiceId: invoiceId})
                    try {
                        const response = await fetch('/api/invoices', {
                            method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: body
                        })
                        const submittedData = await response.json();
                        props.setInvoicesData([...props.invoicesData, submittedData])
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
                    <FormFields values={values}/>
                    <button onClick={() =>props.toggleInvoiceHide()}>Discard</button>
                    <input disabled={ isSubmitting } type="submit"/>
                    <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre> 
                </Form>
            )}</Formik>
        </div>
    )
}
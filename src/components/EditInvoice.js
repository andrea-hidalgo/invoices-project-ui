import React from 'react';
import { Formik, Form } from 'formik';
import FormFields from './Form/FormFields'

import * as yup from  'yup';

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
                    <FormFields values={values}/>
                    <button onClick={()=>props.toggleEditHide()}>Cancel</button>
                    <input disabled={ isSubmitting } type="submit"/>
                    {/* <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>  */}
                </Form>
            )}</Formik>
        </div>
    )
}
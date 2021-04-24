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
        const invoiceDate = new Date(values.invoiceDate);
        const paymentTerms = parseInt(values.paymentTerms);
        const formatDate = new Date(Number(invoiceDate));
        formatDate.setDate(invoiceDate.getDate() + parseInt(paymentTerms));
        console.log(invoiceDate);
        console.log(paymentTerms);
        console.log(formatDate)
        return formatDate;
    }

    const formatInvoiceDate = (values) => {
        return new Date(values.invoiceDate);
    }

    const invoiceDateInitialValue = () =>{
        const invoiceDate = inv.invoiceDate;
        const format = invoiceDate.slice(0,10)
        return format;
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
        <div className="main-invoice-form-container">
            <h1 className="form-title">Edit <span>#</span>{props.invoice.invoiceId}</h1>
            <Formik 
                initialValues={{ 
                    senderAddress: {street: inv.senderAddress.street, city: inv.senderAddress.city, state: inv.senderAddress.state, zipCode:inv.senderAddress.zipCode, country:inv.senderAddress.country},
                    clientName: inv.clientName,
                    clientEmail: inv.clientEmail,
                    clientAddress: {street: inv.clientAddress.street, city: inv.clientAddress.city, state: inv.clientAddress.state, zipCode: inv.clientAddress.zipCode, country: inv.clientAddress.country},
                    invoiceDate: invoiceDateInitialValue(),
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
                    const invoiceDateFormat = formatInvoiceDate(data);
                    const body = JSON.stringify({...data, total: itemTotal, paymentDue: dueDate, invoiceDate:invoiceDateFormat})
                    try {
                        const response = await fetch(`/api/invoices/${dbID}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: body
                        })
                        const submittedData = await response.json();
                        console.log('response', submittedData);
                        props.setInvoice(submittedData);
                    } catch(error) {
                        console.error(error);
                    } 
                    //make async call 
                    // setSubmitting will make something happen (or not happen) while the form is in the process of being submitted
                    // in this case, while the async post request is happening, we could disable the submit button, so the form can't be submitted twice by mistake
                    console.log('data: ', data);
                    props.toggleEditHide();
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, errors })=>(
                <Form>
                    <FormFields values={values}/>
                    <div className="form-button-row">
                        <button onClick={()=>props.toggleEditHide()} className="button3">Cancel</button>
                        <input disabled={ isSubmitting } type="submit" value="Save Changes" className="button1"/>
                    </div>
                    {/* <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>  */}
                </Form>
            )}</Formik>
        </div>
    )
}
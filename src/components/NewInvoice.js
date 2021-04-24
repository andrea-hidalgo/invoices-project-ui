import React from 'react';
import { Formik, Form } from 'formik';
import FormFields from './Form/FormFields'
import * as yup from  'yup';

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
        const invoiceDate = new Date(values.invoiceDate);
        const paymentTerms = parseInt(values.paymentTerms);
        const formatDate = new Date(Number(invoiceDate));
        formatDate.setDate(invoiceDate.getDate() + paymentTerms);
        return formatDate;
    }

    const formatInvoiceDate = (values) => {
        return new Date(values.invoiceDate);
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
        clientEmail: yup.string().email().required(),
        invoiceDate: yup.date().required()
    })

    return (
        <div className="main-invoice-form-container">
            <h1 className="form-title">New Invoice</h1>
            <Formik 
                initialValues={{ 
                    senderAddress: {street: '', city:'', state: '', zipCode:'',country:''},
                    clientName: '',
                    clientEmail: '',
                    clientAddress: {street: '', city:'', state: '', zipCode:'',country:''},
                    invoiceDate:'',
                    paymentTerms: 1,
                    description: '',
                    items: [{name: '', quantity: 1, price: 0, total: 0},],
                    total: 0,
                    status: 'pending'
                }}
                validationSchema={validationSchema}
                onSubmit={ async (data, {setSubmitting}) => {
                    setSubmitting(true);
                    const itemTotal = calculateTotal(data);
                    const invoiceDateFormat = formatInvoiceDate(data);
                    const dueDate = calculateDueDate(data);
                    const invoiceId = generateId();
                    const body = JSON.stringify({...data, total: itemTotal, invoiceDate: invoiceDateFormat, paymentDue: dueDate, invoiceId: invoiceId})
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
                        props.toggleInvoiceHide()
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
                    <div className="form-button-row">
                        <button onClick={() =>props.toggleInvoiceHide()} className="button3">Discard</button>
                        <input disabled={ isSubmitting } type="submit" className="button1"/>
                    </div>
                    {/* <pre>{JSON.stringify(values,null,2)}</pre>
                    <pre>{JSON.stringify(errors,null,2)}</pre>  */}
                </Form>
            )}</Formik>
        </div>
    )
}
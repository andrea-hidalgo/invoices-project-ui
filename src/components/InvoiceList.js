import React from 'react';
import { Link } from 'react-router-dom';

export default function InvoiceList(props) {

    const dueDate = (invoice) => {
        const newDate = new Date(invoice.paymentDue);
        const formatDate = newDate.toDateString();
        const sliceDate = formatDate.slice(3);
        return sliceDate;
    }

    return (
        <div>
            {props.invoicesData.map((invoice,index) =>{
                return (
                    <div key={index}>
                            <h4><span>#</span>{invoice.invoiceId}</h4>
                            <p>Due {dueDate(invoice)}</p>
                            <p>{invoice.clientName}</p>
                            <h3>${invoice.total}</h3>
                            <h4>{invoice.status}</h4>
                            <Link to={`/${invoice._id}`}>
                                <div>&#62;</div>
                            </Link>
                    </div>
                )
            })}
        </div>
    )
}
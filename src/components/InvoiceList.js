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
                        <Link to={`/${invoice._id}`}>
                            <div>
                            <h4>#{invoice.invoiceId}</h4>
                            <p>Due {dueDate(invoice)}</p>
                            <p>{invoice.clientName}</p>
                            <h3>${invoice.total}</h3>
                            <h3>{invoice.status}</h3>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
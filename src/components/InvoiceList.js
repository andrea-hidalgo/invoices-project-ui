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
                    <div className="invoice-list-item-container"key={index}>
                        <Link to={`/${invoice._id}`}>
                            <div>
                                <h4><span>#</span>{invoice.invoiceId}</h4>
                                <p className="body1">Due {dueDate(invoice)}</p>
                                <p className="body1">{invoice.clientName}</p>
                                <h3>${invoice.total}</h3>
                                <h4>{invoice.status}</h4>
                                <p className="hide-mobile">&#62;</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
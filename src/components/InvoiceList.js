import React from 'react';

export default function InvoiceList(props) {

    const date = (invoice) => {
        const newDate = new Date(invoice.paymentDue);
        const formatDate = newDate.toDateString();
        const sliceDate = formatDate.slice(3);
        return sliceDate;
    }

    return (
        <div>
            {props.invoiceData.map((invoice,index) =>{
                return (
                    <div key={index}>
                        <h4>#{invoice.invoiceId}</h4>
                        <p>Due {date(invoice)}</p>
                        <p>{invoice.clientName}</p>
                        <h3>${invoice.total}</h3>
                        <h3>{invoice.status}</h3>
                    </div>
                )
            })}
        </div>
    )
}
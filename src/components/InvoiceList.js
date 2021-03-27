import React from 'react';

export default function InvoiceList(props) {
    return (
        <div>
            {props.invoiceData.map((invoice,index) =>{
                return (
                    <div key={index}>
                        <h4>#{invoice.invoiceId}</h4>
                        <p>Due {invoice.paymentDue}</p>
                        <p>{invoice.clientName}</p>
                        <h3>${invoice.total}</h3>
                        <h3>{invoice.status}</h3>
                    </div>
                )
            })}
        </div>
    )
}
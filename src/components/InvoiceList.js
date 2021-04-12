import React from 'react';
import { Link } from 'react-router-dom';

export default function InvoiceList(props) {

    const dueDate = (invoice) => {
        const newDate = new Date(invoice.paymentDue);
        const formatDate = newDate.toDateString();
        const sliceDate = formatDate.slice(3);
        return sliceDate;
    }

    const titleStatusStyle = (invoice) => {
        if (invoice === "pending") {
            return (
                {backgroundColor: "rgb(255,143,0,0.2)"
            }
            )
        } else if (invoice === "paid") {
            return (
                {backgroundColor: "rgb(51,214,159,0.2)"}
            )
        }
    }

    const textStatusStyle = (invoice) => {
        if (invoice === "pending") {
            return (
                {color: "rgb(255,143,0)"
            }
            )
        } else if (invoice === "paid") {
            return (
                {color: "rgb(51,214,159)"}
            )
        }
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
                                <div className="invoice-status" style={titleStatusStyle(invoice.status)}>
                                    <h4 className="invoice-status-text" style={textStatusStyle(invoice.status)}>{invoice.status}</h4>
                                </div>
                                <p className="hide-mobile arrow">&#62;</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';
import EditInvoice from '../components/EditInvoice'

export default function Invoice (props) {

    const [editInvoiceHidden, toggleEditInvoiceHidden ] = useState({invoiceHidden:true});
    const toggleEditHide = () => {
        toggleEditInvoiceHidden({invoiceHidden: !editInvoiceHidden.invoiceHidden});
    }

    const [invoice, setInvoice] = useState({});
    const [didDelete, setDidDelete] = useState(false);

    useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/invoices/${props.match.params.id}`);
				const data = await response.json();
				setInvoice(data);
			} catch (error) {
				console.error(error);
			}
		})();
	},[]);

    const formatDate = (date) => {
        const newDate = new Date(date);
        const formatDate = newDate.toDateString();
        const sliceDate = formatDate.slice(3);
        return sliceDate;
        
    }


    const handleDelete = async e => {
		try {
			const response = await fetch(`/api/invoices/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			setDidDelete(!didDelete);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};

    const handlePaid = async e => {
		try {
			const response = await fetch(`/api/invoices/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: "paid"
				})
			});
			const data = await response.json();
			setInvoice(data);
		} catch (error) {}
	};

    return (
        <>
        {Object.keys(invoice).length ? ( 
        <div id="invoice-page-container">
            <Link to={'/'}><p className="body1"><span>&#60;</span> Go back</p></Link>
            <header>
                    <div className="invoice-page-header-left">
                        <p className="body1">Status</p>
                        <div className="invoice-status">
                            <p className="invoice-status-text">{invoice.status}</p>
                        </div>
                    </div>
                    <div className="invoice-page-header-right">
                        <button className="edit-button button3" onClick={toggleEditHide}>Edit</button>
                        <button className="delete-button button5" onClick={handleDelete}>Delete</button>
                        <button className="paid-button button1" onClick={handlePaid}>Mark as Paid</button>
                    </div>
            </header>
            <section id="invoice-page-info-block">
                <div className="invoice-page-info-top">
                    <div>
                        <h3 className="invoice-id"><span>#</span>{invoice.invoiceId}</h3>
                        <p className="body1">{invoice.description}</p>
                    </div>
                    <div>
                        <p className="body2">{invoice.senderAddress.street}</p>
                        <p className="body2">{invoice.senderAddress.city}<span>, {invoice.senderAddress.state}</span></p>
                        <p className="body2">{invoice.senderAddress.zipCode}</p>
                        <p className="body2">{invoice.senderAddress.country}</p>
                    </div>
                </div>
                <div className="invoice-page-info-mid">
                    <div className="invoice-page-dates">
                        <div>
                            <p className="body1">Invoice Date</p>
                            <p className="bold-text">{formatDate(invoice.createdAt)}</p>
                        </div>
                        <div>
                            <p className="body1">Payment Due</p>
                            <p className="bold-text">{formatDate(invoice.paymentDue)}</p>
                        </div>
                    </div>
                    <div className="invoice-page-client-address">
                        <p className="body1">Bill To</p>
                        <p className="bold-text">{invoice.clientName}</p>
                        <p className="body2">{invoice.clientAddress.street}</p>
                        <p className="body2">{invoice.clientAddress.city}<span>, {invoice.clientAddress.state}</span></p>
                        <p className="body2">{invoice.clientAddress.zipCode}</p>
                        <p className="body2">{invoice.clientAddress.country}</p>
                    </div>
                    <div className="invoice-page-email">
                        <p className="body1">Sent to</p>
                        <p className="bold-text">{invoice.clientEmail}</p>
                    </div>
                </div>
                <div className="invoice-page-items">
                    <div className="invoice-page-items-header hide-mobile">
                        <div className="invoice-page-items-header-left">
                            <p className="body2">Item Name</p>
                        </div>
                        <div className="invoice-page-items-header-right">
                            <p className="body2">QTY.</p>
                            <p className="body2 items-qty-header">Price</p>
                            <p className="body2">Total</p>
                        </div>
                    </div>
                    <div className="invoice-page-items-list">
                        {invoice.items.map((item, index) => {
                            return (
                                <div key={index} className="item-container">
                                    <div className="item-container-left">
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="item-container-right">
                                        <div>
                                            <p className="body1">{item.quantity} <span className="hide-desktop"> x&nbsp;</span></p>
                                            <p className="body1 items-qty-header">$ {item.price}</p>
                                        </div>
                                        <p className="body1">$ {item.total}</p>
                                    </div>
                                </div>
                                
                            )
                        })}
                    </div>
                    
                </div>
                <div className="invoice-page-grand-total">
                        <p className="body2">Grand Total</p>
                        <h2>$ {invoice.total}</h2>
                    </div>
            </section>
        </div>
        ) : <></>}
        {editInvoiceHidden.invoiceHidden === false ? <EditInvoice invoice={invoice} setInvoice={setInvoice} toggleEditHide={toggleEditHide}/> : ''}
        </>
    )
}
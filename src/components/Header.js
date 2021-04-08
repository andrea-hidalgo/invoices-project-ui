import React from 'react';

export default function Header (props) {
  const countInvoices = () => {
    if (props.invoicesData.length > 0) {
      let count = 0;
      props.invoicesData.forEach(invoice => count++)
      return count + ' total';
    } else {
      return 'no'
    }
  }
    return (
        <header>
        <div className="header-left">
          <h1>Invoices</h1>
          <p className="body1">There are {countInvoices()} invoices</p>
        </div>
        <div className="header-right">
          <button onClick={()=>props.toggleInvoiceHide()}>+ New Invoice</button>
        </div>
      </header>
    )
}
import React from 'react';

export default function Header (props) {
  const isMobile = window.innerWidth < 480;

  const countInvoices = () => {
    if (props.invoicesData.length > 0) {
      let count = 0;
      props.invoicesData.forEach(invoice => count++)
      return count;
    } else {
      return 'no'
    }
  }

    return (
        <header id="invoice-list-header">
        <div className="header-left">
          <h1>Invoices</h1>
          {isMobile ? <p className="body1">{countInvoices()} invoices</p> : <p className="body1">There are {countInvoices()} total invoices</p>}
        </div>
        <div className="header-right">
          <button className="button1" onClick={()=>props.toggleInvoiceHide()}>+ New Invoice</button>
        </div>
      </header>
    )
}
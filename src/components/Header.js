import React from 'react';

export default function Header (props) {

    return (
        <header>
        <div className="header-left">
          <h1>Invoices</h1>
          <p className="body1">There are X total invoices</p>
        </div>
        <div className="header-right">
          <button onClick={()=>props.toggleInvoiceHide()}>+ New Invoice</button>
        </div>
      </header>
    )
}
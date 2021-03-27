import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/styles.css';
import InvoiceList from '../components/InvoiceList'

export default function App() {

  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response= await fetch('/api/invoices');
        const data = await response.json();
        setInvoiceData(data);
      } catch (err) {
        console.error(err)
      }
    })();
  })


  return (
    <div className="App">
      <h1>Hello World!</h1>
      <InvoiceList invoiceData={invoiceData}></InvoiceList>
    </div>
  );
}


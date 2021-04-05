import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/styles.css';
import InvoiceList from '../components/InvoiceList'
import NewInvoice from '../components/NewInvoice'
import Header from '../components/Header'

export default function App() {

  const [newInvoiceHidden, toggleNewInvoiceHidden ] = useState({invoiceHidden:true});
  const toggleInvoiceHide = () => {
    toggleNewInvoiceHidden({invoiceHidden: !newInvoiceHidden.invoiceHidden});
  }

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
      <Header 
        toggleInvoiceHide={toggleInvoiceHide}/>
      {invoiceData.length ? (
        <InvoiceList 
          invoiceData={invoiceData} />) : ('')}
      {newInvoiceHidden.invoiceHidden === false ? (
        <NewInvoice 
          invoiceData={invoiceData} 
          setInvoiceData={setInvoiceData}
          toggleInvoiceHide={toggleInvoiceHide}/>) : ''}
    </div>
  );
}


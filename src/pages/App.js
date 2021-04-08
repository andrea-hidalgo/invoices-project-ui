import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/styles.scss';
import InvoiceList from '../components/InvoiceList'
import NewInvoice from '../components/NewInvoice'
import Header from '../components/Header'

export default function App() {

  const [newInvoiceHidden, toggleNewInvoiceHidden ] = useState({invoiceHidden:true});
  const toggleInvoiceHide = () => {
    toggleNewInvoiceHidden({invoiceHidden: !newInvoiceHidden.invoiceHidden});
  }

  const [invoicesData, setInvoicesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response= await fetch('/api/invoices');
        const data = await response.json();
        setInvoicesData(data);
      } catch (err) {
        console.error(err)
      }
    })();
  },[])


  return (
    <div className="App">
      <Header 
        toggleInvoiceHide={toggleInvoiceHide}
        invoicesData={invoicesData} />
      {invoicesData.length ? (
        <InvoiceList 
          invoicesData={invoicesData} />) : ('')}
      {newInvoiceHidden.invoiceHidden === false ? (
        <NewInvoice 
          invoicesData={invoicesData} 
          setInvoicesData={setInvoicesData}
          toggleInvoiceHide={toggleInvoiceHide}/>) : ''}
    </div>
  );
}


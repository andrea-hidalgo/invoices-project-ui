import React, { useEffect, useState } from 'react';
import '../css/styles.scss';
import InvoiceList from '../components/InvoiceList'
import NewInvoice from '../components/NewInvoice'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

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
      <Sidebar />
      <div className="page-component-container app-page-components">
        <Header 
          toggleInvoiceHide={toggleInvoiceHide}
          invoicesData={invoicesData} />
        {invoicesData.length ? (
            <InvoiceList 
              invoicesData={invoicesData} /> )
          : ('')}
      </div>

      {newInvoiceHidden.invoiceHidden === false ? (
        <div className="form-component-container">
          <div className="opaque"></div>
        <NewInvoice 
          invoicesData={invoicesData} 
          setInvoicesData={setInvoicesData}
          toggleInvoiceHide={toggleInvoiceHide}/>
          
        </div>) : ''}
    </div>
  );
}


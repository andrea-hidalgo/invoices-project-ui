import React from 'react';
import App from '../pages/App'
import InvoicePage from '../pages/InvoicePage'

const routes = [
    {
        Component: InvoicePage,
        key: 'InvoicePage',
        path: '/:id'
    },
    {
        Component: App,
        key: 'App',
        path: '/'
    }
]

export default routes;
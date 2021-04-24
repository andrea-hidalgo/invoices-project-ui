const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
    invoiceId: String,
    invoiceDate: {type:Date},
    paymentDue: {type:Date, default: Date.now},
    description: String,
    paymentTerms: Number,
    clientName: String,
    clientEmail: String,
    status: String,
    senderAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    clientAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    items: Array, 
    total: Number
})

module.exports = model('Invoice', invoiceSchema);
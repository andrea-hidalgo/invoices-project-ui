const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
    invoiceId: String,
    paymentDue: {type:Date, default: Date.now},
    description: String,
    paymentTerms: Number,
    clientName: String,
    clientEmail: String,
    status: String,
    senderAddress: {
        street: String,
        city: String,
        zipCode: String,
        country: String
    },
    clientAddress: {
        street: String,
        city: String,
        zipCode: String,
        country: String
    },
    items: Array, 
    total: Number
}, {
    timestamps:true
})

module.exports = model('Invoice', invoiceSchema);
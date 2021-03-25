const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
    id: String,
    createdAt: Date,
    paymentDue: Date,
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
    items: [{type: Schema.Types.ObjectId}]
})

module.exports = model('Invoice', invoiceSchema);
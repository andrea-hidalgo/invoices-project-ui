const Invoice = require('../models/invoice')
const express = require('express');
const invoiceController = express.Router();

//CRUD routes

//Create
invoiceController.post('/', async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body)
        res
            .status(200)
            .json(newInvoice)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//Read
monsterController.get('/', async (req, res) => {
    try {
        const foundInvoice = await Invoice.find({})
        res
            .status(200)
            .json(foundInvoice)
    } catch (error) {
        res.status(400).json(error)
    }
})

//destroy
invoiceController.delete('/:id', async (req, res) => {
    try {
        const foundInvoice = await Invoice.findByIdAndDelete(req.params.id)
        res
            .status(200)
            .json(foundInvoice)
    } catch (error) {
        res.status(400).json(error)
    }
})

//Update
invoiceController.put('/:id', async (req, res) =>{
    console.log(req.body)
    try {
        const foundInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new:true })
        res
            .status(200)
            .json(foundInvoice)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

module.exports = monsterController;
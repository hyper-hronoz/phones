const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const port = 3000
const app = express()

let CONTACTS = []

mongoose.connect('mmongodb+srv://Vlad:cktdfujhs@cluster0.24dk1.mongodb.net/phone', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    const contact = { ...req.body, id: v4(), marked: false }
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
    res.status(200).json({ message: 'Контакт был удален' })
})

app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(idx => idx.id === req.params.id)
    CONTACTS[idx] = req.body
    res.status(200).json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, console.log(`app listen on port ${port}`))

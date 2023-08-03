import express from 'express'
import mongoose from 'mongoose'

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const entries = [
    { category: 'Food', content: 'Dumplings are yummy!'},
    { category: 'Coding', content: 'Lalafells enjoy coding'},
    { category: 'Gaming', content: 'Lalafells are great at gaming'}
  ]

mongoose.connect('mongodb+srv://14322:kalelfung0@cluster0.s9vg5pu.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? ' Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

// Making new instance of schema class
const entriesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entriesSchema)

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', (req, res) => res.send(entries))

app.get('/entries/:id', (req, res) => {
  const entry = entries[req.params.id]
  if (entry) {
  res.send(entry)
  } else {
    res.status(404).send({ error: 'Entry not found' })
  }
})

app.post('/entries', async (req, res) => {
  // 1. Retrieve data from request (req)
  console.log(req.body)
  // 2. TODO: Parse/validate it
  // 3. Push the new entry to the entries array
  // entries.push(req.body)
  const insertedEntry = await EntryModel.create(req.body)
  // 4. Send the new entry with 201 status
  res.status(201).send(insertedEntry)
})

app.listen(port)
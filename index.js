import express from 'express'
import { CategoryModel, EntryModel } from './db.js'

const categories = [
  { name: 'Food' },
  { name: 'Gaming' },
  { name: 'Gaming' },
  { name: 'Other' }
]

const entries = [
    { category: 'Food', content: 'Dumplings are yummy!'},
    { category: 'Coding', content: 'Lalafells enjoy coding'},
    { category: 'Gaming', content: 'Lalafells are great at gaming'}
  ]



// We could use sub-documents for one-to-many or one-to-one relationships
// CategoryModel.create({
//   name: 'Foo',
//   entries: [
//     { content: 'Bar' },
//     { content: 'Bat' }
//   ]
// })

// async function addEntry() {
//   const theCat = await CategoryModel.findOne({ name: 'Coding' })
//   EntryModel.create({ content: 'Testing category ref', category: theCat._id })
// }
// addEntry()

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

app.get('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id)
    if (entry) {
    res.send(entry)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }

  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.post('/entries', async (req, res) => {
  // 1. Retrieve data from request (req)
  // console.log(req.body)
  // 2. TODO: Parse/validate it
  // 3. Push the new entry to the entries array
  // entries.push(req.body)
  try {
    const theCat = await CategoryModel.findOne({ category : req.body.category })
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat._id })
      // 4. Send the new entry with 201 status
      res.status(201).send(insertedEntry)
    } else {
      res.status(400).send({ error: 'Category not found' })
    }
  } catch (err) { 
    res.status(500).send({ error: err.message})
  }
})

app.put('/entries/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.category) {
      updatedEntry.content = req.body.content
    }
    if (req.body.category) {
      const theCat = await CategoryModel.findOne({ category: req.body.category })
      if (theCat) {
        updatedEntry.category = theCat._id
      } else {
        res.status(400).send({ error: 'Category not found' })
      }
    }
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, updatedEntry, { new: true})
    if (entry) {
      res.send(entry)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.delete('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    if (entry) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.listen(port)
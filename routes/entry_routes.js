import { Router } from 'express'
import { CategoryModel, EntryModel } from '../db.js'

const router = Router()

router.get('/', async (req, res) => res.send(await EntryModel.find()))

router.get('/:id', async (req, res) => {
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

router.post('', async (req, res) => {
  // 1. Retrieve data from request (req)
  // console.log(req.body)
  // 2. TODO: Parse/validate it
  // 3. Push the new entry to the entries array
  // entries.push(req.body)
  try {
    const theCat = await CategoryModel.findOne({ name : req.body.category })
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat })
      // 4. Send the new entry with 201 status
      res.status(201).send(insertedEntry)
    } else {
      res.status(400).send({ error: 'Category not found' })
    }
  } catch (err) { 
    res.status(500).send({ error: err.message})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.category) {
      updatedEntry.content = req.body.content
    }
    if (req.body.category) {
      const theCat = await CategoryModel.findOne({ name : req.body.category })
      if (theCat) {
        updatedEntry.category = theCat
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

router.delete('/:id', async (req, res) => {
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

export default router
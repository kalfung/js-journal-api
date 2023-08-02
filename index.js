import express from 'express'

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const entries = [
    { category: 'Food', content: 'Dumplings are yummy!'},
    { category: 'Coding', content: 'Lalafells enjoy coding'},
    { category: 'Gaming', content: 'Lalafells are great at gaming'}
  ]

const app = express()
const port = 4001

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', (req, res) => res.send(entries))

app.post('/entries', (req, res) => {
  // 1. Retrieve data from request (req)
  console.log(req.body)
  // 2. Parse/validate it
  // 3. Push the new entry to the entries array
  // 4. Send the new entry with 201 status
  res.status(201).send('POST to /entries')
}
)

app.listen(port)
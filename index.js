import express from 'express'

const app = express()
const port = 4001

app.get('/', (request, response) => response.send({ info: 'Journal API' }))

app.listen(port)
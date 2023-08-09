import express from 'express'
import { CategoryModel, EntryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

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

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

// the router is middleware, so all we say is "use that router"
app.use('/entries', entryRoutes)

app.listen(port)
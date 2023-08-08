import { CategoryModel, EntryModel, dbClose } from "./db.js"

const categories = [
    { name: 'Food' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Other' }
]

// find a way to drop database first

await CategoryModel.deleteMany()
console.log('Deleted Categories')
const cats = await CategoryModel.insertMany(categories)
console.log('Inserted Categories')

const entries = [
    { category: cats[0], content: 'Dumplings are yummy!'},
    { category: cats[2], content: 'Lalafells enjoy coding'},
    { category: cats[1], content: 'Lalafells are great at gaming'}
]

await EntryModel.deleteMany()
console.log('Deleted Entries')
await EntryModel.insertMany(entries)
console.log('Inserted Entries')

dbClose()

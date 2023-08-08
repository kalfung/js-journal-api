import mongoose from "mongoose"

mongoose.connect('mongodb+srv://14322:kalelfung0@cluster0.s9vg5pu.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? ' Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

// Making new instance of schema class
const entrySchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { CategoryModel, EntryModel }
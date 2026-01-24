require('dotenv').config()
const mongoose = require('mongoose')

// if(process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

const password = process.argv[2]
const addName = process.argv[3]
const addNumber = process.argv[4]

// const url = `mongodb+srv://jaimeevalle_db_user:${password}@cluster0.uibv3ij.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entryScheme = new mongoose.Schema({
    name: { 
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String || Number,
        // minLength: 8,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v) 
            },
            message: props => `${props.value} is not a valid phone number`
        }, 
        required: true,
    },
})

entryScheme.set('toJSON', { 
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebooks', entryScheme)
const mongoose = require('mongoose')

const entryScheme = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String || Number,
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
const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const addName = process.argv[3]
const addNumber = process.argv[4]

const url = `mongodb+srv://jaimeevalle_db_user:${password}@cluster0.uibv3ij.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })


const entryScheme = new mongoose.Schema({
  name: String,
  number: String || Number,
})

const Entry = mongoose.model('Phonebook', entryScheme)


if (!addName || !addNumber) {
  Entry.find({}).then(result => {
    result.forEach(record => {
      console.log(record)
    })
    mongoose.connection.close()
  })
} else {
  const entry = new Entry({
    name: addName,
    number: addNumber,
  })

  entry.save().then(() => {
    console.log(`added ${addName}, number: ${addNumber}, to phonebook`)
    mongoose.connection.close()
  })
}






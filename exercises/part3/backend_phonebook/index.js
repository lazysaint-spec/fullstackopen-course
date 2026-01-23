require('dotenv').config()

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Entry = require('./models/entry.js')


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const errorHandler = (error, request, resposne, next) => {
  console.error(error.message)

  if(error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :body'))
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    // response.json(persons)
  Entry.find({}).then(result => {
      // result.forEach(record=> {
      //     console.log(record)
      // })
      response.json(result)
      // mongoose.connection.close()
  })
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `Phonebook has info for ${persons.length} people \n\n${date}`
    response.end(info)
})

app.get('/api/persons/:id', (request, response) => {
  // const id = request.params.id
  // const person = persons.find(note => note.id === id)

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(400).end()
  // }

  Entry.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  // const id = request.params.id
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()
  Entry.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0
  return String(maxId + 1)
}

const deDup = (nameNew) =>{
    const duplicate = persons.some(person => person.name === nameNew)
    return duplicate
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number,
    // }

    const person = new Entry({
      id: generateId(),
      name: body.name,
      number: body.number,
    })

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    } else if (!person.id) {
        return response.status(400).json({ 
        error: 'error in ID creation' 
        })
    } else if (deDup(body.name)) {
        return response.status(400).json({ 
        error: 'name must be unique' 
        })
    } 

    person.save().then(savedEntry => {
      response.json(savedEntry)
    })

    // persons = persons.concat(person)

    // response.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number }= request.body

  Entry.findById(request.params.id)
    .then(person => {
      if(!person) {
        return response.status(404).end()
      }
    
      person.name = name
      person.number = number

      return person.save().then((updatedEntry) => {
        response.json(updatedEntry)
      })
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
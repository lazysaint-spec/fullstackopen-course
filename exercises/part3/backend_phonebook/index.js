require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Entry = require('./models/entry.js')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
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
  Entry.find({}).then(result => {
    response.json(result)
  })
})

// app.get('/info', (request, response) => {
//   const date = new Date()
//   const info = `Phonebook has info for ${ persons.length} people \n\n${date}`
//   response.end(info)
// })

app.get('/api/persons/:id', (request, response, next) => {
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

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  Entry.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({ error: 'name must be unique' })
      }
    })

  const person = new Entry({
    name: body.name,
    number: body.number,
  })

  if (!person.id) {
    return response.status(400).json({
      error: 'error in ID creation'
    })
  }

  return person.save().then(savedEntry => {
    response.json(savedEntry)
  }).catch(error => next(error))
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
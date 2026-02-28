const entryRouter = require('express').Router()
const Entry = require('../models/entry.js')

entryRouter.get('/', (request, response) => {
  Entry.find({}).then(result => {
    response.json(result)
  })
})

entryRouter.get('/:id', (request, response, next) => {
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

entryRouter.delete('/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

entryRouter.post('/', async (request, response, next) => {
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

  try {
    const existingPerson = await Entry.findOne({ name: body.name })

    if (existingPerson) {
      // 2. Return here so the rest of the function never runs!
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Entry({
      name: body.name,
      number: body.number,
    })

    if (!person.id) {
      return response.status(400).json({
        error: 'error in ID creation'
      })
    }

    const savedEntry = await person.save()
    response.status(201).json(savedEntry)

  } catch (error) {
    next(error)
  }
})

entryRouter.put('/:id', (request, response, next) => {
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

module.exports = entryRouter

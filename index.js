/* eslint-disable no-octal */
const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const Person = require('./models/person')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())


const morgan = require('morgan')
//creating custom token
morgan.token('reqSent', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqSent'
  )
)
app.use(express.static('build'))
let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  }]


//gets the info page that displays information of when the request is processed
app.get('/info', (req, res) => {
  Person.estimatedDocumentCount()
    .then(totalCount => {
      res.json(`Phonebook has info for ${totalCount} people`)
    })})


//gets all the phonebook entries
app.get('/api/persons',(req,res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

//gets single phonebook entry specified with the id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))

})


//  const generateId = () => Math.floor(Math.random() * 99999);
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const contactExist = persons.filter(person => person.name === body.name)

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    })
  } else if (contactExist.length > 0) {
    return res.status(400).json({
      error: 'name must be unique',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

//deletes the person from database
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

//updated the person's number
app.put('/api/persons/:id',(req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  if(person.number > 0100000000 && person.number < 9999999999)
  { Person.findByIdAndUpdate(req.params.id, person, { new:true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))}
  else{
    res.status(404).send({ error:'The phone number is not valid.Please double check the number' })
  }
})



const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)})
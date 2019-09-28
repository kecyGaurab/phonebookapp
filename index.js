const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())

app.use(bodyParser.json());

//creating custom token
morgan.token('reqSent', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqSent'
  )
);

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// });


//gets all the phonebook entries 
app.get('/api/persons',(req,res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

//gets single phonebook entry specified with the id
app.get('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  // const person = persons.find(person => person.id === id);
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person.toJSON());
    } else {
      res.status(404).end();
    }
  })
  .catch(error => next(error))
  
});


//  const generateId = () => Math.floor(Math.random() * 99999);
  app.post('/api/persons', (req, res) => {
    const body = req.body;
    const contactExist = persons.filter(person => person.name === body.name);
  
    if (!body.name) {
      return res.status(400).json({
        error: 'name is missing',
      });
    } else if (!body.number) {
      return res.status(400).json({
        error: 'number is missing',
      });
    } else if (contactExist.length > 0) {
      return res.status(400).json({
        error: 'name must be unique',
      });
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person.save().then(savedPerson => {
          res.json(savedPerson.toJSON());
        });
  })

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.put('/api/persons/:id',(req, res, next)=>{
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new:true})
  .then(updatedPerson => {
    res.json(updatedPerson.toJSON())
  })
  .catch(error =>next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)})
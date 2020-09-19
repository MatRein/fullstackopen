require('dotenv').config() // load environment variables
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person') // load database model
const cors = require('cors') // middleware

const app = express() // create server variable
// using middleware
app.use(cors())
app.use(express.static('build')) // to server static files
app.use(express.json()) // middleware - json parser needed for POST
app.use(morgan('tiny')) // logging middleware

// data - needed so that frontend works initially (data is actually in db)
const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  }
]

// random function
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// {
//   console.log(error)
//   response.status(400).send({ error: 'malformatted id' })
// }

app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(len => {
      const date = new Date()
      res.send(`<p>Phonebook has info for ${len} people</p>
      <p> Data retrievend on ${date}</p>`)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name already used'
    })
  }
  const maxId = persons.length > 0
    ? getRandomInt(10000)
    : 0

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.id = maxId + 1

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// handler of requests with unknown endpoint (wrong address)
// if this function is called no route or middlewere below is called
// (except for errorhandler due to next statement)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// error handler -  used in catch statements
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT // || 3001 no longer needed as in env. var.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

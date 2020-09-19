const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-gblsn.gcp.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`Added ${name} with number ${number} to the phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('wrong number of paramteres!')
  process.exit(1)
}

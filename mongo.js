const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://kecygaurab:${password}@cluster0-swler.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const phonebookSchema = new mongoose.Schema({
name:String,
number:Number,
})

const Person = mongoose.model('Phonebook', phonebookSchema)

const person = new Person ({
    name: 'Jake Shields',
    number: '050589384',
})

person.save().then(response => {
    console.log('person saved')
    mongoose.connection.close()
})
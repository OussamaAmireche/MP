require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const studentRouter = require('./routes/students')
const teacherRouter = require('./routes/teachers')
const matiereRouter = require('./routes/matieres')
const reclamationRouter = require('./routes/reclamations')
const reclamationModRouter = require('./routes/reclamationsMod')
const scoreRouter = require('./routes/scores')
app.use('/students', studentRouter)
app.use('/teachers', teacherRouter)
app.use('/matieres', matiereRouter)
app.use('/reclamations', reclamationRouter)
app.use('/reclamationsMod', reclamationModRouter)
app.use('/scores', scoreRouter)

app.listen(3000, () => console.log('Server Started'))
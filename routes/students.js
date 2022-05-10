const express = require('express')
const router = express.Router()
const Student = require('../models/student')

// Getting all
router.get('/', async (req, res) => {
  try {
    const Students = await Student.find()
    res.json(Students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})

// Creating one
router.post('/', async (req, res) => {
  const student = new Student({
    fname: req.body.fname,
    lname: req.body.lname,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.fname != null) {
    res.student.fname = req.body.fname
  }
  if (req.body.lname != null) {
    res.student.lname = req.body.lname
  }
  if (req.body.userName != null) {
    res.student.userName = req.body.userName
  }
  if (req.body.email != null) {
    res.student.email = req.body.email
  }
  if (req.body.password != null) {
    res.student.password = req.body.password
  }
  try {
    const updatedStudent = await res.student.save()
    res.json(updatedStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove()
    res.json({ message: 'Deleted Student' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getStudent(req, res, next) {
  let student
  try {
    student = await Student.findById(req.params.id)
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router
const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { checkToken, unauthorizeStudent, unauthorizeTeacher, unauthorizeResponsible } = require('../authentication/auth')

// Getting all
router.get('/', checkToken, async (req, res) => {
  try {
    const Students = await Student.find()
    res.json(Students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', checkToken, getStudent, (req, res) => {
  res.json(res.student)
})

// Creating one
router.post('/', checkToken, unauthorizeStudent, unauthorizeTeacher, async (req, res) => {
  const salt = genSaltSync(10);      
  const student = new Student({
    fname: req.body.fname,
    lname: req.body.lname,
    userName: req.body.userName,
    email: req.body.email,
    password: hashSync(req.body.password, salt)
  })
  try {
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  let student
  try {
    student = await Student.findOne({email: req.body.email})
    if (student == null) {
      return res.status(404).json({ message: 'Email Or Password Incorrect' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  const result = compareSync(req.body.password, student.password);
  if(result){
    const jsontoken = sign({ result: student },"asma_key", {
      expiresIn: "20h"
    });
    return res.json({
      student,
      token: jsontoken
    });
  } else {
    return res.json({message: 'Email Or Password Incorrect'});
  }
})

// Updating One
router.patch('/:id', checkToken, unauthorizeStudent, unauthorizeTeacher, getStudent, async (req, res) => {
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
router.delete('/:id', checkToken, unauthorizeStudent, unauthorizeTeacher, getStudent, async (req, res) => {
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
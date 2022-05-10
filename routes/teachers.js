const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher')

// Getting all
router.get('/', async (req, res) => {
  try {
    const Teachers = await Teacher.find()
    res.json(Teachers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getTeacher, (req, res) => {
  res.json(res.teacher)
})

// Creating one
router.post('/', async (req, res) => {
  const teacher = new Teacher({
    fname: req.body.fname,
    lname: req.body.lname,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    moduleId: req.body.moduleId,
    responsible: req.body.responsible
  })
  try {
    const newTeacher = await teacher.save()
    res.status(201).json(newTeacher)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getTeacher, async (req, res) => {
  if (req.body.fname != null) {
    res.teacher.fname = req.body.fname
  }
  if (req.body.lname != null) {
    res.teacher.lname = req.body.lname
  }
  if (req.body.userName != null) {
    res.teacher.userName = req.body.userName
  }
  if (req.body.email != null) {
    res.teacher.email = req.body.email
  }
  if (req.body.password != null) {
    res.teacher.password = req.body.password
  }
  if (req.body.moduleId != null) {
    res.teacher.moduleId = req.body.moduleId
  }
  if (req.body.responsible != null) {
    res.teacher.responsible = req.body.responsible
  }
  try {
    const updatedTeacher = await res.teacher.save()
    res.json(updatedTeacher)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getTeacher, async (req, res) => {
  try {
    await res.teacher.remove()
    res.json({ message: 'Deleted Teacher' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTeacher(req, res, next) {
  let teacher
  try {
    teacher = await Teacher.findById(req.params.id)
    if (teacher == null) {
      return res.status(404).json({ message: 'Cannot find teacher' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.teacher = teacher
  next()
}

module.exports = router
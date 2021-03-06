const express = require('express')
const router = express.Router()
const Reclamation = require('../models/reclamation')
const { checkToken, unauthorizeStudent, unauthorizeTeacher, unauthorizeResponsible } = require('../authentication/auth')

// Getting all
router.get('/', checkToken, unauthorizeStudent, unauthorizeTeacher, async (req, res) => {
  try {
    const Reclamations = await Reclamation.find()
    res.json(Reclamations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', checkToken, unauthorizeTeacher, getReclamation, (req, res) => {
  res.json(res.reclamation)
})

//Getting All For A Single Student
router.get('/student/:id', checkToken, unauthorizeTeacher, async (req, res) => {
    try {
      const Reclamations = await Reclamation.find({studentId: req.params.id})
      if (Reclamations.length === 0) {
        return res.status(404).json({ message: 'No reclamation available' })
      }
      res.json(Reclamations)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', checkToken, unauthorizeTeacher, unauthorizeResponsible, async (req, res) => {
  const reclamation = new Reclamation({
    studentId: req.body.studentId,
    Description: req.body.Description
  })
  try {
    const newReclamation = await reclamation.save()
    res.status(201).json(newReclamation)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', checkToken, unauthorizeTeacher, unauthorizeResponsible, getReclamation, async (req, res) => {
  if (req.body.studentId != null) {
    res.reclamation.studentId = req.body.studentId
  }
  if (req.body.Description != null) {
    res.reclamation.Description = req.body.Description
  }
  try {
    const updatedReclamation = await res.reclamation.save()
    res.json(updatedReclamation)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', checkToken, unauthorizeTeacher, unauthorizeResponsible, getReclamation, async (req, res) => {
  try {
    await res.reclamation.remove()
    res.json({ message: 'Deleted Reclamation' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getReclamation(req, res, next) {
  let reclamation
  try {
    reclamation = await Reclamation.findById(req.params.id)
    if (reclamation == null) {
      return res.status(404).json({ message: 'Cannot find reclamation' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.reclamation = reclamation
  next()
}

module.exports = router
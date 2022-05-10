const express = require('express')
const router = express.Router()
const ReclamationMod = require('../models/reclamationMod')

// Getting all
router.get('/', async (req, res) => {
  try {
    const ReclamationsMod = await ReclamationMod.find()
    res.json(ReclamationsMod)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getReclamationMod, (req, res) => {
  res.json(res.reclamationMod)
})

// Getting All For A Single Student
router.get('/student/:id', async (req, res) => {
    try {
      const ReclamationsMod = await ReclamationMod.find({studentId: req.params.id})
      if (ReclamationsMod.length === 0) {
        return res.status(404).json({ message: 'No reclamation Available' })
      }
      res.json(ReclamationsMod)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Getting All For A Certain Module
router.get('/matiere/:codeM', async (req, res) => {
    try {
      const ReclamationsMod = await ReclamationMod.find({moduleId: req.params.codeM})
      if (ReclamationsMod.length === 0) {
        return res.status(404).json({ message: 'No reclamation Available' })
      }
      res.json(ReclamationsMod)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', async (req, res) => {
  const reclamationMod = new ReclamationMod({
    studentId: req.body.studentId,
    moduleId: req.body.moduleId,
    Description: req.body.Description
  })
  try {
    const newReclamationMod = await reclamationMod.save()
    res.status(201).json(newReclamationMod)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getReclamationMod, async (req, res) => {
  if (req.body.studentId != null) {
    res.reclamationMod.studentId = req.body.studentId
  }
  if (req.body.moduleId != null) {
    res.reclamationMod.moduleId = req.body.moduleId
  }
  if (req.body.Description != null) {
    res.reclamationMod.Description = req.body.Description
  }
  try {
    const updatedReclamationMod = await res.reclamationMod.save()
    res.json(updatedReclamationMod)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getReclamationMod, async (req, res) => {
  try {
    await res.reclamationMod.remove()
    res.json({ message: 'Deleted Reclamation' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getReclamationMod(req, res, next) {
  let reclamationMod
  try {
    reclamationMod = await ReclamationMod.findById(req.params.id)
    if (reclamationMod == null) {
      return res.status(404).json({ message: 'Cannot find reclamation' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.reclamationMod = reclamationMod
  next()
}

module.exports = router
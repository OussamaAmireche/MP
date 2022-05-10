const express = require('express')
const router = express.Router()
const Matiere = require('../models/matiere')
const { checkToken, unauthorizeStudent, unauthorizeTeacher, unauthorizeResponsible } = require('../authentication/auth')

// Getting all
router.get('/', checkToken, async (req, res) => {
  try {
    const Matieres = await Matiere.find()
    res.json(Matieres)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:codeM', checkToken, getMatiere, (req, res) => {
  res.json(res.matiere)
})

// Creating one
router.post('/', checkToken, unauthorizeStudent, unauthorizeTeacher, async (req, res) => {
  const matiere = new Matiere({
    codeM: req.body.codeM,
    matiereName: req.body.matiereName
  })
  try {
    const newMatiere = await matiere.save()
    res.status(201).json(newMatiere)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:codeM', checkToken, unauthorizeStudent, unauthorizeTeacher, getMatiere, async (req, res) => {
  if (req.body.codeM != null) {
    res.matiere.codeM = req.body.codeM
  }
  if (req.body.matiereName != null) {
    res.matiere.matiereName = req.body.matiereName
  }
  try {
    const updatedMatiere = await res.matiere.save()
    res.json(updatedMatiere)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:codeM', checkToken, unauthorizeStudent, unauthorizeTeacher, getMatiere, async (req, res) => {
  try {
    await res.matiere.remove()
    res.json({ message: 'Deleted Matiere' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getMatiere(req, res, next) {
  let matiere
  try {
    matiere = await Matiere.findOne({ codeM : req.params.codeM})
    if (matiere == null) {
      return res.status(404).json({ message: 'Cannot find matiere' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.matiere = matiere
  next()
}

module.exports = router
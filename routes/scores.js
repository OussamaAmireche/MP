const express = require('express')
const router = express.Router()
const Score = require('../models/score')

// Getting all
router.get('/', async (req, res) => {
  try {
    const Scores = await Score.find()
    res.json(Scores)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getScore, (req, res) => {
  res.json(res.score)
})

// Getting All For A Single Student
router.get('/student/:id', async (req, res) => {
    try {
      const Scores = await Score.find({studentId: req.params.id})
      if (Scores.length === 0) {
        return res.status(404).json({ message: 'No score Available' })
      }
      res.json(Scores)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Getting All For A Certain Module
router.get('/matiere/:codeM', async (req, res) => {
    try {
      const Scores = await Score.find({moduleId: req.params.codeM})
      if (Scores.length === 0) {
        return res.status(404).json({ message: 'No score Available' })
      }
      res.json(Scores)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', async (req, res) => {
  const score = new Score({
    studentId: req.body.studentId,
    moduleId: req.body.moduleId,
    score: req.body.score
  })
  try {
    const newScore = await score.save()
    res.status(201).json(newScore)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getScore, async (req, res) => {
  if (req.body.studentId != null) {
    res.score.studentId = req.body.studentId
  }
  if (req.body.moduleId != null) {
    res.score.moduleId = req.body.moduleId
  }
  if (req.body.score != null) {
    res.score.score = req.body.score
  }
  try {
    const updatedScore = await res.score.save()
    res.json(updatedScore)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getScore, async (req, res) => {
  try {
    await res.score.remove()
    res.json({ message: 'Deleted Score' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getScore(req, res, next) {
  let score
  try {
    score = await Score.findById(req.params.id)
    if (score == null) {
      return res.status(404).json({ message: 'Cannot find score' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.score = score
  next()
}

module.exports = router
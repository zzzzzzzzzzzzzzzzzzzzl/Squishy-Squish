import express from 'express'
const router = express.Router()
import { getReadData, getWriteData } from '../dataService'

router.get('/', async (req, res) => {
  try {
    const data = await getReadData()

    res.json(data.leaderboard)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch leaderboard data' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newScore = req.body
    const data = await getReadData()

    // Find the maximum ID in the leaderboard
    const maxId = Math.max(...data.leaderboard.map((score: any) => score.id))

    // Add 1 to the maximum ID to create a new ID for the new score
    const newId = maxId + 1

    // Add the new score to the leaderboard with the new ID
    data.leaderboard.push({ id: newId, ...newScore })

    // Write the updated data to the file
    await getWriteData(data)

    // Send a success response
    res.status(200).json({ message: 'Score added successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add score to leaderboard' })
  }
})

export default router

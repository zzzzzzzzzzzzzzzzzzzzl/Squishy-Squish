import express from 'express'
const router = express.Router()
import { getReadData } from '../dataService'

router.get('/', async (req, res) => {
  try {
    const data = await getReadData()
    
    res.json(data.leaderboard)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch leaderboard data' })
  }
})

export default router

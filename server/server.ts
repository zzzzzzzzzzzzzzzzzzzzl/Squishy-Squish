import { join } from 'node:path'
import express from 'express'
import leaderboard from './routes/routes'

const server = express()

server.use(express.static(join(__dirname, 'public')))

server.use('/api/leaderboard', leaderboard)

export default server

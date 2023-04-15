import request from 'superagent'

export async function getLeaderboard() {
  const response = await request.get('/api/leaderboard')
  return response.body
}

export async function addToLeaderboard(newScore: any) {
  const id = await request.post('/api/leaderboard').send(newScore)
  return id
}

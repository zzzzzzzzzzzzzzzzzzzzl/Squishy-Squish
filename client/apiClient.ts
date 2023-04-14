import request from 'superagent'

export async function getLeaderboard() {
  const response = await request.get('/api/leaderboard')
  return response.body
}

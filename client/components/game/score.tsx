import store from '../../store'
import { highScore } from '../../slices/gameSlice'
import { getLeaderboard } from '../../apiClient'

class score {
  constructor() {
    this.score = 0
  }
  updateScore(score) {
    this.score = score
  }
  async newHighScore() {
    try {
      const data = await getLeaderboard()
      return data
    } catch (error) {
      console.log('Error fetching leaderboard', error)
    }
  }
  async getTopFive() {
    const data = await this.newHighScore()
    // console.log(data);

    return data
  }
}

export default score

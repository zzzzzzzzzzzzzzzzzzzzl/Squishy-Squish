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
  async getLeaderboardData() {
    try {
      const data = await getLeaderboard()
      return data
    } catch (error) {
      console.log('Error fetching leaderboard', error)
    }
  }
  async getTopFive() {
    const data = await this.getLeaderboardData()

    return data
  }
  async newHighscore() {
    const data = await this.getTopFive()

    const arr = data.map((i) => {
      return i.score
    })
    const topFive = arr.sort((a: number, b: number) => b - a).slice(0, 5)
    let newhighscore = false
    topFive.map((i) => {
      if (i < this.score) {
        newhighscore = true
      }
      if (newhighscore) {
        store.dispatch(highScore())
      }
    })

    return newhighscore
  }
}

export default score

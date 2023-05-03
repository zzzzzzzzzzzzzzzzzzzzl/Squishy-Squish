import store from '../../store'
import { highScore } from '../../slices/gameSlice'
import { getLeaderboard } from '../../apiClient'

class score {
  //<3
  constructor() {
    this.score = 0
  }
  updateScore(score) {
    //called each frame
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
  async newHighscore() {
    const data = await this.getLeaderboardData()

    const arr = data.map((i) => {
      return i.score
    })
    const topFive = arr.sort((a: number, b: number) => b - a).slice(0, 10)
    let newhighscore = false
    topFive.map((i) => {
      if (i < this.score) {
        newhighscore = true
      }
    })
    if (newhighscore) {
      store.dispatch(highScore())
    }

    return newhighscore
  }
}

export default score

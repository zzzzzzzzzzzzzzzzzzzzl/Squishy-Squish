import { useState, useEffect } from 'react'
import { getLeaderboard } from '../apiClient'
import { useAppDispatch } from '../hooks'
import { setDisplay } from '../slices/gameSlice'

type Leader = {
  id: number
  name: string
  score: number
}

function Leaderboard() {
  const dispatch = useAppDispatch()
  const [leaderboard, setLeaderboard] = useState<Leader[]>([])

  const handleReturnButton = () => {
    dispatch(setDisplay('home'))
  }

  useEffect(() => {
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((error) => {
        console.log('Error fetching leaderboard', error)
      })
  }, [])

  return (
    <div className="menu-overlay leaderboard-container">
      <div className="">
        <img
          className="return-button"
          src="/assests/main-menu/return-button.png"
          onClick={handleReturnButton}
          alt="return button"
        />
        <br></br>
        <h2 className="leaderboard-heading">Leader Board</h2>
        <br></br>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((leader, index) => (
                <tr key={leader.id}>
                  <td>{index + 1}</td>
                  <td>{leader.name}</td>
                  <td>{leader.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard

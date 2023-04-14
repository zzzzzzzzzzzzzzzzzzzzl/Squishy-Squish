import { useState, useEffect } from 'react'
import { getLeaderboard } from '../apiClient'

type Leader = {
  id: number
  name: string
  score: number
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Leader[]>([])

  useEffect(() => {
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((error) => {
        console.log('Error fetching leaderboard', error)
      })
  }, [])

  return (
    <div className="menu-overlay">
      <div className="board">
        <table className="menu">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((leader) => (
              <tr key={leader.id}>
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

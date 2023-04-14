import { useState, useEffect } from 'react'
import { getLeaderboard } from '../apiClient'

type Leader = {
  id: number
  name: string
  score: number
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Leader[]>([])

  function handleHome() {}

  useEffect(() => {
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((error) => {
        console.log('Error fetching leaderboard', error)
      })
  }, [])

  return (
    <div className="menu-overlay">
      <div className="border">
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
              .map((leader, index) => (
                <tr key={leader.id}>
                  <td>{index + 1}</td>
                  <td>{leader.name}</td>
                  <td>{leader.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={handleHome}>Go Back</button>
      </div>
    </div>
  )
}

export default Leaderboard

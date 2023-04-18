import { SetStateAction, useState } from 'react'
import { addToLeaderboard, getLeaderboard } from '../apiClient'
import { useAppSelector, useAppDispatch } from '../hooks'
import { highScore, toggleInputName } from '../slices/gameSlice'

function Name() {
  const dispatch = useAppDispatch()
  const gameSlice = useAppSelector((state) => state.game)
  console.log(gameSlice)
  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  // function getLeaderboard() {
  //   return fetchLeaderboard
  // }

  // function compareHighscores() {
  //   const leaderboard = getLeaderboard()
  //   dispatch(highScore)
  //   leaderboard
  //     .sort((a, b) => b.score - a.score)
  //     .slice(0, 5)
  //     .map((i, index) => {})
  // }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()

    const newScore = {
      name: name,
      score: gameSlice.score,
    }

    addToLeaderboard(newScore)
      .then(() => {
        console.log('Score added successfully')
      })
      .catch((error) => {
        console.log('Error adding score', error)
      })
    {
      dispatch(toggleInputName())
    }
  }

  function handleNameChange(event: {
    target: { value: SetStateAction<string> }
  }) {
    setName(event.target.value)
  }

  return (
    <div className="menu-overlay">
      <div className="border">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <h1>{gameSlice.score}</h1>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Name

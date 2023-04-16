import { SetStateAction, useState } from 'react'
import { addToLeaderboard } from '../apiClient'

function Name() {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()

    const newScore = {
      name: name,
      score: score,
    }

    addToLeaderboard(newScore)
      .then(() => {
        console.log('Score added successfully')
      })
      .catch((error) => {
        console.log('Error adding score', error)
      })
  }

  function handleNameChange(event: {
    target: { value: SetStateAction<string> }
  }) {
    setName(event.target.value)
  }

  function handleScoreChange(event: {
    target: { value: SetStateAction<string> }
  }) {
    setScore(event.target.value)
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
          <label>
            Score:
            <input type="number" value={score} onChange={handleScoreChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Name

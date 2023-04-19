import { SetStateAction, useState } from 'react'
import { addToLeaderboard } from '../apiClient'
import { useAppSelector, useAppDispatch } from '../hooks'
import { highScore, setDisplay, toggleInputName } from '../slices/gameSlice'

function Name() {
  const dispatch = useAppDispatch()
  const gameSlice = useAppSelector((state) => state.game)
  const [name, setName] = useState('')

  function handleSubmit(event: { preventDefault: () => void }) {
    dispatch(setDisplay('home'))
    dispatch(highScore())
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
      <form onSubmit={handleSubmit}>
        <label className="lableName">
          Name:
          <input
            className="inputName"
            placeholder="Write your name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <br />
        <h1 className="scoreh1">{gameSlice.score}</h1>
        <br />
        <button className="submitbtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Name

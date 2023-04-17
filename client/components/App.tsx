import Canvas from './main'
import Home from './Home'
import Store from './Store'
import Leaderboard from './Leaderboard'
import Name from './Name'
import gameSlice from '../slices/gameSlice'
import { useAppSelector } from '../hooks'

import { useState } from 'react'

function App() {
  const gameSlice = useAppSelector((state) => state.game)
  const [viewToRender, setViewToRender] = useState('home')

  const handleStart = () => {
    setViewToRender('start') // hide Home component when Start button is clicked
  }
  const handleShopButton = () => {
    setViewToRender('shop')
  }
  const handleLeaderboardButton = () => {
    setViewToRender('leaderboard')
  }

  function updateViewToRender(view: string) {
    setViewToRender(view)
  }

  function getViewToRender() {
    switch (viewToRender) {
      case 'home':
        return (
          <Home
            onStart={handleStart}
            onShopButton={handleShopButton}
            onLeaderboardButton={handleLeaderboardButton}
          />
        )

      case 'shop':
        return <Store updateViewToRender={updateViewToRender} />

      case 'leaderboard':
        return <Leaderboard updateViewToRender={updateViewToRender} />

      default:
        return null
    }
  }

  return (
    <div>
      {getViewToRender()}
      {gameSlice.inputName && gameSlice.highscore && <Name />}
      {<Canvas />}
    </div>
  )
}

export default App

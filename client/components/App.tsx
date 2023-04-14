import Canvas from './main'
import Home from './Home'
import Store from './Store'
import Leaderboard from './Leaderboard'

import { useState } from 'react'

function App() {
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
        return <Store />

      case 'leaderboard':
        return <Leaderboard />

      default:
        return null
    }
  }

  return (
    <div>
      {getViewToRender()}

      {<Canvas />}
    </div>
  )
}

export default App
